export class Recipe {
    id;
    name;
    description;
    ingredients;
    instructions;
    difficulty;
    category;
    isVegetarian;
    cookingTimeMinutes;
    imageUrl;
    isFavorite;
    createdAt;
    updatedAt;
    constructor(recipeData) {
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
    generateId() {
        return 'recipe_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    get isQuickRecipe() {
        return this.cookingTimeMinutes <= 30;
    }
    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        this.updateTimestamp();
    }
    updateTimestamp() {
        this.updatedAt = new Date();
    }
    // Example of polymorphism/overriding
    toString() {
        return `${this.name} (${this.difficulty} - ${this.cookingTimeMinutes}m)`;
    }
}
//# sourceMappingURL=Recipe.js.map