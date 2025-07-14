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
    

// Données des produits (sera remplacé par une API backend)
const products = [
    {
        id: 1,
        title: "Pack Affiches Réseaux Sociaux",
        category: "affiches",
        subcategory: "social",
        format: ["psd", "ai", "jpg"],
        level: "pro",
        price: 24.99,
        originalPrice: 39.99,
        description: "Pack complet de 30 modèles d'affiches pour réseaux sociaux prêts à l'emploi. Formats optimisés pour Instagram, Facebook, Twitter et LinkedIn. Éditable dans Photoshop et Illustrator.",
        features: [
            "30 modèles uniques",
            "Formats: 1080x1080, 1200x628, 800x2000",
            "Résolution 300DPI",
            "Polices incluses",
            "Organisation par calques"
        ],
        images: [
            "img\maquettes.jpg",
            "img\maquettes.jpg",
            "img\maquettes.jpg"
        ],
        thumbnail: "img\maquettes.jpg",
        downloads: [
            { name: "Pack Complet (ZIP)", size: "45.2 MB", type: "zip" },
            { name: "Instructions (PDF)", size: "2.1 MB", type: "pdf" }
        ],
        rating: 4.5,
        reviews: 24,
        isNew: true,
        isPopular: true
    },
    {
        id: 1,
        title: "Pack Affiches Réseaux Sociaux",
        category: "affiches",
        subcategory: "social",
        format: ["psd", "ai", "jpg"],
        level: "pro",
        price: 24.99,
        originalPrice: 39.99,
        description: "Pack complet de 30 modèles d'affiches pour réseaux sociaux prêts à l'emploi. Formats optimisés pour Instagram, Facebook, Twitter et LinkedIn. Éditable dans Photoshop et Illustrator.",
        features: [
            "30 modèles uniques",
            "Formats: 1080x1080, 1200x628, 800x2000",
            "Résolution 300DPI",
            "Polices incluses",
            "Organisation par calques"
        ],
        images: [
            "img\maquettes.jpg",
            "img\maquettes.jpg",
            "img\maquettes.jpg"
        ],
        thumbnail: "img\maquettes.jpg",
        downloads: [
            { name: "Pack Complet (ZIP)", size: "45.2 MB", type: "zip" },
            { name: "Instructions (PDF)", size: "2.1 MB", type: "pdf" }
        ],
        rating: 4.5,
        reviews: 24,
        isNew: true,
        isPopular: true
    },
    {
        id: 1,
        title: "Pack Affiches Réseaux Sociaux",
        category: "affiches",
        subcategory: "social",
        format: ["psd", "ai", "jpg"],
        level: "pro",
        price: 24.99,
        originalPrice: 39.99,
        description: "Pack complet de 30 modèles d'affiches pour réseaux sociaux prêts à l'emploi. Formats optimisés pour Instagram, Facebook, Twitter et LinkedIn. Éditable dans Photoshop et Illustrator.",
        features: [
            "30 modèles uniques",
            "Formats: 1080x1080, 1200x628, 800x2000",
            "Résolution 300DPI",
            "Polices incluses",
            "Organisation par calques"
        ],
        images: [
            "img\maquettes.jpg",
            "img\maquettes.jpg",
            "img\maquettes.jpg"
        ],
        thumbnail: "img\maquettes.jpg",
        downloads: [
            { name: "Pack Complet (ZIP)", size: "45.2 MB", type: "zip" },
            { name: "Instructions (PDF)", size: "2.1 MB", type: "pdf" }
        ],
        rating: 4.5,
        reviews: 24,
        isNew: true,
        isPopular: true
    },
   
    // Ajouter plus de produits ici...
];

