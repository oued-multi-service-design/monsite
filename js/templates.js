document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('show');
        });
    }
    
    // Initialisation de AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Gestion des messages flash
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.classList.add('fade-out');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });
    
    // Tooltips
    tippy('[data-tippy-content]', {
        theme: 'light-border',
        arrow: true,
        animation: 'scale'
    });
    
    // Smooth scroll pour les ancres
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
    
    // Détection du scroll pour le header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.cyber-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des produits
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterLinks = document.querySelectorAll('.filter-list a');
    const products = document.querySelectorAll('.product-card');
    
    // Filtres par boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            
            // Mettre à jour l'état actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les produits
            products.forEach(product => {
                if (filterValue === 'all' || product.dataset.category === filterValue) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
    
    // Filtres par liens sidebar
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.dataset.category;
            
            // Mettre à jour l'état actif
            filterLinks.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les produits
            products.forEach(product => {
                if (filterValue === 'all' || product.dataset.category === filterValue) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
    
    // Barre de recherche
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
    
    // Tri des produits
    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const productsContainer = document.querySelector('.products-grid');
        const productsArray = Array.from(products);
        
        productsArray.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-high':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'newest':
                    return parseInt(b.dataset.id) - parseInt(a.dataset.id);
                default: // popular
                    return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
            }
        });
        
        // Réorganiser le DOM
        productsArray.forEach(product => {
            productsContainer.appendChild(product);
        });
    });
    
    // Initialisation des tooltips
    tippy('[data-tippy-content]', {
        theme: 'light-border',
        arrow: true,
        animation: 'scale'
    });
});

class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }
    
    init() {
        this.renderCartCount();
        this.setupEventListeners();
        this.loadCart();
    }
    
    setupEventListeners() {
        // Ajout au panier
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                this.addToCart(productId);
            });
        });
        
        // Mini panier
        document.querySelector('.cart-icon').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.mini-cart-overlay').classList.toggle('show');
        });
        
        document.querySelector('.close-cart').addEventListener('click', () => {
            document.querySelector('.mini-cart-overlay').classList.remove('show');
        });
    }
    
    addToCart(productId) {
        const product = this.getProductData(productId);
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1,
                license: 'standard'
            });
        }
        
        this.saveCart();
        this.showNotification(`${product.name} ajouté au panier`);
    }
    
    getProductData(productId) {
        const productElement = document.querySelector(`.product-card[data-id="${productId}"]`);
        return {
            id: productId,
            name: productElement.querySelector('h3').textContent,
            price: parseFloat(productElement.dataset.price),
            image: productElement.querySelector('img').src,
            category: productElement.dataset.category
        };
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCartCount();
        this.loadCart();
    }
    
    renderCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }
    
    loadCart() {
        const container = document.querySelector('.mini-cart-items');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            document.querySelector('.mini-cart-total span').textContent = '$0.00';
            return;
        }
        
        let total = 0;
        this.cart.forEach(item => {
            total += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'mini-cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            container.appendChild(cartItem);
        });
        
        document.querySelector('.mini-cart-total span').textContent = `$${total.toFixed(2)}`;
        
        // Gestion suppression items
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                this.removeFromCart(productId);
            });
        });
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }, 100);
    }
}

// Initialisation
new Cart();


document.addEventListener('DOMContentLoaded', function() {
    // Changement d'images
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const newSrc = this.dataset.large;
            mainImage.src = newSrc;
            
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Sélecteur de quantité
    const minusBtn = document.querySelector('.qty-minus');
    const plusBtn = document.querySelector('.qty-plus');
    const qtyInput = document.querySelector('.qty-input');
    
    minusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });
    
    // Onglets produit
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Mettre à jour les boutons
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher le bon contenu
            tabPanes.forEach(pane => {
                if (pane.id === tabId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });
    
    // Système d'évaluation
    const stars = document.querySelectorAll('.stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Vérifier si l'utilisateur a acheté ce produit
    checkPurchasedProduct();
});

function checkPurchasedProduct() {
    // En réalité, il faudrait vérifier côté serveur
    // Ici simulation avec localStorage
    const purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (purchasedProducts.includes(productId)) {
        document.getElementById('download-section').style.display = 'block';
    }
}


class AuthSystem {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuthState();
    }
    
    setupEventListeners() {
        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }
        
        // Logout Button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }
    
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Validation simple
        if (!email || !password) {
            this.showError('Veuillez remplir tous les champs');
            return;
        }
        
        // En réalité, vérification côté serveur
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showSuccess('Connexion réussie');
            
            // Redirection après 1.5s
            setTimeout(() => {
                window.location.href = 'compte.html';
            }, 1500);
        } else {
            this.showError('Identifiants incorrects');
        }
    }
    
    handleRegister() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        // Validation
        if (!username || !email || !password) {
            this.showError('Veuillez remplir tous les champs');
            return;
        }
        
        if (password.length < 6) {
            this.showError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }
        
        // Vérifier si l'email existe déjà
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(u => u.email === email);
        
        if (emailExists) {
            this.showError('Cet email est déjà utilisé');
            return;
        }
        
        // Créer le nouvel utilisateur
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
            joinedDate: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        this.showSuccess('Compte créé avec succès');
        
        // Auto-login
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirection
        setTimeout(() => {
            window.location.href = 'compte.html';
        }, 1500);
    }
    
    handleLogout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }
    
    checkAuthState() {
        const accountLinks = document.querySelectorAll('.account-link');
        const authLinks = document.querySelectorAll('.auth-link');
        
        if (this.currentUser) {
            // Utilisateur connecté
            accountLinks.forEach(link => link.style.display = 'block');
            authLinks.forEach(link => link.style.display = 'none');
            
            // Mettre à jour le nom d'utilisateur
            const usernameElements = document.querySelectorAll('.username-display');
            usernameElements.forEach(el => {
                el.textContent = this.currentUser.username;
            });
        } else {
            // Utilisateur non connecté
            accountLinks.forEach(link => link.style.display = 'none');
            authLinks.forEach(link => link.style.display = 'block');
        }
    }
    
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'auth-message error';
        errorElement.textContent = message;
        document.querySelector('main').prepend(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 3000);
    }
    
    showSuccess(message) {
        const successElement = document.createElement('div');
        successElement.className = 'auth-message success';
        successElement.textContent = message;
        document.querySelector('main').prepend(successElement);
        
        setTimeout(() => {
            successElement.remove();
        }, 3000);
    }
}

// Initialisation
new AuthSystem();


class FavoritesSystem {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateFavorites();
    }
    
    setupEventListeners() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.dataset.id;
                this.toggleFavorite(productId);
            });
        });
    }
    
    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        
        if (index === -1) {
            this.favorites.push(productId);
        } else {
            this.favorites.splice(index, 1);
        }
        
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavorites();
    }
    
    updateFavorites() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const productId = btn.dataset.id;
            
            if (this.favorites.includes(productId)) {
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                btn.classList.add('active');
            } else {
                btn.innerHTML = '<i class="far fa-heart"></i>';
                btn.classList.remove('active');
            }
        });
        
        // Mettre à jour le compteur de favoris
        const favCount = document.querySelector('.favorites-count');
        if (favCount) {
            favCount.textContent = this.favorites.length;
        }
    }
}

// Initialisation
new FavoritesSystem();