document.addEventListener('DOMContentLoaded', function() {
    
    
    // Animation de la carte
    const cyberMap = document.querySelector('.cyber-map');
    
    cyberMap.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--accent)';
    });
    
        cyberMap.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--primary)';
        });
    });