// Éléments DOM
const elements = {
    // Header
    userBtn: document.getElementById('user-btn'),
    userDropdown: document.getElementById('user-dropdown'),
    wishlistBtn: document.getElementById('wishlist-btn'),
    wishlistSidebar: document.getElementById('wishlist-sidebar'),
    closeWishlist: document.getElementById('close-wishlist'),
    cartBtn: document.getElementById('cart-btn'),
    cartSidebar: document.getElementById('cart-sidebar'),
    closeCart: document.getElementById('close-cart'),
    cartItems: document.getElementById('cart-items'),
    cartTotalPrice: document.getElementById('cart-total-price'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mainMenu: document.getElementById('main-menu'),
    searchInput: document.getElementById('search-input'),
    searchResults: document.getElementById('search-results'),
    
    // Hero Slider
    heroSlider: document.querySelector('.hero-slider'),
    heroSlides: document.querySelectorAll('.slide'),
    heroDots: document.querySelectorAll('.slider-dots .dot'),
    
    // Products
    newProductsGrid: document.getElementById('new-products'),
    popularProductsGrid: document.getElementById('popular-products'),
    
    // Modals
    quickViewModal: document.getElementById('quick-view-modal'),
    closeQuickView: document.getElementById('close-quick-view'),
    quickViewContent: document.getElementById('quick-view-content'),
    loginModal: document.getElementById('login-modal'),
    closeLogin: document.getElementById('close-login'),
    registerModal: document.getElementById('register-modal'),
    closeRegister: document.getElementById('close-register'),
    showRegister: document.getElementById('show-register'),
    showLogin: document.getElementById('show-login'),
    
    // Forms
    loginForm: document.getElementById('login-form'),
    registerForm: document.getElementById('register-form'),
    newsletterForm: document.getElementById('newsletter-form')
};

// État de l'application
const state = {
    currentUser: null,
    cart: JSON.parse(localStorage.getItem('omds-cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('omds-wishlist')) || [],
    currentSlide: 0,
    searchQuery: ''
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    renderProducts();
    updateCartCount();
    updateWishlistCount();
    setupEventListeners();
});

// Fonctions d'initialisation
function initHeroSlider() {
    // Afficher la première slide
    elements.heroSlides[0].classList.add('active');
    elements.heroDots[0].classList.add('active');
    
    // Changer de slide toutes les 5 secondes
    setInterval(() => {
        changeSlide((state.currentSlide + 1) % elements.heroSlides.length);
    }, 5000);
}

function changeSlide(index) {
    // Retirer les classes actives
    elements.heroSlides[state.currentSlide].classList.remove('active');
    elements.heroDots[state.currentSlide].classList.remove('active');
    
    // Ajouter les classes actives à la nouvelle slide
    elements.heroSlides[index].classList.add('active');
    elements.heroDots[index].classList.add('active');
    
    // Mettre à jour l'état
    state.currentSlide = index;
}

function renderProducts() {
    // Rendre les nouveaux produits
    const newProducts = products.filter(product => product.isNew);
    renderProductGrid(elements.newProductsGrid, newProducts);
    
    // Rendre les produits populaires
    const popularProducts = products.filter(product => product.isPopular);
    renderProductGrid(elements.popularProductsGrid, popularProducts);
}

function renderProductGrid(container, products) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">Aucun produit trouvé</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.isNew ? '<div class="product-badge">Nouveau</div>' : ''}
            <div class="product-image" style="background-image: url('${product.thumbnail}')"></div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <span class="product-category">${formatCategory(product.category)}</span>
                <div class="product-price">
                    <span class="current-price">€${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">€${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${product.originalPrice ? `<span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-cart" data-id="${product.id}">Ajouter au panier</button>
                    <button class="btn-fav ${state.wishlist.includes(product.id) ? 'active' : ''}" data-id="${product.id}">
                        <i class="${state.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Ajouter un événement pour la vue rapide
        productCard.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-cart') && !e.target.closest('.btn-fav')) {
                openQuickView(product.id);
            }
        });
        
        container.appendChild(productCard);
    });
    
    // Ajouter les événements aux boutons
    addCartEventListeners();
    addWishlistEventListeners();
}

