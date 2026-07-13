export class Helpers {
  // Debounce utility for search inputs
  public static debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: number | undefined;
    
    return function (...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // HTML sanitization to prevent XSS
  public static escapeHTML(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
