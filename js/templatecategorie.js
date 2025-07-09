// Filtrage et tri des templates
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-by');
    const licenseSelect = document.getElementById('license-type');
    const searchInput = document.querySelector('.search-group input');
    const templateCards = Array.from(document.querySelectorAll('.template-card'));
    
    // Fonction de filtrage
    function filterTemplates() {
        const sortValue = sortSelect.value;
        const licenseValue = licenseSelect.value;
        const searchValue = searchInput.value.toLowerCase();
        
        templateCards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
            const cardPrice = parseInt(card.dataset.price);
            const cardLicense = card.dataset.license || 'all';
            
            // Filtre de recherche
            const searchMatch = cardName.includes(searchValue);
            
            // Filtre de licence
            const licenseMatch = licenseValue === 'all' || cardLicense === licenseValue;
            
            if (searchMatch && licenseMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Tri des templates
        if (sortValue === 'price-asc') {
            templateCards.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (sortValue === 'price-desc') {
            templateCards.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        }
        
        // Réinsérer les éléments triés
        const gridContainer = document.querySelector('.templates-grid');
        templateCards.forEach(card => {
            gridContainer.appendChild(card);
        });
    }
    
    // Écouteurs d'événements
    sortSelect.addEventListener('change', filterTemplates);
    licenseSelect.addEventListener('change', filterTemplates);
    searchInput.addEventListener('input', filterTemplates);
    
    // Pagination
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.page-btn.active').classList.remove('active');
            this.classList.add('active');
            // Ici, normalement une requête AJAX pour charger les nouveaux éléments
        });
    });
});