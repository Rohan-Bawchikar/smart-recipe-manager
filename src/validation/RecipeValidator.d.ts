import { IValidator, ValidationResult } from '../interfaces/IValidator';
import { RecipeFormData } from '../types/CommonTypes';
export declare class RecipeValidator implements IValidator<RecipeFormData> {
    validate(data: RecipeFormData): ValidationResult;
    private isValidUrl;
}
//# sourceMappingURL=RecipeValidator.d.ts.map