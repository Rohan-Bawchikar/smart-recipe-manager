export class ParallaxEffect {
    element;
    imageLayer;
    speed;
    ticking = false;
    constructor(containerId, imageLayerClass, speed = 0.4) {
        const el = document.getElementById(containerId);
        if (!el)
            throw new Error(`Parallax container ${containerId} not found`);
        this.element = el;
        const imgEl = el.querySelector(`.${imageLayerClass}`);
        if (!imgEl)
            throw new Error(`Parallax image layer ${imageLayerClass} not found inside container`);
        this.imageLayer = imgEl;
        this.speed = speed;
        this.init();
    }
    init() {
        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        // Trigger initial calculation
        this.updateParallax();
    }
    onScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateParallax();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }
    updateParallax() {
        // Check if the element is currently visible in viewport
        const rect = this.element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.bottom > 0 && rect.top < windowHeight) {
            // Calculate scroll relative to the element's position
            // We use pageYOffset/scrollY
            const scrollPosition = window.scrollY;
            const yPos = scrollPosition * this.speed;
            // Use transform3d for hardware acceleration (60FPS)
            this.imageLayer.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
        }
    }
}
//# sourceMappingURL=ParallaxEffect.js.map