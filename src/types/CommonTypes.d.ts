import { IRecipe } from '../interfaces/IRecipe';
export type PartialRecipe = Partial<IRecipe>;
export type RecipeFormData = Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>;
export type RecipeStats = {
    total: number;
    favorites: number;
    vegetarian: number;
    nonVegetarian: number;
    averageTime: number;
    difficultyCounts: Record<string, number>;
};
export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'difficulty';
export type FilterOption = 'all' | 'veg' | 'nonveg' | 'favorites';
//# sourceMappingURL=CommonTypes.d.ts.map