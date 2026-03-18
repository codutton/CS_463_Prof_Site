// Function to start form validation
function initializeFormValidation() {
  // Puts form elements into a new contactForm object
  const contactForm = document.getElementById('contactForm');
  // If there is no contactForm still, exit
  if (!contactForm) return;

  // Add event to listen for submit button
  contactForm.addEventListener(
    'submit',
    function (e) {
      // If the form is not validated
      if (!validateContactForm(this)) {
        // prevent defaults
        e.preventDefault();
        //   Prevent further efforts
        e.stopPropagation();
      }
      // change status to validated
      this.classList.add('was-validated');
    },
    false,
  );
}

// Function to actually validate the contact form
function validateContactForm(form) {
  // putting elements into new objects
  const name = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const message = form.querySelector('[name="message"]');

  // setting isValid to true, will be changed to false if the
  // form is not validated.
  let isValid = true;

  // Validate name
  // "If name doesn't exist OR trim returns null"
  if (!name || !name.value.trim()) {
    // set error
    setFieldError(name, 'Name is required');
    // not valid
    isValid = false;
    // if length of what trim returned is less than two (only one character in the name)
  } else if (name.value.trim().length < 2) {
    // Error message, name must be longer
    setFieldError(name, 'Name must be at least 2 characters');
    // Marked as invalid
    isValid = false;
    // or if the name is longer than one char, the error is cleared.
  } else {
    clearFieldError(name);
  }

  // Validate email (similar to name)
  if (!email || !email.value.trim()) {
    setFieldError(email, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    setFieldError(email, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError(email);
  }

  // Validate message (similar to name and email)
  if (!message || !message.value.trim()) {
    setFieldError(message, 'Message is required');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    setFieldError(message, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    clearFieldError(message);
  }
  return isValid;
}

// Checks the email specificially
// ^ is for the starting of the string,
// [^\s@]+ looks for one or more characters that are anything besides whitespace or @,
// @ looks for the @ symbol,
// [^\s@]+ looks for one or more characters that are anything besides whitespace or @,
// but for a second time after the @ that should be there.
// Then \. looks for a dot,
// and then the last [^\s@]+ looks for one or more characters that are anything besides
// whitespace or @ after the dot,
// and finally $ is for the end of the string.

// English: Check for a string that has one or more characters that are not whitespace or @,
// then check for an @ symbol, followed by another character not whitespace or @, followed by a dot,
// and then one more character that isn't whitespace or a @.
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sets field error with field and error message
function setFieldError(field, message) {
  // if field null, then exit
  if (!field) return;
  // add invalid status and remove valid status
  field.classList.add('is-invalid');
  field.classList.remove('is-valid');

  // selects the next HTML element
  let errorDiv = field.nextElementSibling;
  // if there isn't a next element OR errorDiv doesn't contain invalid feedback
  if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
    // Then create the error div
    errorDiv = document.createElement('div');
    // Give it a class name
    errorDiv.className = 'invalid-feedback d-block';
    // and insert the error before the parent element
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
  // setting error div content to the message.
  errorDiv.textContent = message;
}

// Function to clear the error for a field
function clearFieldError(field) {
  // If no field, then exit.
  if (!field) return;
  // Remove invalid status and add valid status
  field.classList.remove('is-invalid');
  field.classList.add('is-valid');

  // create an error div with current elements next sibling
  const errorDiv = field.nextElementSibling;
  // if the error div contains invalid status
  if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
    // Then remove i
    errorDiv.remove();
  }
}

// Delays a function. Waits for user to stop typing.
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Limits function call if made repeatedly
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Creaates a pause/play when elements are or not in the viewpor
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        // Optional: Unobserve after animation runs
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all containers
  document.querySelectorAll('.container').forEach((el) => {
    observer.observe(el);
  });
}

// Keyboard navigation for accessibility
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function (e) {
    // Skip navigation with Alt+N
    if (e.altKey && e.key === 'n') {
      e.preventDefault();
      document.querySelector('nav')?.focus();
    }
    // Main content with Alt+M
    if (e.altKey && e.key === 'm') {
      e.preventDefault();
      document.querySelector('main')?.focus();
    }
    // Footer with Alt+F
    if (e.altKey && e.key === 'f') {
      e.preventDefault();
      document.querySelector('footer')?.focus();
    }
  });
}

// Creates animated scrolling instead of instantly jumping
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Figures out estimate to load page and outputs to the console
function initializePerformanceMonitoring() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
      }, 0);
    });
  }
}

// Initialize all utilities
function initializeUtilities() {
  initializeFormValidation();
  initializeScrollAnimations();
  initializeKeyboardNavigation();
  initializeSmoothScroll();
  initializePerformanceMonitoring();
}

// Run only if the page is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUtilities);
} else {
  initializeUtilities();
}
