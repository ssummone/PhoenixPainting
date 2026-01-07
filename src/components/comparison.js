// Image Data Config - Using correct filenames from assets/gallery
const projects = {
    'house19_front': {
        title: 'House 19 - Front Elevation',
        before: '/assets/gallery/house 19 old.jpg',
        after: '/assets/gallery/house19_front.jpg'
    },
    'house23': {
        title: 'House 23 - Full Bungalow Restoration',
        before: '/assets/gallery/house 23 old.jpg',
        after: '/assets/gallery/house23.jpg'
    },
    'house25': {
        title: 'House 25 - Rear Renovation',
        before: '/assets/gallery/house 25 old.jpg',
        after: '/assets/gallery/house25.jpg'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const galleryOverview = document.getElementById('gallery-overview');
    const comparisonView = document.getElementById('comparison-view');
    const backButton = document.getElementById('back-to-gallery');
    const galleryCards = document.querySelectorAll('.gallery-card');

    // Handle clicking on a gallery card
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            showComparison(projectId);
        });
    });

    // Handle back button
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        showGalleryOverview();
    });

    function showGalleryOverview() {
        galleryOverview.style.display = 'block';
        comparisonView.style.display = 'none';
        // Clear comparison images
        const existingBefore = document.querySelector('.img-before img');
        if (existingBefore) existingBefore.remove();
        const existingAfter = document.querySelector('.img-overlay img');
        if (existingAfter) existingAfter.remove();
    }

    function showComparison(projectId) {
        const project = projects[projectId];
        if (!project) return;

        // Hide overview, show comparison
        galleryOverview.style.display = 'none';
        comparisonView.style.display = 'block';

        // Populate Data
        document.getElementById('project-title').textContent = project.title;

        const container = document.getElementById('comparison-container');
        const overlayLayer = document.getElementById('overlay-layer');

        // Clear previous images
        const existingBefore = document.querySelector('.img-before img');
        if (existingBefore) existingBefore.remove();
        const existingAfter = document.querySelector('.img-overlay img');
        if (existingAfter) existingAfter.remove();

        // Create BEFORE Image (old) - This is the STATIC background
        const imgBefore = document.createElement('img');
        imgBefore.src = project.before;
        imgBefore.alt = "Before Renovation";
        document.querySelector('.img-before').prepend(imgBefore);

        // Create AFTER Image (new) - This slides in from the right
        const imgAfter = document.createElement('img');
        imgAfter.src = project.after;
        imgAfter.alt = "After Renovation";

        // Wait for container to be visible before sizing
        setTimeout(() => {
            imgAfter.style.width = `${container.offsetWidth}px`;
        }, 50);
        overlayLayer.prepend(imgAfter);

        // Reset slider position to far right (showing full before image)
        const handle = document.getElementById('slider-handle');
        handle.style.left = '100%';
        overlayLayer.style.width = '0%';

        // Scroll to top of comparison
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Slider Logic
    const container = document.getElementById('comparison-container');
    const overlayLayer = document.getElementById('overlay-layer');
    const handle = document.getElementById('slider-handle');
    let isDragging = false;

    const updateSlider = (x) => {
        const rect = container.getBoundingClientRect();
        // Calculate percentage from RIGHT side (inverted)
        let percentage = ((x - rect.left) / rect.width) * 100;

        // Clamp
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        // The overlay (after/new image) width grows from the RIGHT
        // So we need to position it from the right and set width based on (100 - percentage)
        handle.style.left = `${percentage}%`;

        // The overlay should cover from right edge to the handle position
        // width = 100% - handle position
        overlayLayer.style.width = `${100 - percentage}%`;
        overlayLayer.style.left = `${percentage}%`;
    };

    // Events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
    });

    // Click to jump
    container.addEventListener('click', (e) => {
        updateSlider(e.clientX);
    });

    // Touch Support
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateSlider(e.touches[0].clientX);
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updateSlider(e.touches[0].clientX);
    });

    window.addEventListener('touchend', () => isDragging = false);

    // Resize handler
    window.addEventListener('resize', () => {
        const imgAfter = document.querySelector('.img-overlay img');
        if (imgAfter) {
            imgAfter.style.width = `${container.offsetWidth}px`;
        }
    });
});
