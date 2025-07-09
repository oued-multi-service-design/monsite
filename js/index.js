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
  
  
  // Initialisation des animations AOS
    AOS.init({
        duration: 800,
        once: true
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

  // Formulaire de contact
  const contactForm = document.getElementById('project-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Récupération des valeurs
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simulation d'envoi
      console.log('Données du formulaire:', data);
      
      // Animation de succès
      const submitButton = this.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;
      
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
      submitButton.style.background = 'linear-gradient(45deg, #25d366, #128c7e)';
      
      // Réinitialisation après 3 secondes
      setTimeout(() => {
        contactForm.reset();
        submitButton.innerHTML = originalContent;
        submitButton.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--dark-blue))';
      }, 3000);
    });
  }

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