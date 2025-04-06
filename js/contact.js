const form = document.querySelector('#contactform');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const ageInput = document.querySelector('#age');
const companyInput = document.querySelector('#company');
const messageInput = document.querySelector('#message');

const showError = (input, message) => {
  input.classList.add('error-border');
  let errorElement = input.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains('error-message')) {
    errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    input.parentNode.append(errorElement);
  }
  errorElement.textContent = message;
};

const clearError = (input) => {
  input.classList.remove('error-border');
  const errorElement = input.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.remove();
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  const nameRegex = /^[a-zA-Z\s-]{2,30}$/;
  if (!nameRegex.test(nameInput.value.trim())) {
    isValid = false;
    showError(
      nameInput,
      'Your Name must be 2-30 characters long and contain only letters, hyphens, and spaces.'
    );
  } else {
    clearError(nameInput);
  }

  const age = parseInt(ageInput.value, 10);
  if (isNaN(age) || age < 18 || age > 130) {
    isValid = false;
    showError(ageInput, 'Age must be a number between 18 and 130.');
  } else {
    clearError(ageInput);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    isValid = false;
    showError(emailInput, 'E-Mail must be a valid email address.');
  } else {
    clearError(emailInput);
  }

  const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
  const companyInputValid =
    companyInput.value.trim() && !websiteRegex.test(companyInput.value.trim());
  if (companyInputValid) {
    isValid = false;
    showError(companyInput, 'Your Website must be a valid URL or left empty.');
  } else {
    clearError(companyInput);
  }

  const messageLength = messageInput.value.trim().length;
  if (messageLength < 10 || messageLength > 350) {
    isValid = false;
    showError(
      messageInput,
      'Your Message must be between 10 and 350 characters.'
    );
  } else {
    clearError(messageInput);
  }

  if (isValid) {
    form.reset();
    document.querySelectorAll('.error-message').forEach((el) => el.remove());
    event.target.submit();
  }
});

[nameInput, emailInput, ageInput, companyInput, messageInput].forEach(
  (input) => {
    input.addEventListener('focus', () => clearError(input));
  }
);
