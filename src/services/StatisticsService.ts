import { Recipe } from '../models/Recipe';
import { RecipeStats } from '../types/CommonTypes';


export class StatisticsService {
  public static calculateStats(recipes: Recipe[]): RecipeStats {
    const stats: RecipeStats = {
      total: recipes.length,
      favorites: 0,
      vegetarian: 0,
      nonVegetarian: 0,
      averageTime: 0,
      difficultyCounts: {}
    };

    let totalTime = 0;

    recipes.forEach(recipe => {
      if (recipe.isFavorite) stats.favorites++;
      if (recipe.isVegetarian) stats.vegetarian++;
      else stats.nonVegetarian++;

      totalTime += recipe.cookingTimeMinutes;

      stats.difficultyCounts[recipe.difficulty] = (stats.difficultyCounts[recipe.difficulty] || 0) + 1;
    });

    stats.averageTime = recipes.length > 0 ? Math.round(totalTime / recipes.length) : 0;

    return stats;
  }
}
