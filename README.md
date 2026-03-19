# CS_463 Professional Website

My custom professional website built with vanilla HTML, CSS, and JavaScript. It showcases my projects, work experience, education, and provides a way for people to contact me.

## How It's Organized

The code follows a layered approach where each layer depends on the ones before it:

```
HTML Files (the structure)
    ↓
styles.css (the styling)
    ↓
components.js (the site engine)
    ↓
utilities.js (helper functions)
    ↓
contact-form.js (form handling)
```

## The Files

### HTML Pages

**[index.html](index.html)** - The home page with quick info about me, a Christmas photo, and a picture from the Columbia River.

**[about.html](about.html)** - My full bio, what I'm passionate about, and my goals for the future.

**[projects.html](projects.html)** - My current projects (Community-Safe) and future ideas (Probes, Space AI).

**[prev_work.html](prev_work.html)** - My work history from most recent to oldest, including my current studies at PSU, Form Factor, Intel, and Army experience.

**[contact.html](contact.html)** - A contact form where people can reach out to me. It validates inputs in real-time and sends emails through formsubmit.co.

### CSS and JavaScript

**[styles.css](styles.css)** - All the styling for the site. Uses CSS variables at the top to define the color scheme (blue-purple gradient with cyan accents) so it's easy to change the theme. Everything is responsive and works on mobile and desktop.

**[components.js](components.js)** - The core of the site. This generates the navbar and footer dynamically from a configuration object, sets the page titles in the browser tab, highlights which page you're on in the navbar, and adds a scroll-to-top button. This runs on every page and basically sets everything up.

**[utilities.js](utilities.js)** - General helper functions that make things better. Adds fade-in animations when you scroll, keyboard shortcuts for accessibility (Alt+N, Alt+M, Alt+F), smooth scrolling for links, and logs page load time to the console. Also has throttle and debounce functions for optimization.

**[contact-form.js](contact-form.js)** - Handles the contact form validation and submission. Validates fields as you type, shows errors below each field, and submits the form data to an email service when you click send.

## What Makes It Work

- **components.js** does all the heavy lifting - it's the engine that runs on every page
- **utilities.js** adds nice-to-have features like animations and accessibility shortcuts
- **contact-form.js** only runs on the contact page and handles all the form logic
- Everything is built with vanilla JavaScript, no frameworks (except Bootstrap for some base styles)

## Key Features

- Responsive design - works on phones, tablets, and desktops
- Accessibility built in - ARIA labels, keyboard navigation, semantic HTML
- Real-time form validation with helpful error messages
- Smooth animations and transitions
- Contact form actually sends emails
- Custom color theme with Bootstrap

## How to Use It

Just open any HTML file in a browser and it works. The navbar and footer generate automatically. The styling pulls from CSS variables so you can easily theme it by changing a few colors at the top of styles.css.

## The Tech Stack

- HTML5
- CSS3 (with variables and media queries)
- Vanilla JavaScript (no frameworks)
- Bootstrap 5.3.8 (just for some base styling)
- formsubmit.co (for handling form emails)

## Notes

- Contact form sends to cory_d1991@hotmail.com (configured in contact-form.js)
- All the JavaScript is heavily commented because this was built for learning
- No build process needed - just plain files
- All links in the navbar are data-driven from the components.js config object
