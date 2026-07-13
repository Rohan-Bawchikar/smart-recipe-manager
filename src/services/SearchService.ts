import { Recipe } from '../models/Recipe';
import { FilterOption } from '../types/CommonTypes';


export class SearchService {
  public static filterAndSearch(recipes: Recipe[], query: string, filter: FilterOption, category: string): Recipe[] {
    const lowerQuery = query.toLowerCase().trim();

    return recipes.filter(recipe => {
      // Name or ingredients match
      const matchesSearch = recipe.name.toLowerCase().includes(lowerQuery) ||
                            recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery));

      let matchesFilter = true;
      if (filter === 'veg') matchesFilter = recipe.isVegetarian;
      else if (filter === 'nonveg') matchesFilter = !recipe.isVegetarian;
      else if (filter === 'favorites') matchesFilter = recipe.isFavorite;

      let matchesCategory = true;
      if (category && category !== 'all') {
        matchesCategory = recipe.category === category;
      }

      return matchesSearch && matchesFilter && matchesCategory;
    });
  }
}
