export class Toast {
  public static show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    const container = this.getContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">${message}</div>
      <button class="toast-close">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Trigger reflow to enable animation
    void toast.offsetWidth;
    toast.classList.add('show');
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn?.addEventListener('click', () => this.remove(toast));
    
    setTimeout(() => {
      this.remove(toast);
    }, 4000);
  }

  private static remove(toast: HTMLElement): void {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }

  private static getContainer(): HTMLElement {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
}
