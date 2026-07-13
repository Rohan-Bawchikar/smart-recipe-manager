import { Recipe } from '../models/Recipe';
export declare class RecipeCard {
    static create(recipe: Recipe, onDelete: (id: string) => void, onEdit: (id: string) => void, onToggleFavorite: (id: string) => void, onView: (id: string) => void): HTMLElement;
}
//# sourceMappingURL=RecipeCard.d.ts.map