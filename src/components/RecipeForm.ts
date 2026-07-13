import { Recipe } from '../models/Recipe';
import { RecipeValidator } from '../validation/RecipeValidator';
import { RecipeFormData } from '../types/CommonTypes';
import { Difficulty } from '../enums/Difficulty';
import { Category } from '../enums/Category';


export class RecipeForm {
  private form: HTMLFormElement;
  private validator: RecipeValidator;

  constructor(
    formId: string, 
    private onSubmit: (data: RecipeFormData, id?: string) => void
  ) {
    const el = document.getElementById(formId);
    if (!el || !(el instanceof HTMLFormElement)) throw new Error(`Form ${formId} not found`);
    
    this.form = el;
    this.validator = new RecipeValidator();
    
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  public populate(recipe: Recipe): void {
    this.form.dataset.editId = recipe.id;
    (this.form.elements.namedItem('name') as HTMLInputElement).value = recipe.name;
    (this.form.elements.namedItem('description') as HTMLTextAreaElement).value = recipe.description;
    (this.form.elements.namedItem('ingredients') as HTMLTextAreaElement).value = recipe.ingredients.join('\\n');
    (this.form.elements.namedItem('instructions') as HTMLTextAreaElement).value = recipe.instructions.join('\\n');
    (this.form.elements.namedItem('cookingTimeMinutes') as HTMLInputElement).value = recipe.cookingTimeMinutes.toString();
    (this.form.elements.namedItem('difficulty') as HTMLSelectElement).value = recipe.difficulty;
    (this.form.elements.namedItem('category') as HTMLSelectElement).value = recipe.category;
    (this.form.elements.namedItem('isVegetarian') as HTMLInputElement).checked = recipe.isVegetarian;
    (this.form.elements.namedItem('imageUrl') as HTMLInputElement).value = recipe.imageUrl || '';
  }

  public reset(): void {
    this.form.reset();
    delete this.form.dataset.editId;
    this.clearErrors();
  }

  private handleSubmit(e: Event): void {
    e.preventDefault();
    this.clearErrors();

    const formData = new FormData(this.form);
    
    const data: RecipeFormData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      ingredients: (formData.get('ingredients') as string).split('\\n').map(i => i.trim()).filter(Boolean),
      instructions: (formData.get('instructions') as string).split('\\n').map(i => i.trim()).filter(Boolean),
      cookingTimeMinutes: Number(formData.get('cookingTimeMinutes')),
      difficulty: formData.get('difficulty') as Difficulty,
      category: formData.get('category') as Category,
      isVegetarian: formData.get('isVegetarian') !== null,
      imageUrl: formData.get('imageUrl') as string
    };

    const validation = this.validator.validate(data);
    
    if (!validation.isValid) {
      this.showErrors(validation.errors);
      return;
    }

    const editId = this.form.dataset.editId;
    this.onSubmit(data, editId);
  }

  private showErrors(errors: Record<string, string>): void {
    for (const [field, message] of Object.entries(errors)) {
      const input = this.form.elements.namedItem(field) as HTMLElement;
      if (input) {
        input.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'error-msg';
        errorEl.textContent = message;
        input.parentElement?.appendChild(errorEl);
      }
    }
  }

  private clearErrors(): void {
    this.form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    this.form.querySelectorAll('.error-msg').forEach(el => el.remove());
  }
}
