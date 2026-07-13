import './style.css';
import { StorageService } from './services/StorageService';
import { RecipeService } from './services/RecipeService';
import { ThemeService } from './services/ThemeService';
import { StatisticsService } from './services/StatisticsService';
import { SearchService } from './services/SearchService';
import { SortService } from './services/SortService';

import { DashboardRenderer } from './ui/DashboardRenderer';
import { RecipeRenderer } from './ui/RecipeRenderer';
import { Toast } from './ui/Toast';
import { Modal } from './ui/Modal';
import { RecipeForm } from './components/RecipeForm';
import { FilterPanel } from './components/FilterPanel';
import { SearchBar } from './components/SearchBar';
import { AppConstants } from './constants/AppConstants';
import { Category } from './enums/Category';

import { ParallaxEffect } from './ui/ParallaxEffect';

class App {
  private recipeService: RecipeService;
  private themeService: ThemeService;
  
  private dashboardRenderer: DashboardRenderer;
  private recipeRenderer: RecipeRenderer;
  private recipeForm: RecipeForm;
  private filterPanel: FilterPanel;
  private searchBar: SearchBar;
  private formModal: Modal;
  private viewModal: Modal;

  constructor() {
    const storageService = StorageService.getInstance();
    this.themeService = new ThemeService(storageService);
    this.recipeService = new RecipeService(storageService);
    
    // Seed mock data if empty
    this.seedInitialData();

    // Initialize UI Effects
    new ParallaxEffect('hero-banner', 'hero-parallax-bg', 0.4);

    // Initialize Renderers and Components
    this.dashboardRenderer = new DashboardRenderer('dashboard-container');
    
    this.recipeRenderer = new RecipeRenderer(
      'recipe-grid',
      this.handleDeleteRecipe.bind(this),
      this.handleEditRecipe.bind(this),
      this.handleToggleFavorite.bind(this),
      this.handleViewRecipe.bind(this)
    );

    this.recipeForm = new RecipeForm('recipe-form', this.handleSaveRecipe.bind(this));
    
    this.filterPanel = new FilterPanel(() => this.updateView());
    this.searchBar = new SearchBar('search-input', () => this.updateView());
    
    this.formModal = new Modal('form-modal');
    this.viewModal = new Modal('view-modal');

    this.bindGlobalEvents();
    this.updateView();
  }

