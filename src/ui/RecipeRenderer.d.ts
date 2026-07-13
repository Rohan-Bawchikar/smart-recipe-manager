import { Recipe } from '../models/Recipe';
export declare class RecipeRenderer {
    private onDelete;
    private onEdit;
    private onToggleFavorite;
    private onView;
    private container;
    private emptyState;
    constructor(containerId: string, onDelete: (id: string) => void, onEdit: (id: string) => void, onToggleFavorite: (id: string) => void, onView: (id: string) => void);
    render(recipes: Recipe[]): void;
}
//# sourceMappingURL=RecipeRenderer.d.ts.map