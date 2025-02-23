document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init({
        duration: 1000, // Durée de l'animation en millisecondes
        once: true, // L'animation s'applique une seule fois
    });
});


// Initialisation de Swiper.js pour le carrousel de témoignages
const testimonialSwiper = new Swiper(".swiper", {
    loop:true,
    autoplay:{
        delay:5000
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
})