  private bindGlobalEvents(): void {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      this.themeService.toggleTheme();
    });

    document.getElementById('btn-add-recipe')?.addEventListener('click', () => {
      this.recipeForm.reset();
      this.formModal.show();
    });
  }

  private updateView(): void {
    const allRecipes = this.recipeService.getAllRecipes();
    
    // Update Dashboard
    const stats = StatisticsService.calculateStats(allRecipes);
    this.dashboardRenderer.render(stats);

    // Filter, Search, and Sort Recipes
    const query = this.searchBar.getQuery();
    const { sort, filter, category } = this.filterPanel.getValues();

    const filtered = SearchService.filterAndSearch(allRecipes, query, filter, category);
    const sorted = SortService.sort(filtered, sort);

    this.recipeRenderer.render(sorted);
  }

  private handleSaveRecipe(data: any, editId?: string): void {
    try {
      if (editId) {
        this.recipeService.updateRecipe(editId, data);
        Toast.show(AppConstants.MESSAGES.SUCCESS_UPDATE, 'success');
      } else {
        this.recipeService.addRecipe(data);
        Toast.show(AppConstants.MESSAGES.SUCCESS_ADD, 'success');
      }
      this.formModal.hide();
      this.updateView();
    } catch (error: any) {
      Toast.show(error.message, 'error');
    }
  }

  private async handleDeleteRecipe(id: string): Promise<void> {
    const confirm = await Modal.confirm('Are you sure you want to delete this recipe? This action cannot be undone.');
    if (confirm) {
      this.recipeService.deleteRecipe(id);
      Toast.show(AppConstants.MESSAGES.SUCCESS_DELETE, 'success');
      this.updateView();
    }
  }

  private handleEditRecipe(id: string): void {
    const recipe = this.recipeService.getRecipeById(id);
    if (recipe) {
      this.recipeForm.populate(recipe);
      this.formModal.show();
    }
  }

  private handleToggleFavorite(id: string): void {
    this.recipeService.toggleFavorite(id);
    this.updateView();
  }

  private handleViewRecipe(id: string): void {
    const recipe = this.recipeService.getRecipeById(id);
    if (!recipe) return;

    const imgEl = document.getElementById('view-img') as HTMLImageElement;
    if (imgEl) imgEl.src = recipe.imageUrl || AppConstants.DEFAULTS.IMAGE_URL;

    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.textContent = recipe.name;

    const descEl = document.getElementById('view-desc');
    if (descEl) descEl.textContent = recipe.description;

    const diffEl = document.getElementById('view-difficulty');
    if (diffEl) {
      diffEl.textContent = recipe.difficulty;
      diffEl.className = `badge badge-${recipe.difficulty.toLowerCase()}`;
    }

    const dietEl = document.getElementById('view-diet');
    if (dietEl) {
      dietEl.textContent = recipe.isVegetarian ? 'Veg' : 'Non-Veg';
      dietEl.className = `badge ${recipe.isVegetarian ? 'badge-veg' : 'badge-nonveg'}`;
    }

    const timeEl = document.getElementById('view-time');
    if (timeEl) timeEl.textContent = recipe.cookingTimeMinutes.toString();

    const ingEl = document.getElementById('view-ingredients');
    if (ingEl) {
      ingEl.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
    }

    const instEl = document.getElementById('view-instructions');
    if (instEl) {
      instEl.innerHTML = recipe.instructions.map(inst => `<li>${inst}</li>`).join('');
    }

    this.viewModal.show();
  }

  private seedInitialData(): void {
    if (this.recipeService.getAllRecipes().length === 0) {
      const initialRecipes = [
        {
          name: 'Butter Chicken (Murgh Makhani)',
          description: 'A rich, creamy, and mildly spiced Indian curry made with marinated chicken.',
          ingredients: ['Chicken thighs', 'Yogurt', 'Tomato puree', 'Butter', 'Heavy cream', 'Garam Masala'],
          instructions: ['Marinate chicken overnight', 'Grill or pan-fry chicken', 'Prepare tomato-butter gravy', 'Simmer chicken in gravy', 'Finish with cream'],
          cookingTimeMinutes: 45,
          difficulty: 'Medium' as any,
          category: Category.DINNER,
          isVegetarian: false,
          imageUrl: import.meta.env.BASE_URL + 'images/butter_chicken.png'
        },
        {
          name: 'Palak Paneer',
          description: 'A popular vegetarian dish consisting of paneer in a thick paste made from puréed spinach.',
          ingredients: ['Paneer (cottage cheese)', 'Spinach', 'Onions', 'Tomatoes', 'Garlic', 'Spices'],
          instructions: ['Blanch and purée spinach', 'Saute onions, garlic, and tomatoes', 'Add spices and spinach purée', 'Add cubed paneer', 'Simmer for 5 mins'],
          cookingTimeMinutes: 30,
          difficulty: 'Medium' as any,
          category: Category.LUNCH,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/palak_paneer.png'
        },
        {
          name: 'Masala Dosa',
          description: 'A crispy, fermented crepe made from rice batter and black lentils, filled with a potato curry.',
          ingredients: ['Dosa batter (rice & lentils)', 'Potatoes', 'Onions', 'Mustard seeds', 'Curry leaves'],
          instructions: ['Prepare potato filling (masala)', 'Spread batter on a hot griddle', 'Cook until crispy', 'Place filling in the center and fold', 'Serve with chutney'],
          cookingTimeMinutes: 40,
          difficulty: 'Hard' as any,
          category: Category.BREAKFAST,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/masala_dosa.png'
        },
        {
          name: 'Chole Bhature',
          description: 'A combination of chana masala (spicy white chickpeas) and bhatura/puri, a deep-fried bread.',
          ingredients: ['Chickpeas', 'Refined flour', 'Onions', 'Tomatoes', 'Chole masala'],
          instructions: ['Soak chickpeas overnight and boil', 'Prepare spicy tomato-onion gravy', 'Simmer chickpeas in gravy', 'Knead dough and rest', 'Deep fry bhaturas'],
          cookingTimeMinutes: 60,
          difficulty: 'Medium' as any,
          category: Category.LUNCH,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/chole_bhature.png'
        },
        {
          name: 'Hyderabadi Chicken Biryani',
          description: 'A highly aromatic and delicious mixed rice dish with marinated chicken and saffron.',
          ingredients: ['Basmati rice', 'Chicken', 'Yogurt', 'Fried onions', 'Saffron', 'Biryani spices'],
          instructions: ['Marinate chicken with yogurt and spices', 'Part-boil basmati rice', 'Layer chicken and rice in a pot', 'Seal and cook on dum (slow heat)', 'Garnish with fried onions'],
          cookingTimeMinutes: 90,
          difficulty: 'Hard' as any,
          category: Category.DINNER,
          isVegetarian: false,
          imageUrl: import.meta.env.BASE_URL + 'images/chicken_biryani.png'
        },
        {
          name: 'Punjabi Samosa',
          description: 'A deep-fried pastry with a savory filling of spiced potatoes, onions, and peas.',
          ingredients: ['All-purpose flour', 'Potatoes', 'Green peas', 'Cumin seeds', 'Garam masala'],
          instructions: ['Knead stiff dough', 'Boil and mash potatoes, mix with spices and peas', 'Roll dough and shape into cones', 'Stuff with filling', 'Deep fry until golden'],
          cookingTimeMinutes: 45,
          difficulty: 'Medium' as any,
          category: Category.SNACK,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/punjabi_samosa.png'
        },
        {
          name: 'Gulab Jamun',
          description: 'A milk-solid-based sweet, deeply fried and soaked in a sugary syrup.',
          ingredients: ['Khoya (milk solids)', 'All-purpose flour', 'Sugar', 'Cardamom', 'Rose water'],
          instructions: ['Make dough from khoya and flour', 'Shape into small balls', 'Deep fry on low heat', 'Prepare sugar syrup with cardamom', 'Soak fried balls in hot syrup'],
          cookingTimeMinutes: 40,
          difficulty: 'Medium' as any,
          category: Category.DESSERT,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/gulab_jamun.png'
        },
        {
          name: 'Dal Makhani',
          description: 'A classic Indian dish made with whole black lentils, red kidney beans, butter and cream.',
          ingredients: ['Whole black lentils (urad dal)', 'Kidney beans (rajma)', 'Butter', 'Cream', 'Tomato puree'],
          instructions: ['Soak lentils and beans overnight', 'Slow cook until very soft', 'Prepare tadka with tomatoes and spices', 'Mix tadka into dal', 'Simmer with butter and cream'],
          cookingTimeMinutes: 120,
          difficulty: 'Medium' as any,
          category: Category.LUNCH,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/dal_makhani.png'
        },
        {
          name: 'Tandoori Chicken',
          description: 'Chicken dish prepared by roasting chicken marinated in yogurt and spices in a tandoor.',
          ingredients: ['Chicken (bone-in)', 'Yogurt', 'Lemon juice', 'Tandoori masala', 'Ginger garlic paste'],
          instructions: ['Make deep cuts in chicken pieces', 'Apply first marinade (lemon, salt, chili)', 'Apply second marinade (yogurt, spices)', 'Rest for 4 hours', 'Grill or bake until charred'],
          cookingTimeMinutes: 45,
          difficulty: 'Medium' as any,
          category: Category.DINNER,
          isVegetarian: false,
          imageUrl: import.meta.env.BASE_URL + 'images/tandoori_chicken.png'
        },
        {
          name: 'Paneer Tikka',
          description: 'Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor.',
          ingredients: ['Paneer', 'Bell peppers', 'Onions', 'Yogurt', 'Besan (gram flour)', 'Tikka masala'],
          instructions: ['Cut paneer and veggies into cubes', 'Prepare yogurt and spice marinade', 'Coat paneer and veggies, let rest', 'Thread onto skewers', 'Grill or pan-fry until charred'],
          cookingTimeMinutes: 35,
          difficulty: 'Easy' as any,
          category: Category.SNACK,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/paneer_tikka.png'
        },
        {
          name: 'Rogan Josh',
          description: 'An aromatic lamb dish of Persian origin, which is one of the signature recipes of Kashmiri cuisine.',
          ingredients: ['Lamb or Mutton', 'Yogurt', 'Kashmiri red chilies', 'Fennel powder', 'Ginger powder'],
          instructions: ['Brown the meat in oil or ghee', 'Add whole spices', 'Mix yogurt with spice powders and add to pan', 'Simmer on low heat until meat is tender', 'Garnish and serve'],
          cookingTimeMinutes: 90,
          difficulty: 'Hard' as any,
          category: Category.DINNER,
          isVegetarian: false,
          imageUrl: import.meta.env.BASE_URL + 'images/rogan_josh.png'
        },
        {
          name: 'Idli Sambar',
          description: 'Savory rice cake served with a lentil-based vegetable stew, cooked with tamarind broth.',
          ingredients: ['Idli batter', 'Toor dal', 'Mixed vegetables', 'Tamarind paste', 'Sambar powder'],
          instructions: ['Steam idli batter in molds', 'Boil dal until soft', 'Cook veggies in tamarind water', 'Mix dal, veggies, and sambar powder', 'Temper with mustard seeds and curry leaves'],
          cookingTimeMinutes: 40,
          difficulty: 'Medium' as any,
          category: Category.BREAKFAST,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/idli_sambar.png'
        },
        {
          name: 'Rasgulla',
          description: 'A syrupy dessert made from ball-shaped dumplings of chhena (an Indian cottage cheese).',
          ingredients: ['Milk', 'Lemon juice', 'Sugar', 'Water', 'Cardamom'],
          instructions: ['Curdle milk to make chhena', 'Knead chhena until smooth', 'Roll into small balls', 'Boil sugar and water to make syrup', 'Cook balls in boiling syrup until spongy'],
          cookingTimeMinutes: 45,
          difficulty: 'Medium' as any,
          category: Category.DESSERT,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/rasgulla.png'
        },
        {
          name: 'Aloo Gobi',
          description: 'A vegetarian dish made with potatoes (aloo), cauliflower (gob(h)i), and Indian spices.',
          ingredients: ['Potatoes', 'Cauliflower', 'Onions', 'Tomatoes', 'Turmeric', 'Cumin'],
          instructions: ['Cut potatoes and cauliflower into florets', 'Saute onions and tomatoes', 'Add spices', 'Add veggies, cover and cook on low heat', 'Garnish with coriander'],
          cookingTimeMinutes: 30,
          difficulty: 'Easy' as any,
          category: Category.LUNCH,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/aloo_gobi.png'
        },
        {
          name: 'Vada Pav',
          description: 'A deep-fried potato dumpling placed inside a bread bun sliced almost in half through the middle.',
          ingredients: ['Potatoes', 'Pav (bread buns)', 'Besan (gram flour)', 'Green chilies', 'Garlic dry chutney'],
          instructions: ['Make spiced mashed potato balls', 'Dip in besan batter and deep fry (Vada)', 'Slit pav and apply green and garlic chutneys', 'Place vada inside the pav', 'Serve hot with fried chilies'],
          cookingTimeMinutes: 40,
          difficulty: 'Medium' as any,
          category: Category.SNACK,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/vada_pav.png'
        },
        {
          name: 'Gajar Ka Halwa',
          description: 'A carrot-based sweet dessert pudding made by placing grated carrots in a pot containing a specific amount of water, milk and sugar.',
          ingredients: ['Carrots', 'Milk', 'Sugar', 'Ghee', 'Nuts', 'Cardamom'],
          instructions: ['Grate carrots', 'Roast carrots in ghee', 'Add milk and simmer until absorbed', 'Add sugar and cook until thick', 'Garnish with nuts and cardamom'],
          cookingTimeMinutes: 60,
          difficulty: 'Medium' as any,
          category: Category.DESSERT,
          isVegetarian: true,
          imageUrl: import.meta.env.BASE_URL + 'images/gajar_halwa.png'
        }
      ];

      initialRecipes.forEach((recipe) => {
        this.recipeService.addRecipe(recipe);
      });
      
      // Toggle favorite on a couple of recipes
      const recipes = this.recipeService.getAllRecipes();
      if(recipes.length > 0 && recipes[0]) this.recipeService.toggleFavorite(recipes[0].id);
      if(recipes.length > 4 && recipes[4]) this.recipeService.toggleFavorite(recipes[4].id);
    }
  }
}

// Bootstrap application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
