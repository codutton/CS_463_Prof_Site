// siteConfig
//   Arrays of pages: page name displayed in navbar, which page to go to,
//   and the unique name for the link
// footer with contact info and social usernames
const siteConfig = {
  siteName: 'Cory Dutton',
  pages: [
    { name: 'Home', href: 'index.html', id: 'nav-home' },
    { name: 'Projects', href: 'projects.html', id: 'nav-projects' },
    { name: 'Previous Work', href: 'prev_work.html', id: 'nav-prevwork' },
    { name: 'Contacts', href: 'contact.html', id: 'nav-contacts' },
    { name: 'About', href: 'about.html', id: 'nav-about' },
  ],

  contact: {
    email: 'cory_d1991@hotmail.com',
    phone: '+1 (253) 632-0729',
    github: 'codutton',
    linkedin: 'corydutton',
  },
};

// Load and inject navbar
function loadNavbar() {
  const navHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">${siteConfig.siteName}</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-0">
            <li class="nav-item">
              <span class="nav-link disabled text-light fw-bold">Pages:</span>
            </li> ${siteConfig.pages
              .map(
                (page) => `<li class="nav-item">
                <a class="nav-link" href="${page.href}" data-page="${page.href}">${page.name}</a>
              </li>`,
              )
              .join('')}
          </ul>
        </div>
      </div>
    </nav>
  `;

  // Create a temporary element to hold navbar
  // document is a tool and querySelector is a method used to find something on the page.
  // If found, it returns the class, if not then null
  const main = document.querySelector('main');
  if (main) {
    // Creating a temp element and assigning the navbar HTML to it.
    const navElement = document.createElement('div');
    navElement.innerHTML = navHTML;
    main.insertBefore(navElement.firstElementChild, main.firstChild);
    setActiveNavLink();
  }
}

// Loads the footer with contact info and social links from siteConfig
function loadFooter() {
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Footer HTML with contact info and social links,
  // using template literals to insert values from siteConfig
  const footerHTML = `
    <footer class="footer">
      <div class="container-fluid footer-content">
        <div class="row">
          <div class="col-md-4">
            <h5>Contact</h5>
            <p><strong>Email:</strong> <a href="mailto:${siteConfig.contact.email}">${siteConfig.contact.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${siteConfig.contact.phone}">${siteConfig.contact.phone}</a></p>
          </div>
          <div class="col-md-4">
            <h5>Connect</h5>
            <div class="social-links">
              <a href="https://github.com/${siteConfig.contact.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
              <a href="https://linkedin.com/in/${siteConfig.contact.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>
          <div class="col-md-4">
            <h5>Site Info</h5>
            
            <p>&copy; ${currentYear} ${siteConfig.siteName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `;

  const footerElement = document.createElement('div');
  footerElement.innerHTML = footerHTML;
  document.body.appendChild(footerElement.firstElementChild);
}

// Set active nav link based on current page
function setActiveNavLink() {
  // Getting the file path and splitting it to get the the file name.
  // split('/') splits the path into an array of parts.
  // pop() gets the file name from the array (the last element).
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  // querySelectorAll finds multiple instances of data-page and returns a list of elements.
  // Each link has data-page so they can be found with that.
  const navLinks = document.querySelectorAll('[data-page]');

  // forEach loops through each link and checks if the data-page matches the current page.
  navLinks.forEach((link) => {
    // If it matches, we add the 'active' class and set aria-current to 'page' for accessibility.
    const href = link.getAttribute('href');
    // href === currentPage means "does the link's href match the current page?"
    // currentPage === '' && href === 'index.html' means "if we're on the root URL, treat it as index.html"
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Adding a scroll-to-top button for functionality
function initScrollTopButton() {
  // Creating the button element.
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top'; // button ID.
  scrollBtn.innerHTML = '↑'; // adding up arrow.
  scrollBtn.setAttribute('aria-label', 'Scroll to top'); // accessibility label.
  document.body.appendChild(scrollBtn); // Adding the button to the body of the page.

  // Listen for scroll events and hide or show the button accordingly.
  window.addEventListener('scroll', () => {
    // Checking to see how many pixels the user scrolled down.
    // If more than 300 pixels, show the button. Otherwise, hide it.
    if (window.pageYOffset > 300) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  });

  // Listening for clicking eveng on the button.
  // When clicked, it scrolls the page back to the top smoothly.
  // Without behavior: 'smooth', it would jump to the top instantly.
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Setting page title based on the current page and its name.
function setPageTitle() {
  // split pulls the slash and puts each path name into an array.
  // pop gets the last element of the array.
  // Then if empty, fall back to 'index.html' for the homepage.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Find the page name from siteConfig based on the current page's href.
  // If it finds a match, it uses that page's name.
  // If not found, returns undefined and then || 'Home' sets it to 'Home'.
  const pageName =
    siteConfig.pages.find((p) => p.href === currentPage)?.name || 'Home';
  // document.title sets the title of the page that appears in the browser tab.
  // For example, it could output "Projects | Cory Dutton" if on the projects page.
  document.title = `${pageName} | ${siteConfig.siteName}`;
}

// Telling the other functions to go when the page loads.
// Important because if we already have a navbar and make another,
// then we would have two navbars.
function initializeComponents() {
  // If there is no nav tag on the page, then create it.
  if (!document.querySelector('nav')) {
    loadNavbar();
  } else {
    setActiveNavLink();
  }

  loadFooter();
  setPageTitle();
  initScrollTopButton();
}

// Run on DOM ready
// document.readyState checks for page loading status.
// If it's still "loading", we wait for the DOMContentLoaded event before continuing.
// If it's already "interactive" or "complete", we start the show.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  initializeComponents();
}
