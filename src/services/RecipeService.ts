import { Recipe } from '../models/Recipe';
import { StorageService } from './StorageService';
import { AppConstants } from '../constants/AppConstants';
import { IRecipe } from '../interfaces/IRecipe';

// Repository pattern approach using Service
export class RecipeService {
  private storageService: StorageService;
  private recipes: Recipe[] = [];

  constructor(storageService: StorageService) {
    this.storageService = storageService;
    this.loadRecipes();
  }

  private loadRecipes(): void {
    const storedData = this.storageService.getItem<IRecipe[]>(AppConstants.STORAGE_KEYS.RECIPES) || [];
    this.recipes = storedData.map(data => new Recipe(data));
  }

  private saveRecipes(): void {
    this.storageService.setItem(AppConstants.STORAGE_KEYS.RECIPES, this.recipes);
  }

  public getAllRecipes(): Recipe[] {
    return [...this.recipes];
  }

  public getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  public addRecipe(recipeData: Omit<IRecipe, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>): void {
    // Check for duplicate name
    if (this.recipes.some(r => r.name.toLowerCase() === recipeData.name.toLowerCase())) {
      throw new Error(AppConstants.MESSAGES.ERROR_DUPLICATE);
    }
    const newRecipe = new Recipe(recipeData as any); // using the partial constructor
    this.recipes.push(newRecipe);
    this.saveRecipes();
  }

  public updateRecipe(id: string, updatedData: Partial<IRecipe>): void {
    const index = this.recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      // Validate duplicate name for update
      if (updatedData.name) {
        const existing = this.recipes.find(r => r.name.toLowerCase() === updatedData.name!.toLowerCase() && r.id !== id);
        if (existing) {
          throw new Error(AppConstants.MESSAGES.ERROR_DUPLICATE);
        }
      }
      
      const current = this.recipes[index];
      // Object.assign to merge data, but keep it a Recipe instance
      const merged = { ...current, ...updatedData, updatedAt: new Date() };
      this.recipes[index] = new Recipe(merged as any);
      this.saveRecipes();
    }
  }

  public deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveRecipes();
  }

  public toggleFavorite(id: string): void {
    const recipe = this.getRecipeById(id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveRecipes();
    }
  }
}
