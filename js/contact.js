document.addEventListener('DOMContentLoaded', function() {
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
    const contactForm = document.getElementById('cyber-contact-form');
    
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
    
    // Animation de la carte
    const cyberMap = document.querySelector('.cyber-map');
    
    cyberMap.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent)';
    });
    
    cyberMap.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--primary)';
    });
    
    // Initialisation des animations AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic'
        });
    }
});

// Menu mobile
  const hamburger = document.querySelector('.cyber-hamburger');
  const nav = document.querySelector('.cyber-nav');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Fermer le menu quand on clique sur un lien
  const navLinks = document.querySelectorAll('.cyber-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });