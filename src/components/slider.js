export function initSlider() {
    const slider = document.querySelector('.gallery-slider-container');
    const track = document.querySelector('.slider-track');

    if (!slider || !track) return;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Touch events
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);

    // Mouse events
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', touchEnd);
    slider.addEventListener('mousemove', touchMove);

    // Prevent context menu
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function touchStart(index) {
        return function (event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            slider.classList.add('grabbing');
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);

        const movedBy = currentTranslate - prevTranslate;

        // Momentum or snap logic could go here, for now just stay
        prevTranslate = currentTranslate;
        slider.classList.remove('grabbing');
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        // Boundaries (simple)
        const maxTranslate = 0;
        const minTranslate = -(track.scrollWidth - slider.clientWidth);

        if (currentTranslate > maxTranslate) currentTranslate = maxTranslate;
        if (currentTranslate < minTranslate) currentTranslate = minTranslate;

        track.style.transform = `translateX(${currentTranslate}px)`;
    }
}
