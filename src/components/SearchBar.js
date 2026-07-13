import { Helpers } from '../utils/Helpers';
export class SearchBar {
    onSearch;
    input;
    constructor(inputId, onSearch) {
        this.onSearch = onSearch;
        const el = document.getElementById(inputId);
        if (!el || !(el instanceof HTMLInputElement)) {
            throw new Error(`Search input ${inputId} not found`);
        }
        this.input = el;
        this.bindEvents();
    }
    bindEvents() {
        // 300ms debounce
        const debouncedSearch = Helpers.debounce((val) => {
            this.onSearch(val);
        }, 300);
        this.input.addEventListener('input', (e) => {
            const target = e.target;
            debouncedSearch(target.value);
        });
    }
    getQuery() {
        return this.input.value;
    }
}
//# sourceMappingURL=SearchBar.js.map