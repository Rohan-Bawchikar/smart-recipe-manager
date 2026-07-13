export class ParallaxEffect {
  private element: HTMLElement;
  private imageLayer: HTMLElement;
  private speed: number;
  private ticking: boolean = false;

  constructor(containerId: string, imageLayerClass: string, speed: number = 0.4) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Parallax container ${containerId} not found`);
    this.element = el;
    
    const imgEl = el.querySelector(`.${imageLayerClass}`) as HTMLElement;
    if (!imgEl) throw new Error(`Parallax image layer ${imageLayerClass} not found inside container`);
    this.imageLayer = imgEl;
    
    this.speed = speed;
    
    this.init();
  }

  private init(): void {
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    // Trigger initial calculation
    this.updateParallax();
  }

  private onScroll(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  private updateParallax(): void {
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
