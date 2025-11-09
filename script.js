// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// CONTACT FORM EMAIL FUNCTIONALITY
// ============================================

// EmailJS Configuration
// IMPORTANT: Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'aO8b1wDdCvZ0Dpm6L';  // Get from EmailJS Dashboard
const EMAILJS_SERVICE_ID = 'service_4wql9yf';   // Your Gmail service ID
const EMAILJS_TEMPLATE_ID = 'template_bxdn9cf'; // Your template ID

// Initialize EmailJS
(function() {
    // Load EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    };
    document.head.appendChild(script);
})();

// Contact form submission
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Disable submit button and show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
// Check if EmailJS is NOT configured
if (
    EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' ||
    EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE' ||
    EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE'
) {
    alert('⚠️ EmailJS is not configured yet!\n\nPlease follow the setup instructions in the script.js file to configure EmailJS with your credentials.');
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
    return;
}

    
    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'caelestis7crafts@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert(`✅ Thank you for your message, ${name}!\n\nWe've received your inquiry and will get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            
            // Show error message
            alert(`❌ Oops! Something went wrong.\n\nPlease try again or contact us directly at caelestis7crafts@gmail.com\n\nError: ${error.text || 'Unknown error'}`);
            
            // Re-enable button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

// ============================================
// END CONTACT FORM EMAIL FUNCTIONALITY
// ============================================

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
const animateElements = document.querySelectorAll('.category-card, .product-card, .review-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Product card interactions
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const viewDetailsBtn = card.querySelector('.btn-secondary');
    
});

// Add loading animation for images
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Active navigation link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent default behavior for empty links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

console.log('Caelestis Crafts website loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
  const modalOverlay = document.getElementById('productModalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalPrice = document.getElementById('modalPrice');
  const modalImage = document.getElementById('modalImage');
  const modalBadge = document.getElementById('modalBadge');

  // extras container
  const modalExtrasContent = document.getElementById('modalExtrasContent');

  function openModal() {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // reset extras scroll position
    if (modalExtrasContent) modalExtrasContent.scrollTop = 0;
  }

  // Close handlers
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Attach click to product "View Details" buttons only
  document.querySelectorAll('.product-card .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const card = ev.currentTarget.closest('.product-card');
      if (!card) return;

      const titleEl = card.querySelector('h3');
      const descEl = card.querySelector('.product-description');
      const priceEl = card.querySelector('.price');
      const imgEl = card.querySelector('.product-image img');
      const badgeEl = card.querySelector('.product-badge');

      modalTitle.textContent = titleEl ? titleEl.textContent.trim() : 'Product';
      modalDescription.textContent = descEl ? descEl.textContent.trim() : '';
      modalPrice.textContent = priceEl ? priceEl.textContent.trim() : '';
      modalImage.src = imgEl ? imgEl.src : '';
      modalImage.alt = titleEl ? titleEl.textContent.trim() : 'Product image';

      if (badgeEl && badgeEl.textContent.trim()) {
        modalBadge.style.display = 'inline-block';
        modalBadge.textContent = badgeEl.textContent.trim();
      } else {
        modalBadge.style.display = 'none';
      }

      // Optional extra info: prefer .product-extra inside card, else read data attributes
      const extraEl = card.querySelector('.product-extra');
      const inclusions = card.dataset.inclusions; // e.g. data-inclusions="..."
      const dimensions = card.dataset.dimensions; // e.g. data-dimensions="..."
      let extrasHtml = '';

      if (extraEl) {
        extrasHtml = extraEl.innerHTML;
      } else {
        if (inclusions) extrasHtml += '<strong>Inclusions:</strong><div>' + inclusions + '</div>';
        if (dimensions) extrasHtml += '<strong style="display:block;margin-top:6px">Dimensions:</strong><div>' + dimensions + '</div>';
      }

      if (modalExtrasContent) modalExtrasContent.innerHTML = extrasHtml || '';
      openModal();
    });
  });
});