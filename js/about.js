document.addEventListener('DOMContentLoaded', function() {
    const teamSlider = new Swiper('.team-slider', {
        // Configuration de base
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        
        // Pagination toujours visible
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Navigation toujours visible
        navigation: {
            nextEl: '.team-next',
            prevEl: '.team-prev',
            hiddenClass: 'team-hidden', // Classe quand inactif
        },
        
        // Points de rupture responsive
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            // Tablette
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // Desktop
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.team-next',
                    prevEl: '.team-prev',
                    disabledClass: 'team-disabled' // Classe quand désactivé
                }
            }
        },
        
    });
});
    
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


  
