// ============================================
// Enhanced JavaScript for Academic Project Page
// ============================================

// Scroll to Top Functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', function() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// More Works Dropdown Toggle
function toggleMoreWorks() {
  const dropdown = document.getElementById('moreWorksDropdown');
  const btn = document.querySelector('.more-works-btn');
  
  dropdown.classList.toggle('active');
  btn.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const container = document.querySelector('.more-works-container');
  const dropdown = document.getElementById('moreWorksDropdown');
  const btn = document.querySelector('.more-works-btn');
  
  if (!container.contains(event.target) && dropdown.classList.contains('active')) {
    dropdown.classList.remove('active');
    btn.classList.remove('active');
  }
});

// BibTeX Copy Functionality
function copyBibTeX() {
  const bibtexCode = document.querySelector('#bibtex-code code');
  const btn = document.querySelector('.copy-bibtex-btn');
  const copyText = btn.querySelector('.copy-text');
  
  // Create temporary textarea
  const textarea = document.createElement('textarea');
  textarea.value = bibtexCode.textContent;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  
  // Select and copy
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile devices
  
  try {
    document.execCommand('copy');
    
    // Success feedback
    btn.classList.add('copied');
    copyText.textContent = 'Copied!';
    
    // Reset after 2 seconds
    setTimeout(() => {
      btn.classList.remove('copied');
      copyText.textContent = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    copyText.textContent = 'Failed';
    setTimeout(() => {
      copyText.textContent = 'Copy';
    }, 2000);
  }
  
  // Remove temporary textarea
  document.body.removeChild(textarea);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section, .hero');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// Performance: Preload critical resources
window.addEventListener('load', () => {
  // Preload next section images
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img, index) => {
    if (index < 3) { // Preload first 3 lazy images
      const fullImg = new Image();
      fullImg.src = img.src;
    }
  });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  // Escape key closes dropdown
  if (e.key === 'Escape') {
    const dropdown = document.getElementById('moreWorksDropdown');
    const btn = document.querySelector('.more-works-btn');
    if (dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
      btn.classList.remove('active');
    }
  }
  
  // Ctrl/Cmd + K for quick copy BibTeX
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const bibtexSection = document.getElementById('BibTeX');
    if (bibtexSection) {
      bibtexSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => copyBibTeX(), 500);
    }
  }
});

console.log('🎨 Academic project page loaded successfully!');