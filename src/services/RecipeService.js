import { Recipe } from '../models/Recipe';
import { AppConstants } from '../constants/AppConstants';
// Repository pattern approach using Service
export class RecipeService {
    storageService;
    recipes = [];
    constructor(storageService) {
        this.storageService = storageService;
        this.loadRecipes();
    }
    loadRecipes() {
        const storedData = this.storageService.getItem(AppConstants.STORAGE_KEYS.RECIPES) || [];
        this.recipes = storedData.map(data => new Recipe(data));
    }
    saveRecipes() {
        this.storageService.setItem(AppConstants.STORAGE_KEYS.RECIPES, this.recipes);
    }
    getAllRecipes() {
        return [...this.recipes];
    }
    getRecipeById(id) {
        return this.recipes.find(r => r.id === id);
    }
    addRecipe(recipeData) {
        // Check for duplicate name
        if (this.recipes.some(r => r.name.toLowerCase() === recipeData.name.toLowerCase())) {
            throw new Error(AppConstants.MESSAGES.ERROR_DUPLICATE);
        }
        const newRecipe = new Recipe(recipeData); // using the partial constructor
        this.recipes.push(newRecipe);
        this.saveRecipes();
    }
    updateRecipe(id, updatedData) {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            // Validate duplicate name for update
            if (updatedData.name) {
                const existing = this.recipes.find(r => r.name.toLowerCase() === updatedData.name.toLowerCase() && r.id !== id);
                if (existing) {
                    throw new Error(AppConstants.MESSAGES.ERROR_DUPLICATE);
                }
            }
            const current = this.recipes[index];
            // Object.assign to merge data, but keep it a Recipe instance
            const merged = { ...current, ...updatedData, updatedAt: new Date() };
            this.recipes[index] = new Recipe(merged);
            this.saveRecipes();
        }
    }
    deleteRecipe(id) {
        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveRecipes();
    }
    toggleFavorite(id) {
        const recipe = this.getRecipeById(id);
        if (recipe) {
            recipe.toggleFavorite();
            this.saveRecipes();
        }
    }
}
//# sourceMappingURL=RecipeService.js.map