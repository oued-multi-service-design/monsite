document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des animations AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  };
 });
  

    // Header scroll effect
    const header = document.querySelector('.cyber-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
   const headerColor = document.querySelector('.cyber-header');
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bg = entry.target.getAttribute('data-background') || '#111';
        const shadow = entry.target.getAttribute('data-shadow') || 'none';

        headerColor.style.setProperty('background', bg, 'important');
        header.style.boxShadow = shadow;
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => observer.observe(section));



document.addEventListener('DOMContentLoaded', function() {
   // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
  
}); 

const mobileBtn = document.getElementById('mobileBtn');
const navList = document.querySelector('.nav-list');
const serviceItem = document.querySelector('.service-sous-menu');

mobileBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Gérer le sous-menu au clic sur mobile
serviceItem.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault(); // bloque le lien direct
    serviceItem.classList.toggle('open');
  }
});

  // Effets de survol dynamiques
    const cyberButtons = document.querySelectorAll('.cyber-button, .cyber-contact-button, .cyber-social-icon');
    
    cyberButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

// reserver pour la section de caroussel
const swiper = new Swiper('.card-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  
   autoplay: {
    delay: 5000,        // temps entre les slides en millisecondes
    disableOnInteraction: false // continue même après un clic ou swipe
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    668: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


// Additional styles for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: var(--dark);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        background-color:orangered;
        box-shadow: 0 5px 15px rgba(0, 240, 252, 0.3);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
         background-color:orange;
        transform: translateY(-3px);
    }
    
    .no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(backToTopStyle);


// Animation du formulaire
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea, .input-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.querySelector('label').style.color = 'var(--accent)';
            this.parentNode.querySelector('.input-bar').style.width = '100%';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.querySelector('label').style.color = 'rgba(255, 255, 255, 0.7)';
                this.parentNode.querySelector('.input-bar').style.width = '0';
            }
        });
    });
    
    // Validation du formulaire
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation simple
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.parentNode.querySelector('.input-bar').style.background = '#ff4d4d';
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulation d'envoi
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            // Animation de succès
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                submitButton.style.background = '#25d366';
                
                // Réinitialisation après 3 secondes
                setTimeout(() => {
                    this.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = 'var(--primary)';
                    submitButton.disabled = false;
                    
                    // Réinitialiser les labels
                    formInputs.forEach(input => {
                        if (!input.value) {
                            input.parentNode.querySelector('label').style.top = '15px';
                            input.parentNode.querySelector('label').style.fontSize = '1rem';
                            input.parentNode.querySelector('.input-bar').style.width = '0';
                        }
                    });
                }, 3000);
            }, 1500);
        }
    });
    
    

    // Smooth scrolling pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});



