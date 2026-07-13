import { IRecipe } from '../interfaces/IRecipe';
import { Difficulty } from '../enums/Difficulty';
import { Category } from '../enums/Category';
export declare class Recipe implements IRecipe {
    readonly id: string;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    difficulty: Difficulty;
    category: Category;
    isVegetarian: boolean;
    cookingTimeMinutes: number;
    imageUrl?: string;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(recipeData: Partial<IRecipe> & {
        name: string;
        description: string;
        ingredients: string[];
        instructions: string[];
        cookingTimeMinutes: number;
        difficulty: Difficulty;
        category: Category;
        isVegetarian: boolean;
    });
    private generateId;
    get isQuickRecipe(): boolean;
    toggleFavorite(): void;
    private updateTimestamp;
    toString(): string;
}
//# sourceMappingURL=Recipe.d.ts.map