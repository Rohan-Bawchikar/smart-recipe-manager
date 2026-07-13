export class RecipeValidator {
    validate(data) {
        const errors = {};
        if (!data.name || data.name.trim().length === 0) {
            errors['name'] = 'Recipe name is required.';
        }
        else if (data.name.length > 50) {
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
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=RecipeValidator.js.map