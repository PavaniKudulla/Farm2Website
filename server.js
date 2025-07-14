const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = 8081;
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const url = "mongodb://127.0.0.1:27017";
const dbName = "registrationDB";
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.post("/register", async function (req, res) {
    const { fullname, email, phone, password } = req.body;

    if (!fullname || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let client;

    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        const db = client.db(dbName);
        const users = db.collection("users");

        const existing = await users.findOne({
            $or: [{ fullname }, { email }]
        });

        if (existing) {
            return res.json({ message: "already exists" });
        }

        await users.insertOne({ fullname, email, phone, password });
        console.log("User registered:", { fullname, email, phone });
        return res.json({ message: "success" });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    } finally {
        if (client) client.close();
    }
});
app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let client;

  try {
    client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ message: "Incorrect password" });
    }

    return res.json({ message: "login success" });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) client.close();
  }
});


// 7) POST /order
app.post('/order', async (req, res) => {
  try {
    const { product, name, address, quantity, contact } = req.body;
    if (!product || !name || !address || !quantity || !contact) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const orders = db.collection('orders');
    await orders.insertOne({ product, name, address, quantity, contact });
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Error in /order:', err);
    res.status(500).json({ message: 'Order failed' });
  }
});

// 8) Start the server
app.listen(port, () => {
  console.log(`🚀 Server listening on http://127.0.0.1:${port}`);
});
