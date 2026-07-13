import { Recipe } from '../models/Recipe';
import { RecipeFormData } from '../types/CommonTypes';
export declare class RecipeForm {
    private onSubmit;
    private form;
    private validator;
    constructor(formId: string, onSubmit: (data: RecipeFormData, id?: string) => void);
    populate(recipe: Recipe): void;
    reset(): void;
    private handleSubmit;
    private showErrors;
    private clearErrors;
}
//# sourceMappingURL=RecipeForm.d.ts.map