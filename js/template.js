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
    
    // Header scroll effect
    const header = document.querySelector('.cyber-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize Cart
    const cart = {
        items: JSON.parse(localStorage.getItem('cart')) || [],
        updateCounter: function() {
            const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelectorAll('.cart-counter').forEach(el => {
                el.textContent = total;
            });
        }
    };
    cart.updateCounter();
    
    // Add to Cart buttons
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            const templateId = templateCard.dataset.id || Date.now();
            const templateName = templateCard.querySelector('h3').textContent;
            const templatePrice = parseInt(templateCard.querySelector('.price').textContent);
            const templateImage = templateCard.querySelector('img').src;
            
            // Add to cart
            const existingItem = cart.items.find(item => item.id === templateId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({
                    id: templateId,
                    name: templateName,
                    price: templatePrice,
                    image: templateImage,
                    quantity: 1
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart.items));
            cart.updateCounter();
            
            // Feedback animation
            this.innerHTML = '<i class="fas fa-check"></i> Ajouté';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter';
            }, 2000);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = this.innerHTML.includes('far') ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Additional styles for no-scroll
const noScrollStyle = document.createElement('style');
noScrollStyle.textContent = `
    .no-scroll {
        overflow: hidden;
    }
`;
document.head.appendChild(noScrollStyle);

// Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.portfolio-stats');
    
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // 2 secondes
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                number.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);