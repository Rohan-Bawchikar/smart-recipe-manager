export class Modal {
  private element: HTMLElement;
  private overlay: HTMLElement;

  constructor(private modalId: string) {
    const el = document.getElementById(this.modalId);
    if (!el) throw new Error(`Modal with id ${this.modalId} not found`);
    this.element = el;
    
    let ov = document.getElementById('modal-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'modal-overlay';
      document.body.appendChild(ov);
    }
    this.overlay = ov;
    
    this.initCloseListeners();
  }

  private initCloseListeners(): void {
    const closeBtns = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });
    
    this.overlay.addEventListener('click', () => this.hide());
  }

  public show(): void {
    this.overlay.classList.add('active');
    this.element.classList.add('active');
  }

  public hide(): void {
    this.overlay.classList.remove('active');
    this.element.classList.remove('active');
  }

  public static confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay active';
      
      const dialog = document.createElement('div');
      dialog.className = 'confirm-dialog active';
      
      dialog.innerHTML = `
        <h3>Confirm Action</h3>
        <p>${message}</p>
        <div class="confirm-actions">
          <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
          <button class="btn btn-danger" id="confirm-ok">Delete</button>
        </div>
      `;
      
      document.body.appendChild(overlay);
      document.body.appendChild(dialog);
      
      const closeDialog = (result: boolean) => {
        dialog.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => {
          dialog.remove();
          overlay.remove();
          resolve(result);
        }, 300);
      };
      
      dialog.querySelector('#confirm-cancel')?.addEventListener('click', () => closeDialog(false));
      dialog.querySelector('#confirm-ok')?.addEventListener('click', () => closeDialog(true));
    });
  }
}
