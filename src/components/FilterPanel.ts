import { Category } from '../enums/Category';
import { FilterOption, SortOption } from '../types/CommonTypes';

export class FilterPanel {
  private sortSelect: HTMLSelectElement;
  private filterSelect: HTMLSelectElement;
  private categorySelect: HTMLSelectElement;

  constructor(
    private onChange: (sort: SortOption, filter: FilterOption, category: string) => void
  ) {
    const sortEl = document.getElementById('sort-select');
    const filterEl = document.getElementById('filter-select');
    const categoryEl = document.getElementById('category-select');

    if (!sortEl || !filterEl || !categoryEl) {
      throw new Error('Filter panel elements not found in DOM');
    }

    this.sortSelect = sortEl as HTMLSelectElement;
    this.filterSelect = filterEl as HTMLSelectElement;
    this.categorySelect = categoryEl as HTMLSelectElement;

    this.populateCategories();
    this.bindEvents();
  }

  private populateCategories(): void {
    Object.values(Category).forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      this.categorySelect.appendChild(option);
    });
  }

  private bindEvents(): void {
    const handler = () => {
      this.onChange(
        this.sortSelect.value as SortOption,
        this.filterSelect.value as FilterOption,
        this.categorySelect.value
      );
    };

    this.sortSelect.addEventListener('change', handler);
    this.filterSelect.addEventListener('change', handler);
    this.categorySelect.addEventListener('change', handler);
  }

  public getValues(): { sort: SortOption, filter: FilterOption, category: string } {
    return {
      sort: this.sortSelect.value as SortOption,
      filter: this.filterSelect.value as FilterOption,
      category: this.categorySelect.value
    };
  }
}
