import { IRecipe } from '../interfaces/IRecipe';
import { Difficulty } from '../enums/Difficulty';
import { Category } from '../enums/Category';

export class Recipe implements IRecipe {
  public readonly id: string;
  public name: string;
  public description: string;
  public ingredients: string[];
  public instructions: string[];
  public difficulty: Difficulty;
  public category: Category;
  public isVegetarian: boolean;
  public cookingTimeMinutes: number;
  public imageUrl?: string;
  public isFavorite: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(recipeData: Partial<IRecipe> & { name: string; description: string; ingredients: string[]; instructions: string[]; cookingTimeMinutes: number; difficulty: Difficulty; category: Category; isVegetarian: boolean }) {
    this.id = recipeData.id || this.generateId();
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.ingredients = recipeData.ingredients;
    this.instructions = recipeData.instructions;
    this.difficulty = recipeData.difficulty;
    this.category = recipeData.category;
    this.isVegetarian = recipeData.isVegetarian;
    this.cookingTimeMinutes = recipeData.cookingTimeMinutes;
    this.imageUrl = recipeData.imageUrl;
    this.isFavorite = recipeData.isFavorite ?? false;
    this.createdAt = recipeData.createdAt ? new Date(recipeData.createdAt) : new Date();
    this.updatedAt = recipeData.updatedAt ? new Date(recipeData.updatedAt) : new Date();
  }

  // Encapsulation and Access Modifiers demo
  private generateId(): string {
    return 'recipe_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  public get isQuickRecipe(): boolean {
    return this.cookingTimeMinutes <= 30;
  }

  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.updateTimestamp();
  }

  private updateTimestamp(): void {
    this.updatedAt = new Date();
  }

  // Example of polymorphism/overriding
  public toString(): string {
    return `${this.name} (${this.difficulty} - ${this.cookingTimeMinutes}m)`;
  }
}
