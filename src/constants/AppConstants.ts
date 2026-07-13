export const AppConstants = {
  STORAGE_KEYS: {
    RECIPES: 'smart_recipes_v2',
    THEME: 'smart_recipes_theme',
  },
  DEFAULTS: {
    IMAGE_URL: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800',
    PAGINATION_LIMIT: 10,
  },
  MESSAGES: {
    SUCCESS_ADD: 'Recipe added successfully!',
    SUCCESS_UPDATE: 'Recipe updated successfully!',
    SUCCESS_DELETE: 'Recipe deleted.',
    ERROR_VALIDATION: 'Please fix the errors in the form.',
    ERROR_DUPLICATE: 'A recipe with this name already exists.',
  },
} as const;
