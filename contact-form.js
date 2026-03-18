// This function sets up the contact form.
function initContactForm() {
  // Get the form element and store it in form variable.
  const form = document.getElementById('contactForm');
  // If not found, log a warning and exit.
  if (!form) {
    // Warn outputs the warning to the console output.
    console.warn('Contact form not found with id="contactForm"');
    return;
  }

  // Add real-time validation
  // form.querySelectorAll is getting all of the inputs and textareas
  // in the form and adding event listeners to them.
  const inputs = form.querySelectorAll('input, textarea');
  // Loop through each input.
  inputs.forEach((input) => {
    // Add event listeners for 'blur' and 'input' events to trigger validation.
    input.addEventListener('blur', validateField); // enabled when user clicks out of the field.
    input.addEventListener('input', validateField); // enabled when user types in the field.
  });

  // When the user clicks submit, it will trigger the handleFormSubmit function.
  form.addEventListener('submit', handleFormSubmit);
}

// Validation of each individual field when the user interacts with it.
function validateField(e) {
  const field = e.target; // Getting the input or textarea that triggered the event.
  const fieldName = field.name || field.id; // Gets the field name, or if none, then the field ID.
  let isValid = false; // Initialize isValid to false. It will be set to true if the field passes validation.
  let errorMsg = ''; // Initialize errorMsg to an empty string. It will hold the error message if validation fails.

  // Switch statements are like if statements but more organized.
  switch (fieldName) {
    // Checking name first
    case 'name':
      // Trim removes whitespace from the beginning and end of the input value.
      if (!field.value.trim()) {
        // If the name field is empty, set the error message to "Name is required".
        errorMsg = 'Name is required';
        // Check if the name is too short (must be more than 1 character).
      } else if (field.value.trim().length < 2) {
        // Error message if the name is not long enough.
        errorMsg = 'Name must be at least 2 characters';
        // If then name qualifies, set isValid to true.
      } else {
        isValid = true;
      }
      break;

    // The following cases work similarly to the name case,
    // but with different validation rules and error messages based on the
    // field type (email, phone, subject, message).

    // Getting the email
    case 'email':
      if (!field.value.trim()) {
        errorMsg = 'Email is required';
      } else if (!isValidEmail(field.value)) {
        errorMsg = 'Please enter a valid email address';
      } else {
        isValid = true;
      }
      break;

    // Getting the phone number
    case 'phone':
      if (field.value.trim() && !isValidPhone(field.value)) {
        errorMsg = 'Please enter a valid phone number';
      } else {
        isValid = true;
      }
      break;

    // Getting the subject
    case 'subject':
      if (!field.value.trim()) {
        errorMsg = 'Subject is required';
      } else if (field.value.trim().length < 3) {
        errorMsg = 'Subject must be at least 3 characters';
      } else {
        isValid = true;
      }
      break;

    // Getting the message
    case 'message':
      if (!field.value.trim()) {
        errorMsg = 'Message is required';
      } else if (field.value.trim().length < 10) {
        errorMsg = 'Message must be at least 10 characters';
      } else {
        isValid = true;
      }
      break;
  }
  // Update the field's visual state and error message based on validation results.
  updateFieldDisplay(field, isValid, errorMsg);
}

// Create the footer for the contact page.
// Includes the contact info and social usernames.
function updateFieldDisplay(field, isValid, errorMsg) {
  // If statement will return true if the field is valie, otherwise false.
  if (isValid) {
    // Remove red styling and add green styling for valid input.
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    // Remove any error for valid input.
    removeFieldError(field);
  } else {
    // If invalid, remove green and add red.
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    // Display the error message.
    showFieldError(field, errorMsg);
  }
}

// If the input is invalid, then the error message is displayed below the field.
function showFieldError(field, message) {
  // Checks each parent element of each field for the term "invalid-feedback".
  let errorDiv = field.parentElement.querySelector('.invalid-feedback');
  // If "invalid-feedback" not found,
  if (!errorDiv) {
    // then create a new div element
    errorDiv = document.createElement('div');
    // with the class "invalid-feedback"
    errorDiv.className = 'invalid-feedback d-block';
    // and add the error message to it.
    field.parentElement.appendChild(errorDiv);
  }
  // Set the error message inside error div.
  errorDiv.textContent = message;
}

// Removes error message from error div if necessary.
function removeFieldError(field) {
  // Look for a nav element with an "invalid-feedback" class.
  const errorDiv = field.parentElement.querySelector('.invalid-feedback');
  // If "invalid-feedback" is found, remove it from the page.
  if (errorDiv) {
    errorDiv.remove();
  }
}