function formatCategory(category) {
    const categories = {
        'affiches': 'Affiches',
        'social': 'Réseaux Sociaux',
        'powerpoint': 'Présentations',
        'web': 'Sites Web',
        'portfolio': 'Portfolios',
        'maquette': 'Maquettes'
    };
    
    return categories[category] || category;
}

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    elements.quickViewContent.innerHTML = `
        <div class="quick-view-gallery">
            <div class="main-image">
                <img src="${product.images[0]}" alt="${product.title}">
            </div>
            <div class="thumbnail-images">
                ${product.images.map((img, index) => `
                    <img src="${img}" alt="Vue ${index + 1}" class="${index === 0 ? 'active' : ''}">
                `).join('')}
            </div>
        </div>
        <div class="quick-view-info">
            <h1>${product.title}</h1>
            <div class="quick-view-meta">
                <span class="product-category">${formatCategory(product.category)}</span>
                <div class="product-rating">
                    ${renderRatingStars(product.rating)}
                    <span>(${product.reviews} avis)</span>
                </div>
            </div>
            <div class="product-price">
                <span class="current-price">€${product.price.toFixed(2)}</span>
                ${product.originalPrice ? `<span class="original-price">€${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-description">
                <p>${product.description}</p>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="qty-minus">-</button>
                    <input type="number" value="1" min="1">
                    <button class="qty-plus">+</button>
                </div>
                <button class="btn-add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                <button class="btn-wishlist ${state.wishlist.includes(product.id) ? 'active' : ''}" data-id="${product.id}">
                    <i class="${state.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-download">
                <h3>Fichiers à télécharger</h3>
                <div class="download-files">
                    ${product.downloads.map(file => `
                        <a href="#" class="download-file">
                            <i class="fas fa-file-${file.type === 'pdf' ? 'pdf' : 'archive'}"></i>
                            <span>${file.name}</span>
                            <span>(${file.size})</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            <div class="product-tabs">
                <ul class="tabs-nav">
                    <li class="active">Description</li>
                    <li>Détails techniques</li>
                    <li>Avis (${product.reviews})</li>
                </ul>
                <div class="tabs-content">
                    <div class="tab-pane active">
                        <h3>Description complète</h3>
                        <p>${product.description}</p>
                        <p>Ce pack premium vous offre tout ce dont vous avez besoin pour créer une présence professionnelle sur les réseaux sociaux. Avec ${product.features.length} fonctionnalités uniques et entièrement personnalisables, vous pouvez créer des publications attrayantes en quelques minutes seulement.</p>
                    </div>
                    <div class="tab-pane">
                        <h3>Détails techniques</h3>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tab-pane">
                        <h3>Avis clients</h3>
                        <p>Ce produit a une note moyenne de ${product.rating} sur 5 basée sur ${product.reviews} avis clients.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les événements
    addQuickViewEventListeners();
    elements.quickViewModal.classList.add('active');
}

function renderRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

function addQuickViewEventListeners() {
    // Miniatures
    const thumbnails = elements.quickViewContent.querySelectorAll('.thumbnail-images img');
    const mainImage = elements.quickViewContent.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        });
    });
    
    // Quantité
    const qtyMinus = elements.quickViewContent.querySelector('.qty-minus');
    const qtyPlus = elements.quickViewContent.querySelector('.qty-plus');
    const qtyInput = elements.quickViewContent.querySelector('.quantity-selector input');
    
    qtyMinus.addEventListener('click', () => {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
    
    qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
    
    // Onglets
    const tabsNav = elements.quickViewContent.querySelectorAll('.tabs-nav li');
    const tabsContent = elements.quickViewContent.querySelectorAll('.tab-pane');
    
    tabsNav.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabsNav.forEach(t => t.classList.remove('active'));
            tabsContent.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            tabsContent[index].classList.add('active');
        });
    });
    
    // Ajouter au panier
    const addToCartBtn = elements.quickViewContent.querySelector('.btn-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productId = parseInt(addToCartBtn.dataset.id);
            const quantity = parseInt(qtyInput.value);
            addToCart(productId, quantity);
        });
    }
    
    // Liste de souhaits
    const wishlistBtn = elements.quickViewContent.querySelector('.btn-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            const productId = parseInt(wishlistBtn.dataset.id);
            toggleWishlist(productId);
            
            // Mettre à jour l'icône
            const icon = wishlistBtn.querySelector('i');
            if (state.wishlist.includes(productId)) {
                wishlistBtn.classList.add('active');
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                wishlistBtn.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }
}

function addCartEventListeners() {
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            addToCart(productId, 1);
        });
    });
}

function addWishlistEventListeners() {
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            toggleWishlist(productId);
            
            // Mettre à jour l'icône
            const icon = btn.querySelector('i');
            if (state.wishlist.includes(productId)) {
                btn.classList.add('active');
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                btn.classList.remove('active');
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
}

// Fonctions du panier
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({
            id: productId,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: quantity
        });
    }
    
    updateCart();
    showNotification(`${product.title} ajouté au panier`);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('omds-cart', JSON.stringify(state.cart));
    renderCartItems();
    updateCartCount();
}

function renderCartItems() {
    if (state.cart.length === 0) {
        elements.cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
                <a href="#shop" class="btn-primary">Parcourir la boutique</a>
            </div>
        `;
        elements.cartTotalPrice.textContent = '€0.00';
        return;
    }
    
    elements.cartItems.innerHTML = '';
    let total = 0;
    
    state.cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        
        total += product.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="cart-item-info">
                <h4>${product.title}</h4>
                <div class="cart-item-price">€${product.price.toFixed(2)} x ${item.quantity}</div>
                <div class="cart-item-subtotal">€${(product.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" data-id="${product.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        elements.cartItems.appendChild(cartItem);
    });
    
    // Ajouter les événements de suppression
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(parseInt(btn.dataset.id));
        });
    });
    
    // Mettre à jour le total
    elements.cartTotalPrice.textContent = `€${total.toFixed(2)}`;
}

