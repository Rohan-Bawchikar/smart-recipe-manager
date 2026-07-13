import { Recipe } from '../models/Recipe';
import { AppConstants } from '../constants/AppConstants';
import { DateFormatter } from '../utils/DateFormatter';

export class RecipeCard {
  public static create(
    recipe: Recipe, 
    onDelete: (id: string) => void, 
    onEdit: (id: string) => void,
    onToggleFavorite: (id: string) => void,
    onView: (id: string) => void
  ): HTMLElement {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.id = recipe.id;
    card.style.cursor = 'pointer';

    const imgUrl = recipe.imageUrl || AppConstants.DEFAULTS.IMAGE_URL;
    const diffClass = recipe.difficulty.toLowerCase();
    
    card.innerHTML = `
      <div class="recipe-img-wrapper">
        <img src="${imgUrl}" alt="${recipe.name}" class="recipe-img" loading="lazy" />
        <button class="favorite-btn ${recipe.isFavorite ? 'active' : ''}" title="Toggle Favorite">
          ♥
        </button>
      </div>
      <div class="recipe-content">
        <div class="recipe-header">
          <span class="badge badge-${diffClass}">${recipe.difficulty}</span>
          <span class="badge ${recipe.isVegetarian ? 'badge-veg' : 'badge-nonveg'}">
            ${recipe.isVegetarian ? 'Veg' : 'Non-Veg'}
          </span>
          ${recipe.isQuickRecipe ? '<span class="badge badge-quick">Quick</span>' : ''}
        </div>
        <h3 class="recipe-title">${recipe.name}</h3>
        <p class="recipe-category">${recipe.category} • ${recipe.cookingTimeMinutes} mins</p>
        <p class="recipe-desc">${recipe.description}</p>
        
        <div class="recipe-meta">
          <small>Added ${DateFormatter.formatRelative(recipe.createdAt)}</small>
        </div>
        
        <div class="recipe-actions">
          <button class="btn btn-outline btn-edit">Edit</button>
          <button class="btn btn-outline btn-danger btn-delete">Delete</button>
        </div>
      </div>
    `;

    // Event Bindings
    card.addEventListener('click', () => onView(recipe.id));

    card.querySelector('.btn-delete')?.addEventListener('click', (e) => {
      e.stopPropagation();
      onDelete(recipe.id);
    });
    
    card.querySelector('.btn-edit')?.addEventListener('click', (e) => {
      e.stopPropagation();
      onEdit(recipe.id);
    });
    
    card.querySelector('.favorite-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      onToggleFavorite(recipe.id);
    });

    return card;
  }
}
