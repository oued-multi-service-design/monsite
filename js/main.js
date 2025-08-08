

// restriction
let restrictionsActive = true; // Par défaut, restrictions activées

// Fonction pour afficher le statut actuel
function showStatus() {
  Swal.fire({
    icon: 'info',
    title: 'Restrictions ' + (restrictionsActive ? 'activées' : 'désactivées'),
    timer: 1500,
    showConfirmButton: false
  });
}

// Écoute du raccourci clavier pour activer/désactiver les restrictions
document.addEventListener('keydown', function(e) {
  // Ctrl + Alt + D
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
    restrictionsActive = !restrictionsActive;
    showStatus();
  }
});

// Bloquer clic droit
document.addEventListener('contextmenu', function(e) {
  if (!restrictionsActive) return; // Si désactivé, on ne bloque pas
  e.preventDefault();
  Swal.fire({
    icon: "warning",
    title: "Action interdite",
    text: "Le clic droit est désactivé sur ce site.",
    confirmButtonColor: "#d33"
  });
});

// Bloquer certaines touches
document.addEventListener('keydown', function(e) {
  if (!restrictionsActive) return; // Si désactivé, on laisse passer

  // F12
  if (e.key === "F12") {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Inspection bloquée",
      text: "L'accès à l'inspecteur est désactivé.",
      confirmButtonColor: "#d33"
    });
  }
  // Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Inspection bloquée",
      text: "Raccourci Inspecteur désactivé.",
      confirmButtonColor: "#d33"
    });
  }
  // Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Console bloquée",
      text: "Raccourci Console désactivé.",
      confirmButtonColor: "#d33"
    });
  }
  // Ctrl+U
  if (e.ctrlKey && e.key.toLowerCase() === 'u') {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Code source bloqué",
      text: "L'accès au code source est désactivé.",
      confirmButtonColor: "#d33"
    });
  }
  // Ctrl+S
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Sauvegarde désactivée",
      text: "Impossible d'enregistrer cette page.",
      confirmButtonColor: "#3085d6"
    });
  }
});

// gestion de changement de texte sur tout le site
setInterval(function() {
  if (!consoleDetectionActive) return;

  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 50) {
    Swal.fire({
      icon: "error",
      title: "Inspection détectée !",
      text: "Accès refusé.",
      confirmButtonColor: "#d33"
    }).then(() => {
      window.location.href = "about:blank";
    });
  }
}, 1000);


// Gestion du loader
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader-container');
        if(loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000); // Délai minimum
});

// Fallback au cas où
setTimeout(function() {
    const loader = document.querySelector('.loader-container');
    if(loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
    }
}, 5000);

//gestion du changement de texte du titre
// pour la section hero
 const wordTitlte = ["idée", " projet", " rêve"];
  let indextitle = 0;

  setInterval(() => {
    indextitle = (indextitle + 1)% wordTitlte.length;
  document.querySelector('.mot-changeant-title').textContent = wordTitlte[indextitle];
  }, 3000);

//gestion du changement de texte du bouton
 const wordcontent = ["une idée ?", "un projet ?", "un rêve ?", "une ambition ?", "une vision ?"];
  let indexglob = 0;

  document.querySelectorAll('.mot-changeant').forEach((element) => {  
  setInterval(() => {
    indexglob = (indexglob + 1) % wordcontent.length;
    document.querySelector('.mot-changeant').textContent = wordcontent[indexglob];
  }, 3000);
  }),

//block right-click on images
// and prevent dragging of images
document.addEventListener('contextmenu', function(click) {
  if (click.target.tagName === 'IMG') {
    click.preventDefault();

    Swal.fire({
            icon: "info",
            title: "Sauvegarde désactivée",
            text: "Impossible d'enregistrer l' image.",
            confirmButtonColor: "#3085d6"
        });
  }
});

// Prevent dragging of images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', e => e.preventDefault());
});

  // Initialisation des animations AOS sur toutes les pages
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

// Gestion du header sticky et de l'effet de défilement
 let lastScrollTop = 0;
const header = document.querySelector('.cyber-header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Appliquer le style "scrolled" dès qu'on dépasse 50px
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Cacher le header quand on descend
  if (scrollY > lastScrollTop && scrollTop > 500) {
    header.style.transform = 'translateY(-100%)';
  } else {
    // Réafficher quand on remonte
    header.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollY <= 0 ? 0 : scrollY;
});

// Gestion du menu de navigation
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

const mobileBtn = document.getElementById('mobileBtn');
const navList = document.querySelector('.nav-list');
const serviceItem = document.querySelector('.service-sous-menu');

mobileBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// Gérer le sous-menu au clic sur mobile
serviceItem.addEventListener('click', (e) => {
  serviceItem.classList.toggle('open');
  
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

// gestion de back to top
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
          animation: pulse 2.5s infinite ease-out;
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

    document.addEventListener('DOMContentLoaded', () => {

  // gestion de validation de formulaire
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const telephone = this.telephone.value.trim();
    const subject = this.subject.value.trim();
    const message = this.message.value.trim();


     // Vérification générale de toutes les champs remplis
    if(name === "" || email === "" || telephone === "" || subject === "" || message === ""){
      Swal.fire({
        icon : "error",
        title : "Message non envoyé !",
        text : "Tous les champs doivent être bien remplis.",
      });
      return;
    }
    // === Vérification par champ ===

    // Nom : que des lettres (accents acceptés)
    if (!/^[A-Za-zÀ-ÿ' -]{2,}$/.test(name)) {
      Swal.fire({
        icon: "error",
        title: "Nom invalide",
        text: "Le nom ne doit contenir que des lettres. Exemple : Ousseni ",
      });
      return;
    }

    // Email : format classique
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Email invalide",
        text: "Merci de saisir une adresse email correcte. Exemple : ouedmultiservicedesign@gmail.com",
      });
      return;
    }

    // Téléphone : uniquement des chiffres, entre 8 et 15 caractères
    if (!/^\d{8,15}$/.test(telephone)) {
      Swal.fire({
        icon: "error",
        title: "Numéro invalide",
        text: "Le numéro de téléphone doit contenir uniquement des chiffres (8 à 15 chiffres).",
      });
      return;
    }

    // Sujet : minimum 3 caractères valides
    if (!/^[\wÀ-ÿ\s.,!?'-]{3,}$/.test(subject)) {
      Swal.fire({
        icon: "error",
        title: "Sujet invalide",
        text: "Le sujet semble vide ou incorrect. Merci de bien l’indiquer.",
      });
      return;
    }

    // Message : minimum 10 caractères non répétitifs
    if (
  message.length < 10 || 
  /^(.)\1{5,}$/.test(message) || // trop de répétitions
  !/[aeiouyàâéèêëîïôöùûüsdfjklkjhgfdtyuiopoiuytr]/i.test(message) || // aucune voyelle ?
  !/\b\w{4,}\b/.test(message) // aucun mot de 4 lettres ou plus ?
)
     {
      Swal.fire({
        icon: "error",
        title: "Message non valide",
        text: "Votre message doit contenir au moins 10 caractères clairs et utiles.",
      });
      return;
    }

    // Confirmation avant envoi
    Swal.fire({
      icon : "question",
      title : "Confirmer l'envoi !",
      text : "Une fois envoyé, vous ne pouvez plus le modifier.",
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, envoyer',
      cancelButtonColor: '#e00b0b',
      confirmButtonColor: '#255000'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon : "success",
          title : "Message envoyé !",
          text : `Merci ${name} pour votre message, nous vous contacterons dans les plus brefs délais.`,
        });
        contactForm.reset();
      }
    });

  });

});

   

 

