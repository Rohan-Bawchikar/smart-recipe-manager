import { Helpers } from '../utils/Helpers';

export class SearchBar {
  private input: HTMLInputElement;

  constructor(inputId: string, private onSearch: (query: string) => void) {
    const el = document.getElementById(inputId);
    if (!el || !(el instanceof HTMLInputElement)) {
      throw new Error(`Search input ${inputId} not found`);
    }
    
    this.input = el;
    this.bindEvents();
  }

  private bindEvents(): void {
    // 300ms debounce
    const debouncedSearch = Helpers.debounce((val: string) => {
      this.onSearch(val);
    }, 300);

    this.input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      debouncedSearch(target.value);
    });
  }

  public getQuery(): string {
    return this.input.value;
  }
}
