import { Recipe } from '../models/Recipe';
import { StorageService } from './StorageService';
import { IRecipe } from '../interfaces/IRecipe';
export declare class RecipeService {
    private storageService;
    private recipes;
    constructor(storageService: StorageService);
    private loadRecipes;
    private saveRecipes;
    getAllRecipes(): Recipe[];
    getRecipeById(id: string): Recipe | undefined;
    addRecipe(recipeData: Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>): void;
    updateRecipe(id: string, updatedData: Partial<IRecipe>): void;
    deleteRecipe(id: string): void;
    toggleFavorite(id: string): void;
}
//# sourceMappingURL=RecipeService.d.ts.map