function updateCartCount() {
    const count = state.cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Fonctions de la liste de souhaits
function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    
    if (index === -1) {
        state.wishlist.push(productId);
    } else {
        state.wishlist.splice(index, 1);
    }
    
    updateWishlist();
}

function updateWishlist() {
    localStorage.setItem('omds-wishlist', JSON.stringify(state.wishlist));
    renderWishlistItems();
    updateWishlistCount();
}

function renderWishlistItems() {
    if (state.wishlist.length === 0) {
        elements.wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="far fa-heart"></i>
                <p>Votre liste de souhaits est vide</p>
                <a href="#shop" class="btn-primary">Parcourir la boutique</a>
            </div>
        `;
        return;
    }
    
    elements.wishlistItems.innerHTML = '';
    
    state.wishlist.forEach(productId => {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="wishlist-item-info">
                <h4>${product.title}</h4>
                <div class="wishlist-item-price">€${product.price.toFixed(2)}</div>
                <button class="btn-cart" data-id="${product.id}">Ajouter au panier</button>
            </div>
            <button class="wishlist-item-remove" data-id="${product.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        elements.wishlistItems.appendChild(wishlistItem);
    });
    
    // Ajouter les événements
    document.querySelectorAll('.wishlist-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleWishlist(parseInt(btn.dataset.id));
        });
    });
    
    document.querySelectorAll('.wishlist-item .btn-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(parseInt(btn.dataset.id), 1);
        });
    });
}

function updateWishlistCount() {
    const count = state.wishlist.length;
    // Vous pouvez ajouter un compteur dans le header si nécessaire
}

// Fonctions de notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Configuration des événements
function setupEventListeners() {
    // Menu utilisateur
    elements.userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.userDropdown.classList.toggle('active');
    });
    
    // Fermer le menu utilisateur en cliquant ailleurs
    document.addEventListener('click', () => {
        elements.userDropdown.classList.remove('active');
    });
    
    // Liste de souhaits
    elements.wishlistBtn.addEventListener('click', () => {
        elements.wishlistSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    elements.closeWishlist.addEventListener('click', () => {
        elements.wishlistSidebar.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Panier
    elements.cartBtn.addEventListener('click', () => {
        elements.cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    elements.closeCart.addEventListener('click', () => {
        elements.cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Menu mobile
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.mainMenu.classList.toggle('show');
    });
    
    // Recherche
    elements.searchInput.addEventListener('input', () => {
        state.searchQuery = elements.searchInput.value.trim().toLowerCase();
        
        if (state.searchQuery.length > 2) {
            const results = products.filter(product => 
                product.title.toLowerCase().includes(state.searchQuery) ||
                product.category.toLowerCase().includes(state.searchQuery) ||
                product.description.toLowerCase().includes(state.searchQuery)
            ).slice(0, 5);
            
            renderSearchResults(results);
        } else {
            elements.searchResults.innerHTML = '';
            elements.searchResults.classList.remove('active');
        }
    });
    
    // Fermer les résultats de recherche en cliquant ailleurs
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            elements.searchResults.classList.remove('active');
        }
    });
    
    // Modales
    elements.closeQuickView.addEventListener('click', () => {
        elements.quickViewModal.classList.remove('active');
    });
    
    elements.closeLogin.addEventListener('click', () => {
        elements.loginModal.classList.remove('active');
    });
    
    elements.closeRegister.addEventListener('click', () => {
        elements.registerModal.classList.remove('active');
    });
    
    elements.showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        elements.loginModal.classList.remove('active');
        elements.registerModal.classList.add('active');
    });
    
    elements.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        elements.registerModal.classList.remove('active');
        elements.loginModal.classList.add('active');
    });
    
    // Fermer les modales en cliquant sur l'overlay
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Formulaires
    elements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ici, vous ajouterez la logique de connexion
        showNotification('Connexion réussie!');
        elements.loginModal.classList.remove('active');
    });
    
    elements.registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Ici, vous ajouterez la logique d'inscription
        showNotification('Inscription réussie! Veuillez vous connecter.');
        elements.registerModal.classList.remove('active');
        elements.loginModal.classList.add('active');
    });
    
    elements.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Ici, vous ajouterez la logique d'abonnement
        showNotification('Merci pour votre abonnement!');
        e.target.reset();
    });
}

function renderSearchResults(results) {
    if (results.length === 0) {
        elements.searchResults.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
        elements.searchResults.classList.add('active');
        return;
    }
    
    elements.searchResults.innerHTML = '';
    
    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="search-result-info">
                <h4>${product.title}</h4>
                <p>${formatCategory(product.category)} - €${product.price.toFixed(2)}</p>
            </div>
        `;
        
        resultItem.addEventListener('click', () => {
            openQuickView(product.id);
            elements.searchResults.classList.remove('active');
            elements.searchInput.value = '';
        });
        
        elements.searchResults.appendChild(resultItem);
    });
    
    elements.searchResults.classList.add('active');
}


