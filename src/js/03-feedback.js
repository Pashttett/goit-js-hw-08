const throttle = require('lodash.throttle'); 
 
const THROTTLE_DELAY = 500;
 
const form = document.querySelector('.feedback-form'); 
const emailInput = form.querySelector('input[name="email"]'); 
const messageInput = form.querySelector('textarea[name="message"]'); 
 
 
emailInput.addEventListener('input', handleFormInput); 
messageInput.addEventListener('input', handleFormInput); 
 

const updateLocalStorageThrottled = throttle(updateLocalStorage, THROTTLE_DELAY); 
 
function handleFormInput() { 
  const formData = { 
    email: emailInput.value, 
    message: messageInput.value, 
  }; 
  updateLocalStorageThrottled(formData); 
} 
 

function updateLocalStorage(formData) { 
  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); 
} 

document.addEventListener('DOMContentLoaded', function() { 
  const savedState = localStorage.getItem('feedback-form-state'); 
 
  if (savedState) { 
    const formData = JSON.parse(savedState); 
    emailInput.value = formData.email; 
    messageInput.value = formData.message; 
  } 
}); 
 

form.addEventListener('submit', function(event) { 
  event.preventDefault(); 
 
  const formData = { 
    email: emailInput.value, 
    message: messageInput.value, 
  }; 
 
  console.log(formData); 

  emailInput.value = ''; 
  messageInput.value = ''; 
  localStorage.removeItem('feedback-form-state'); 
});