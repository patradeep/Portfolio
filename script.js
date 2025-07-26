// Tab switching logic for About section
      const tabLinks = document.querySelectorAll('.tab-link');
      const tabContents = document.querySelectorAll('.tab-content');
      tabLinks.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
          // Remove active classes
          tabLinks.forEach(t => t.classList.remove('active-link'));
          tabContents.forEach(c => {
            c.classList.remove('active-content');
            c.style.display = 'none';
          });
          // Add active to clicked tab and show content
          tab.classList.add('active-link');
          tabContents[idx].classList.add('active-content');
          tabContents[idx].style.display = 'block';
        });
      });
// Smooth scrolling for navigation links
      const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
// Toggle mobile menu visibility
      const openMenu = document.querySelector('.open-menu');
      const closeMenu = document.querySelector('.close-menu');
      const navMenu = document.querySelector('nav ul');
      openMenu.addEventListener('click', () => {
        navMenu.style.transform = 'translateX(0)';
      });
      closeMenu.addEventListener('click', () => {
        navMenu.style.transform = 'translateX(100%)';
      });
      
// Form submission handling
const SuccessMessage = document.querySelector('.success-message');
const scriptURL = 'https://script.google.com/macros/s/AKfycbySAM3jLeAGwO78Ou27TwJD-2m8gILy39fFANVJuk1VCCso2HYKQhW98l5HXIqoUxyyVA/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        console.log('Success!', response)
        SuccessMessage.textContent = 'Message sent successfully!';
        SuccessMessage.style.display = 'block';
        setTimeout(() => {
          SuccessMessage.style.display = 'none';
        }, 3000); // Hide message after 3 seconds
        form.reset() // Reset the form after submission
      })
      .catch(error => console.error('Error!', error.message))
  })