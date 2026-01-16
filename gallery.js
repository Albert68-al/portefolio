document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const pagination = document.querySelector('.carousel-pagination');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    const itemsPerPage = 3; // Nombre d'éléments visibles à la fois
    const totalItems = items.length;
    
    // Initialisation
    function initCarousel() {
        // Créer les indicateurs de pagination
        createPagination();
        
        // Mettre à jour l'affichage
        updateCarousel();
        
        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', handleResize);
    }
    
    // Créer les indicateurs de pagination
    function createPagination() {
        pagination.innerHTML = '';
        const pageCount = Math.ceil(totalItems / itemsPerPage);
        
        for (let i = 0; i < pageCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToPage(i));
            pagination.appendChild(dot);
        }
    }
    
    // Mettre à jour le carrousel
    function updateCarousel() {
        const itemWidth = items[0].offsetWidth + 20; // Largeur de l'élément + marge
        track.style.transform = `translateX(-${currentIndex * itemWidth * itemsPerPage}px)`;
        
        // Mettre à jour les indicateurs de pagination
        updatePagination();
        
        // Mettre à jour les détails de l'élément actif
        updateActiveItemDetails();
    }
    
    // Mettre à jour la pagination
    function updatePagination() {
        const dots = document.querySelectorAll('.pagination-dot');
        const activePage = Math.floor(currentIndex / itemsPerPage);
        
        dots.forEach((dot, index) => {
            if (index === activePage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Aller à une page spécifique
    function goToPage(pageIndex) {
        currentIndex = pageIndex * itemsPerPage;
        updateCarousel();
    }
    
    // Aller à l'élément suivant
    function next() {
        if (currentIndex < totalItems - itemsPerPage) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Aller à l'élément précédent
    function prev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Gérer le redimensionnement de la fenêtre
    function handleResize() {
        updateCarousel();
    }
    
    // Mettre à jour les détails de l'élément actif
    function updateActiveItemDetails() {
        const activeItem = items[currentIndex];
        if (!activeItem) return;
        
        const title = activeItem.querySelector('h3').textContent;
        const descriptionFr = activeItem.querySelector('.fr-content')?.textContent || '';
        const descriptionEn = activeItem.querySelector('.en-content')?.textContent || '';
        const tags = activeItem.querySelectorAll('.gallery-tags span');
        
        const detailsTitle = document.querySelector('.details-title');
        const detailsDescriptionFr = document.querySelector('.details-description.fr-content');
        const detailsDescriptionEn = document.querySelector('.details-description.en-content');
        const detailsTags = document.querySelector('.details-tags');
        
        detailsTitle.textContent = title;
        if (detailsDescriptionFr) detailsDescriptionFr.textContent = descriptionFr;
        if (detailsDescriptionEn) detailsDescriptionEn.textContent = descriptionEn;
        
        // Mettre à jour les tags
        detailsTags.innerHTML = '';
        tags.forEach(tag => {
            const tagClone = tag.cloneNode(true);
            detailsTags.appendChild(tagClone);
        });
    }
    
    // Filtrage des éléments
    function filterItems(category) {
        items.forEach((item, index) => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                // Ajouter une animation
                item.style.animation = 'slideIn 0.5s ease forwards';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 50 * index);
            } else {
                item.style.display = 'none';
            }
        });
        
        // Réinitialiser l'index
        currentIndex = 0;
        updateCarousel();
    }
    
    // Événements
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    
    // Filtrage
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterItems(filter);
        });
    });
    
    // Initialisation
    initCarousel();
    
    // Animation au chargement
    setTimeout(() => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, 100 * index);
        });
    }, 500);
});