import { RecipeCard } from '../components/RecipeCard';
export class RecipeRenderer {
    onDelete;
    onEdit;
    onToggleFavorite;
    onView;
    container;
    emptyState;
    constructor(containerId, onDelete, onEdit, onToggleFavorite, onView) {
        this.onDelete = onDelete;
        this.onEdit = onEdit;
        this.onToggleFavorite = onToggleFavorite;
        this.onView = onView;
        const el = document.getElementById(containerId);
        if (!el)
            throw new Error(`Container ${containerId} not found`);
        this.container = el;
        let es = document.getElementById('empty-state');
        if (!es) {
            es = document.createElement('div');
            es.id = 'empty-state';
            es.className = 'empty-state';
            es.innerHTML = `
        <div class="empty-icon">🍽️</div>
        <h3>No Recipes Found</h3>
        <p>Try adjusting your search or add a new recipe.</p>
      `;
            this.container.parentElement?.appendChild(es);
        }
        this.emptyState = es;
    }
    render(recipes) {
        this.container.innerHTML = '';
        if (recipes.length === 0) {
            this.container.style.display = 'none';
            this.emptyState.style.display = 'flex';
            return;
        }
        this.container.style.display = 'grid';
        this.emptyState.style.display = 'none';
        recipes.forEach(recipe => {
            const card = RecipeCard.create(recipe, this.onDelete, this.onEdit, this.onToggleFavorite, this.onView);
            this.container.appendChild(card);
        });
    }
}
//# sourceMappingURL=RecipeRenderer.js.map