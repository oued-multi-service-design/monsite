document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des animations AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }
    
    // Animation des éléments de processus
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const number = this.querySelector('.step-number');
            number.style.transform = 'scale(1.1) rotate(10deg)';
        });
        
        step.addEventListener('mouseleave', function() {
            const number = this.querySelector('.step-number');
            number.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Effet de parallaxe sur l'image de mission
    const missionImage = document.querySelector('.mission-image');
    if (missionImage) {
        missionImage.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            const frame = this.querySelector('.image-frame');
            frame.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        missionImage.addEventListener('mouseleave', function() {
            const frame = this.querySelector('.image-frame');
            frame.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(0)';
        });
    }

    // Animation des membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mousemove', function(e) {
            const xAxis = (this.offsetWidth / 2 - e.offsetX) / 15;
            const yAxis = (this.offsetHeight / 2 - e.offsetY) / 15;
            
            this.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0) rotateX(0)';
        });
    });
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

  
