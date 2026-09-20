/**
 * Deepanjan Patra - Full-Stack Developer Portfolio
 * Vanilla JavaScript (Interactive Tabs, Navigation, Typing Effect, Form Submission)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation & Scroll Effects
  const headerNav = document.getElementById('header-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Toggle navbar background blur
    if (scrollPos > 40) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }

    // Scrollspy: update active nav link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on load

  // Smooth scroll back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Drawer Menu Toggle
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  const openMobileMenu = () => {
    navMenu.classList.add('menu-active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('menu-active');
    document.body.style.overflow = '';
  };

  if (openMenuBtn) openMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

  // Close menu when any nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('menu-active')) {
      closeMobileMenu();
    }
  });

  // 3. Interactive Tab Switching (About Section)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabBtns.forEach(b => b.classList.remove('active-tab'));
      btn.classList.add('active-tab');

      // Update pane visibility
      tabPanes.forEach(pane => {
        pane.classList.remove('active-pane');
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.add('active-pane');
        }
      });
    });
  });

  // 4. Typing Text Effect for Hero Role
  const typedRoleElement = document.getElementById('typed-role');
  if (typedRoleElement) {
    const roles = [
      'Full-Stack Software Engineer',
      'React.js & Node.js Developer',
      '150+ LeetCode DSA Solver',
      'WebSockets & System Architecture'
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
      const currentRole = roles[currentRoleIndex];

      if (isDeleting) {
        typedRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        typedRoleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentCharIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 600);
  }

  // 5. Contact Form Submission Handling (Google Apps Script)
  const contactForm = document.getElementById('contact-form');
  const formStatusMsg = document.getElementById('form-status-msg');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbySAM3jLeAGwO78Ou27TwJD-2m8gILy39fFANVJuk1VCCso2HYKQhW98l5HXIqoUxyyVA/exec';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.textContent = 'Sending Message...';
      }

      fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
        .then(response => {
          console.log('Form submission success:', response);
          if (formStatusMsg) {
            formStatusMsg.textContent = 'Thank you! Your message has been sent successfully.';
            formStatusMsg.className = 'form-status success';
          }
          contactForm.reset();
        })
        .catch(error => {
          console.error('Form submission error:', error);
          if (formStatusMsg) {
            formStatusMsg.textContent = 'Oops! Something went wrong. Please reach out directly via email or LinkedIn.';
            formStatusMsg.className = 'form-status error';
          }
        })
        .finally(() => {
          if (contactSubmitBtn) {
            contactSubmitBtn.disabled = false;
            contactSubmitBtn.textContent = 'Send Message';
          }

          // Auto-hide status message after 6 seconds
          setTimeout(() => {
            if (formStatusMsg) {
              formStatusMsg.className = 'form-status';
              formStatusMsg.textContent = '';
            }
          }, 6000);
        });
    });
  }
});