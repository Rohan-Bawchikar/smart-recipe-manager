import { Category } from '../enums/Category';
export class FilterPanel {
    onChange;
    sortSelect;
    filterSelect;
    categorySelect;
    constructor(onChange) {
        this.onChange = onChange;
        const sortEl = document.getElementById('sort-select');
        const filterEl = document.getElementById('filter-select');
        const categoryEl = document.getElementById('category-select');
        if (!sortEl || !filterEl || !categoryEl) {
            throw new Error('Filter panel elements not found in DOM');
        }
        this.sortSelect = sortEl;
        this.filterSelect = filterEl;
        this.categorySelect = categoryEl;
        this.populateCategories();
        this.bindEvents();
    }
    populateCategories() {
        Object.values(Category).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            this.categorySelect.appendChild(option);
        });
    }
    bindEvents() {
        const handler = () => {
            this.onChange(this.sortSelect.value, this.filterSelect.value, this.categorySelect.value);
        };
        this.sortSelect.addEventListener('change', handler);
        this.filterSelect.addEventListener('change', handler);
        this.categorySelect.addEventListener('change', handler);
    }
    getValues() {
        return {
            sort: this.sortSelect.value,
            filter: this.filterSelect.value,
            category: this.categorySelect.value
        };
    }
}
//# sourceMappingURL=FilterPanel.js.map