// gestion des modals 
// Ajoutez ce code dans votre fichier script.js

// Sélectionner les éléments
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');

// Gestionnaire pour le lien de connexion
loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    elements.userDropdown.classList.remove('active'); // Fermer le dropdown
    elements.loginModal.classList.add('active'); // Ouvrir la modale connexion
});

// Gestionnaire pour le lien d'inscription
registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    elements.userDropdown.classList.remove('active'); // Fermer le dropdown
    elements.registerModal.classList.add('active'); // Ouvrir la modale inscription
});

// Gestionnaire pour le lien de déconnexion
document.getElementById('logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

// Gestionnaire pour le lien "Mon Compte"
document.querySelectorAll('.account-link a[href="#account"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.currentUser) {
            document.getElementById('account-section').style.display = 'block';
            window.location.hash = '#account';
        }
    });
});

//espace client
// Gestion de l'authentification
function loginUser(email, password) {
    // En production, vous ferez une requête API vers votre backend
    // Pour l'exemple, nous simulons une connexion réussie
    
    state.currentUser = {
        id: 1,
        name: "John Doe",
        email: email,
        joined: new Date().toISOString()
    };
    
    localStorage.setItem('omds-user', JSON.stringify(state.currentUser));
    
    // Mettre à jour l'UI
    updateUserUI();
    
    // Fermer la modale
    elements.loginModal.classList.remove('active');
    
    // Rediriger vers l'espace client
    window.location.hash = '#account';
    document.getElementById('account-section').style.display = 'block';
    
    showNotification('Connexion réussie!');
}

