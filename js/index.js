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

    // Effet de particules pour le fond
    createParticles();
}); 

function init3DFormEffect() {
    const form3D = document.querySelector('#form-complete');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        const moveX = (centerX - e.clientX) / 30;
        const moveY = (centerY - e.clientY) / 30;
        
        form3D.style.transform = `
            perspective(1200px)
            rotateX(${moveY}deg)
            rotateY(${-moveX}deg)
        `;
        
        // Effet de lumière dynamique
        form3D.style.boxShadow = `
            ${-moveX * 3}px ${moveY * 3}px 40px rgba(0, 102, 255, 0.25),
            ${moveY * 3}px ${-moveX * 3}px 40px rgba(255, 102, 0, 0.17)
        `;
    });

    // Réinitialisation au départ de la souris
    document.addEventListener('mouseleave', () => {
        form3D.style.transform = 'perspective(10px) rotateX(0) rotateY(0)';
        form3D.style.boxShadow = '0 20px 40px rgba(0, 102, 255, 0.01)';
    });
}

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


// Initialiser au chargement
window.addEventListener('load', init3DFormEffect);


document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des animations AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

   
  // Effet de survol sur les cartes de services
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const x = e.pageX - card.offsetLeft;
      const y = e.pageY - card.offsetTop;
      
      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;
      
      const angleX = (centerY - y) / 40;
      const angleY = (x - centerX) / 40;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Effet de parallaxe sur la section hero
  const heroSection = document.querySelector('.cyber-hero');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
  }

  // Initialisation des particules
  initParticles();
});

// Fonction pour créer des particules
function initParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  document.body.appendChild(particleContainer);
  
  const particleCount = window.innerWidth < 768 ? 20 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'cyber-particle';
    
    // Position aléatoire
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Taille aléatoire
    const size = Math.random() * 5 + 2;
    
    // Animation aléatoire
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const color = Math.random() > 0.5 ? '--primary-blue' : '--accent-orange';
    
    particle.style.cssText = `
      left: ${posX}%;
      top: ${posY}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      background-color: var(${color});
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    
    particleContainer.appendChild(particle);
  }
}

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

/////////////Initialize Swiper
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    grabCursor: true,
    loop: true,
     autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Next and previous navigation
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });

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
    
    // Effet de survol sur les méthodes de contact
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.querySelector('.method-icon').style.transform = 'rotate(15deg) scale(1.1)';
            this.querySelector('.method-icon').style.boxShadow = 'var(--neon-glow)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.querySelector('.method-icon').style.transform = 'rotate(0) scale(1)';
            this.querySelector('.method-icon').style.boxShadow = 'none';
        });
    });

  

  