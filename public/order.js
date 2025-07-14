// order.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    // Get form elements
    const product = document.getElementById('product');
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const quantity = document.getElementById('quantity');
    const contact = document.getElementById('contact');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      let valid = true;
      let errorMessage = '';
  
      // Validate Product
      if (product.value.trim() === '') {
        valid = false;
        errorMessage = 'Product is required.';
        showError(product, errorMessage);
      } else {
        removeError(product);
      }
  
      // Validate Customer Name
      if (name.value.trim() === '') {
        valid = false;
        errorMessage = 'Your Name is required.';
        showError(name, errorMessage);
      } else {
        removeError(name);
      }
  
      // Validate Shipping Address
      if (address.value.trim() === '') {
        valid = false;
        errorMessage = 'Shipping Address is required.';
        showError(address, errorMessage);
      } else {
        removeError(address);
      }
  
      // Validate Quantity
      if (quantity.value.trim() === '') {
        valid = false;
        errorMessage = 'Quantity is required.';
        showError(quantity, errorMessage);
      } else if (quantity.value <= 0) {
        valid = false;
        errorMessage = 'Quantity must be a positive number.';
        showError(quantity, errorMessage);
      } else {
        removeError(quantity);
      }
  
      // Validate Contact Number
      if (contact.value.trim() === '') {
        valid = false;
        errorMessage = 'Contact Number is required.';
        showError(contact, errorMessage);
      } else if (!/^\d{10}$/.test(contact.value.trim())) {
        valid = false;
        errorMessage = 'Contact Number must be 10 digits.';
        showError(contact, errorMessage);
      } else {
        removeError(contact);
      }
  
      // If all fields are valid, submit the form
      if (valid) {
        form.submit();
      }
    });
  
    // Function to show error message
    function showError(input, message) {
      let formGroup = input.closest('.col-md-12') || input.closest('.col-md-6');
      let errorSpan = formGroup.querySelector('.error-message');
  
      if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('text-danger', 'error-message');
        formGroup.appendChild(errorSpan);
      }
  
      errorSpan.textContent = message;
    }
  
    // Function to remove error message
    function removeError(input) {
      let formGroup = input.closest('.col-md-12') || input.closest('.col-md-6');
      let errorSpan = formGroup.querySelector('.error-message');
      
      if (errorSpan) {
        errorSpan.remove();
      }
    }
  });
  