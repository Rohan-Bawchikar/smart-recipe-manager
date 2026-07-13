import { IValidator, ValidationResult } from '../interfaces/IValidator';
import { RecipeFormData } from '../types/CommonTypes';

export class RecipeValidator implements IValidator<RecipeFormData> {
  public validate(data: RecipeFormData): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.name || data.name.trim().length === 0) {
      errors['name'] = 'Recipe name is required.';
    } else if (data.name.length > 50) {
      errors['name'] = 'Recipe name must be less than 50 characters.';
    }

    if (!data.description || data.description.trim().length === 0) {
      errors['description'] = 'Description is required.';
    }

    if (!data.ingredients || data.ingredients.length === 0) {
      errors['ingredients'] = 'At least one ingredient is required.';
    }

    if (!data.instructions || data.instructions.length === 0) {
      errors['instructions'] = 'At least one instruction is required.';
    }

    if (data.cookingTimeMinutes <= 0) {
      errors['cookingTimeMinutes'] = 'Cooking time must be a positive number.';
    }

    if (data.imageUrl && !this.isValidUrl(data.imageUrl)) {
      errors['imageUrl'] = 'Invalid image URL format.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
