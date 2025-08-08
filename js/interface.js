

  document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const galleryLinks = document.querySelectorAll('[data-lightbox="gallery"]');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    const thumbnailsContainer = lightbox.querySelector('.thumbnails-container');
    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const zoomBtn = lightbox.querySelector('.zoom-btn');
    const imageCounter = lightbox.querySelector('.image-counter');

    // Variables
    let currentIndex = 0;
    let startX, moveX, isDragging = false;
    let zoomLevel = 1;
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let initialDistance = null;
    const images = Array.from(galleryLinks).map(link => ({
        src: link.href,
        title: link.dataset.title || link.querySelector('img').alt
    }));

    // Initialize
    initThumbnails();
    initDragNavigation();
    initZoom();
    updateCounter();

    // Lightbox Functions
    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.opacity = '1';
        lightbox.style.pointerEvents = 'auto';
        loadImage(currentIndex);
        document.body.style.overflow = 'hidden';
        updateThumbnails();
        updateMetaTags();
    }

    function closeLightbox() {
        lightbox.style.opacity = '0';
        lightbox.style.pointerEvents = 'none';
        document.body.style.overflow = '';
        resetZoom();
    }

    function loadImage(index) {
        lightboxImg.classList.add('image-change');
        lightboxImg.style.opacity = '0';

        const img = new Image();
        img.onload = function() {
            lightboxImg.src = this.src;
            lightboxCaption.textContent = images[index].title;
            lightboxImg.style.opacity = '1';
            updateCounter();
            centerThumbnail();
            
            setTimeout(() => {
                lightboxImg.classList.remove('image-change');
            }, 600);
        };
        img.src = images[index].src;
    }

    function showPrev() {
        resetZoom();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        loadImage(currentIndex);
        updateThumbnails();
    }

    function showNext() {
        resetZoom();
        currentIndex = (currentIndex + 1) % images.length;
        loadImage(currentIndex);
        updateThumbnails();
    }

    // Thumbnails Functions
    function initThumbnails() {
        images.forEach((img, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img.src;
            thumbnail.className = 'thumbnail';
            thumbnail.alt = `Miniature ${index + 1}`;
            thumbnail.dataset.index = index;
            
            thumbnail.addEventListener('click', (e) => {
                e.preventDefault();
                resetZoom();
                openLightbox(index);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    function updateThumbnails() {
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    function centerThumbnail() {
        const activeThumb = document.querySelector('.thumbnail.active');
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Drag Navigation
    function initDragNavigation() {
        // Mouse events
        lightboxContent.addEventListener('mousedown', (e) => {
            if (zoomLevel === 1) {
                isDragging = true;
                startX = e.clientX;
                lightboxContent.classList.add('grabbing');
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging || zoomLevel > 1) return;
            moveX = e.clientX;
            lightboxImg.classList.add('dragging');
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            
            const diff = startX - e.clientX;
            if (diff > 100) showNext();
            if (diff < -100) showPrev();
            
            isDragging = false;
            lightboxContent.classList.remove('grabbing');
            lightboxImg.classList.remove('dragging');
        });

        // Touch events
        lightboxContent.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                startX = e.touches[0].clientX;
            }
        }, { passive: true });

        lightboxContent.addEventListener('touchend', (e) => {
            if (e.touches.length === 0 && zoomLevel === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = startX - touchEndX;
                if (diff > 50) showNext();
                if (diff < -50) showPrev();
            }
        }, { passive: true });
    }

    // Zoom System
    function initZoom() {
        lightboxImg.classList.add('zoom-active');
        
        zoomBtn.addEventListener('click', toggleZoom);
        
        // Touch zoom
        lightboxImg.addEventListener('touchstart', handleTouchStart, { passive: false });
        lightboxImg.addEventListener('touchmove', handleTouchMove, { passive: false });
        lightboxImg.addEventListener('touchend', handleTouchEnd);
    }

    function toggleZoom() {
        zoomLevel = zoomLevel === 1 ? 2 : 1;
        lightboxImg.classList.toggle('zoomed');
        zoomBtn.textContent = zoomLevel === 1 ? '🔍' : '⎔';
        
        if (zoomLevel > 1) {
            lightboxImg.style.cursor = 'grab';
            lightboxImg.addEventListener('mousedown', startDragZoom);
        } else {
            lightboxImg.style.cursor = 'zoom-in';
            lightboxImg.removeEventListener('mousedown', startDragZoom);
        }
    }

    function resetZoom() {
        if (zoomLevel > 1) {
            zoomLevel = 1;
            lightboxImg.classList.remove('zoomed');
            lightboxImg.style.transform = 'scale(1)';
            zoomBtn.textContent = '🔍';
            lightboxImg.style.cursor = 'zoom-in';
        }
    }

    function startDragZoom(e) {
        e.preventDefault();
        pos = {
            left: lightboxImg.scrollLeft,
            top: lightboxImg.scrollTop,
            x: e.clientX,
            y: e.clientY
        };
        
        document.addEventListener('mousemove', dragZoom);
        document.addEventListener('mouseup', stopDragZoom);
    }

    function dragZoom(e) {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;
        lightboxImg.scrollLeft = pos.left - dx;
        lightboxImg.scrollTop = pos.top - dy;
    }

    function stopDragZoom() {
        document.removeEventListener('mousemove', dragZoom);
        document.removeEventListener('mouseup', stopDragZoom);
    }

    function handleTouchStart(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
        }
    }

    function handleTouchMove(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            if (initialDistance) {
                const scale = currentDistance / initialDistance;
                lightboxImg.style.transform = `scale(${scale})`;
                zoomLevel = scale;
            }
        }
    }

    function handleTouchEnd() {
        initialDistance = null;
        if (zoomLevel < 1.2) {
            lightboxImg.style.transform = 'scale(1)';
            zoomLevel = 1;
        }
    }

    // Counter and SEO
    function updateCounter() {
        imageCounter.textContent = `${currentIndex + 1}/${images.length}`;
    }

    function updateMetaTags() {
        const metaImage = document.querySelector('.seo-meta meta[property="og:image"]');
        if (metaImage) {
            metaImage.content = images[currentIndex].src;
        }
    }

    // Event Listeners
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeLightbox();
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showPrev();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showNext();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.opacity === '1') {
            switch(e.key) {
                case 'ArrowLeft': showPrev(); break;
                case 'ArrowRight': showNext(); break;
                case 'Escape': closeLightbox(); break;
                case 'z': toggleZoom(); break;
            }
        }
    });
});


// section avantage de temoignage 

document.addEventListener('DOMContentLoaded', function() {
            // Initialisation du Swiper
            const swiper = new Swiper('.swiper', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 1000,
                effect: 'creative',
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: ['-20%', 0, -1],
                        rotate: [0, 0, -5],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                        rotate: [0, 0, 5],
                    },
                },
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        spaceBetween: 40,
                    },
                    992: {
                        spaceBetween: 50,
                    },
                }
            });

            // Animation des éléments flottants
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach(el => {
                animateElement(el);
            });

            function animateElement(element) {
                let x = Math.random() * 80;
                let y = Math.random() * 80;
                let xSpeed = (Math.random() - 0.5) * 0.2;
                let ySpeed = (Math.random() - 0.5) * 0.2;

                function move() {
                    x += xSpeed;
                    y += ySpeed;

                    if (x <= 0 || x >= 80) xSpeed *= -1;
                    if (y <= 0 || y >= 80) ySpeed *= -1;

                    element.style.left = `${x}%`;
                    element.style.top = `${y}%`;

                    requestAnimationFrame(move);
                }

                move();
            }

            // Animation au scroll
            const observerOptions = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.card-item').forEach(card => {
                observer.observe(card);
            });
        });
