import { Difficulty } from '../enums/Difficulty';
import { Category } from '../enums/Category';
export interface IRecipe {
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
}
//# sourceMappingURL=IRecipe.d.ts.map