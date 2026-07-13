import { RecipeValidator } from '../validation/RecipeValidator';
export class RecipeForm {
    onSubmit;
    form;
    validator;
    constructor(formId, onSubmit) {
        this.onSubmit = onSubmit;
        const el = document.getElementById(formId);
        if (!el || !(el instanceof HTMLFormElement))
            throw new Error(`Form ${formId} not found`);
        this.form = el;
        this.validator = new RecipeValidator();
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    populate(recipe) {
        this.form.dataset.editId = recipe.id;
        this.form.elements.namedItem('name').value = recipe.name;
        this.form.elements.namedItem('description').value = recipe.description;
        this.form.elements.namedItem('ingredients').value = recipe.ingredients.join('\\n');
        this.form.elements.namedItem('instructions').value = recipe.instructions.join('\\n');
        this.form.elements.namedItem('cookingTimeMinutes').value = recipe.cookingTimeMinutes.toString();
        this.form.elements.namedItem('difficulty').value = recipe.difficulty;
        this.form.elements.namedItem('category').value = recipe.category;
        this.form.elements.namedItem('isVegetarian').checked = recipe.isVegetarian;
        this.form.elements.namedItem('imageUrl').value = recipe.imageUrl || '';
    }
    reset() {
        this.form.reset();
        delete this.form.dataset.editId;
        this.clearErrors();
    }
    handleSubmit(e) {
        e.preventDefault();
        this.clearErrors();
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            description: formData.get('description'),
            ingredients: formData.get('ingredients').split('\\n').map(i => i.trim()).filter(Boolean),
            instructions: formData.get('instructions').split('\\n').map(i => i.trim()).filter(Boolean),
            cookingTimeMinutes: Number(formData.get('cookingTimeMinutes')),
            difficulty: formData.get('difficulty'),
            category: formData.get('category'),
            isVegetarian: formData.get('isVegetarian') !== null,
            imageUrl: formData.get('imageUrl')
        };
        const validation = this.validator.validate(data);
        if (!validation.isValid) {
            this.showErrors(validation.errors);
            return;
        }
        const editId = this.form.dataset.editId;
        this.onSubmit(data, editId);
    }
    showErrors(errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = this.form.elements.namedItem(field);
            if (input) {
                input.classList.add('error');
                const errorEl = document.createElement('div');
                errorEl.className = 'error-msg';
                errorEl.textContent = message;
                input.parentElement?.appendChild(errorEl);
            }
        }
    }
    clearErrors() {
        this.form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        this.form.querySelectorAll('.error-msg').forEach(el => el.remove());
    }
}
//# sourceMappingURL=RecipeForm.js.map