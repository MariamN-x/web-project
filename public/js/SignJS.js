function animateOnScroll(element) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in-bottom');
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(element);
}

document.querySelectorAll('*').forEach((element) => {
  animateOnScroll(element);
});

const signupForm = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!validateEmail(email)) {
    emailError.textContent = 'Invalid email address.';
    emailError.style.color = 'red';
    return;
  } else {
    emailError.textContent = '';
  }

  if (!validatePassword(password)) {
    passwordError.textContent = 'Password must be at least 8 characters long and contain at least 1 capital letter and 1 number.';
    passwordError.style.color = 'red';
    return;
  } else {
    passwordError.textContent = '';
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    confirmPasswordError.style.color = 'red';
    return;
  } else {
    confirmPasswordError.textContent = '';
  }

  // Display success message and redirect to Mainindex.html
  const successMessage = document.createElement('div');
  successMessage.textContent = 'Successfully Signed up!';
  successMessage.style.color = 'green';
  document.body.appendChild(successMessage);

  setTimeout(function () {
    window.location.href = 'Mainindex.html';
  }, 1000);
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePassword(password) {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
}

emailInput.addEventListener('input', () => {
  emailError.textContent = '';
});

passwordInput.addEventListener('input', () => {
  passwordError.textContent = '';
});

confirmPasswordInput.addEventListener('input', () => {
  confirmPasswordError.textContent = '';
});
