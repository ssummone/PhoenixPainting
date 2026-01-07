export function initPopup() {
    const modal = document.getElementById('quote-modal');
    const triggers = document.querySelectorAll('[data-trigger="quote-popup"]');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('lead-form');

    function openModal() {
        modal.style.display = 'flex';
        // Force reflow for transition
        modal.offsetHeight;
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    // Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Validate Postcode (Basic G-prefix check)
            const postcode = document.getElementById('postcode').value;
            if (!postcode.trim().toUpperCase().startsWith('G')) {
                alert('Please enter a valid Glasgow (G) postcode.');
                return;
            }

            // Simulate sending
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your quote request has been sent. We will contact you shortly.');
                closeModal();
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
}