function registerUser(name, email, password) {
    // En production, requête API vers le backend
    
    state.currentUser = {
        id: 2,
        name: name,
        email: email,
        joined: new Date().toISOString()
    };
    
    localStorage.setItem('omds-user', JSON.stringify(state.currentUser));
    
    // Mettre à jour l'UI
    updateUserUI();
    
    // Fermer la modale
    elements.registerModal.classList.remove('active');
    
    // Rediriger vers l'espace client
    window.location.hash = '#account';
    document.getElementById('account-section').style.display = 'block';
    
    showNotification('Inscription réussie! Bienvenue!');
}

function logoutUser() {
    state.currentUser = null;
    localStorage.removeItem('omds-user');
    
    // Mettre à jour l'UI
    updateUserUI();
    
    // Cacher l'espace client
    document.getElementById('account-section').style.display = 'none';
    
    // Retour à l'accueil
    window.location.hash = '';
    
    showNotification('Vous êtes déconnecté');
}

function updateUserUI() {
    const userLinks = document.querySelectorAll('.user-links');
    
    if (state.currentUser) {
        // Afficher les liens compte
        document.querySelectorAll('.account-link').forEach(el => el.style.display = 'block');
        document.querySelectorAll('#login-link, #register-link').forEach(el => el.style.display = 'none');
        
        // Mettre à jour les infos dans le dropdown
        document.querySelector('.user-name').textContent = state.currentUser.name;
        document.querySelector('.user-email').textContent = state.currentUser.email;
        
        // Afficher l'icône utilisateur connecté
        document.getElementById('user-btn').innerHTML = '<i class="fas fa-user-check"></i>';
    } else {
        // Afficher les liens connexion/inscription
        document.querySelectorAll('.account-link').forEach(el => el.style.display = 'none');
        document.querySelectorAll('#login-link, #register-link').forEach(el => el.style.display = 'block');
        
        // Réinitialiser le dropdown
        document.querySelector('.user-name').textContent = 'Connectez-vous';
        document.querySelector('.user-email').textContent = '';
        
        // Icône utilisateur standard
        document.getElementById('user-btn').innerHTML = '<i class="fas fa-user"></i>';
    }
}

// Au chargement de la page, vérifier si l'utilisateur est connecté
function checkAuthState() {
    const savedUser = localStorage.getItem('omds-user');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        updateUserUI();
        
        // Si on est sur la page compte, l'afficher
        if (window.location.hash === '#account') {
            document.getElementById('account-section').style.display = 'block';
        }
    }
}

// Modifier les gestionnaires d'événements existants
elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

elements.registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        showNotification('Les mots de passe ne correspondent pas');
        return;
    }
    
    registerUser(name, email, password);
});

// Ajouter le gestionnaire de déconnexion
document.getElementById('logout-btn').addEventListener('click', logoutUser);

// Gestion des onglets de l'espace client
document.querySelectorAll('.account-tabs .tabs-nav li').forEach(tab => {
    tab.addEventListener('click', () => {
        // Retirer la classe active de tous les onglets
        document.querySelectorAll('.account-tabs .tabs-nav li').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.account-tabs .tab-pane').forEach(p => p.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet sélectionné
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
});

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
    
    // Gestion du hash URL pour l'espace client
    if (window.location.hash === '#account' && state.currentUser) {
        document.getElementById('account-section').style.display = 'block';
    }
});