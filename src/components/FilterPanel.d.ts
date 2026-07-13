import { FilterOption, SortOption } from '../types/CommonTypes';
export declare class FilterPanel {
    private onChange;
    private sortSelect;
    private filterSelect;
    private categorySelect;
    constructor(onChange: (sort: SortOption, filter: FilterOption, category: string) => void);
    private populateCategories;
    private bindEvents;
    getValues(): {
        sort: SortOption;
        filter: FilterOption;
        category: string;
    };
}
//# sourceMappingURL=FilterPanel.d.ts.map