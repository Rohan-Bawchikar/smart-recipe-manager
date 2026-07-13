export class Helpers {
    // Debounce utility for search inputs
    static debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                func(...args);
            }, delay);
        };
    }
    // HTML sanitization to prevent XSS
    static escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
//# sourceMappingURL=Helpers.js.map