// This function validates the entire form. It is passed form as an argument.
function validateContactForm(form) {
  // input[required] gets all inputs and textareas[required] gets all textareas that have the "required" attribute.
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  // Set isValid to true. It will be set to false if any field fails validation.
  let isValid = true;

  // Loop through each input and validate.
  inputs.forEach((input) => {
    // Create simulated blur event.
    const event = new Event('blur');
    // Triggers the event, calling the validateField function for each input to check if it's valid.
    input.dispatchEvent(event);

    // If any input has the "is-invalid" class,
    if (input.classList.contains('is-invalid')) {
      // set isValid to false.
      isValid = false;
    }
  });
  // Return the state of isValid. True for a valid form, false if something is invalid.
  return isValid;
}

// async marks the function as asynchronous, which allows wait to be used inside it for handling promises.
async function handleFormSubmit(e) {
  // Let javascript handle the form submission and page refresh.
  e.preventDefault();
  // Get the form element that triggered the submit event.
  const form = e.target;
  // Send the form to get validated.
  if (!validateContactForm(form)) {
    // If the form is not validated, show the error message and exit.
    showNotification('Please fix all errors before submitting', 'error');
    return;
  }

  // Check for "button[type="submit"]" to find the submit button in the form.
  const submitBtn = form.querySelector('button[type="submit"]');
  // Get the original text of the submit button to restore it later.
  const originalText = submitBtn.textContent;
  // Disable the submit buttotn and show that it has already been clicked.
  submitBtn.disabled = true;
  // Show "Sending..." for the button text to show that it's submitting.
  submitBtn.textContent = 'Sending...';

  try {
    // Create new FormData object.
    const formData = new FormData(form);
    // Store data from form into the object formData.
    const data = Object.fromEntries(formData);

    // fetch waits for the network request to complete and stores the response.
    // formsubmit.co sends form submissions to an email address without needing a backend.
    const response = await fetch(
      'https://formsubmit.co/cory_d991@hotmail.com',
      {
        // Send data to the server.
        method: 'POST',
        // Notify of sending JSON data.
        headers: {
          'Content-Type': 'application/json',
        },
        // put the JSON in the body.
        body: JSON.stringify(data),
      },
    );

    // If variable response is good, then print the notification showing the message has been sent.
    if (response.ok) {
      // Prints the notification.
      showNotification(
        "Message sent successfully! We'll be in touch soon.",
        'success',
      );
      // Resets the form for another submission.
      form.reset();
      // Remove validation state and styling.
      form.classList.remove('was-validated');
      // Remove green/red from all fields.
      document.querySelectorAll('input, textarea').forEach((el) => {
        el.classList.remove('is-valid', 'is-invalid');
      });
      // If the server is not good, then throw an error to be caught in the catch block.
    } else {
      throw new Error('Server error');
    }
    // Catch block to get error
  } catch (error) {
    // Log the error to the console.
    console.error('Form submission error:', error);
    // Show an error notification including the error message.
    showNotification(
      'Failed to send message. Please try again or contact directly.',
      'error',
    );
    // finally always runs whether success or error above.
  } finally {
    // Re-enable the submit button
    submitBtn.disabled = false;
    // and restore text.
    submitBtn.textContent = originalText;
  }
}

//Show notification message
function showNotification(message, type = 'info') {
  // Setting alert class based on the type of notification (success, error, or info).
  const alertClass =
    // If type is success,
    type === 'success'
      ? // then use the "alert-success" class for green styling.
        'alert-success'
      : // If type is error,
        type === 'error'
        ? // then use the "alert-danger" class for red styling.
          'alert-danger'
        : // Otherwise, "alert-info" for blue styling.
          'alert-info';

  // Create a new div element.
  const alertDiv = document.createElement('div');
  // Set class of dive as alert and dismissaible.
  alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
  // Set role to "alert" for accessibility.
  alertDiv.setAttribute('role', 'alert');
  // Set the inner HTML of the alert div to include the message and a close button,
  // which allows the user to dismiss the notification.
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Get main element.
  const main = document.querySelector('main');
  // If main is good,
  if (main) {
    // Insert the alert div at the top of the main element.
    main.insertBefore(alertDiv, main.firstChild);
    // Automatically remove the alert after 5 seconds.
    setTimeout(() => alertDiv.remove(), 5000);
  }
}

// Validating the email.
function isValidEmail(email) {
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Sends the email to get tested and returns the result. True if it follows the patttern,
  // flase if it doesn't.
  return emailRegex.test(email);
}

// Similar to checking the email, but for the phone number.

function isValidPhone(phone) {
  // ^ starts the string
  // [\d\s\-\+\(\)] looks for any digit, whitespace, dash, plus sign, or parentheses.
  // {10,} means that the previous character set must be there at least 10 times.
  // $ ends the string.
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  // Sends the phone number to get tested and returns the result. True if it follows the pattern,
  // false if it doesn't.
  return phoneRegex.test(phone);
}

// When the page laods run the entire setup.
// if statement checks if the document is still loading.
if (document.readyState === 'loading') {
  // If yes, then wait for the DOMContentLoaded event to run the initContactForm function.
  document.addEventListener('DOMContentLoaded', initContactForm);
  // If not,
} else {
  // then run the initContactForm function immediately.
  initContactForm();
}
