document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS
    AOS.init({
        duration: 1000, // Durée de l'animation en millisecondes
        once: true, // L'animation s'applique une seule fois
    });
});

const loader = document.querySelector('.loader');

window.addEventListener('load', () => {

    loader.classList.add('fondu-out');

})

// Sélectionne le bouton "remonter"
const boutontop = document.getElementById('remonter-vers-le-haut');

// Fonction pour vérifier la position de défilement
function toggleboutontop() {
    if (window.scrollY > 100) { // Si l'utilisateur a défilé de plus de 100 pixels
        boutontop.style.display = 'block'; // Affiche le bouton
    } else {
        boutontop.style.display = 'none'; // Cache le bouton
    }
}
// Écoute l'événement de défilement
window.addEventListener('scroll', toggleboutontop);

// Fonction pour remonter en haut de la page
boutontop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Défilement fluide
    });

});
