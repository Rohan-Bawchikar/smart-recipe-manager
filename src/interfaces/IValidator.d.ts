export interface IValidator<T> {
    validate(data: T): ValidationResult;
}
export type ValidationResult = {
    isValid: boolean;
    errors: Record<string, string>;
};
//# sourceMappingURL=IValidator.d.ts.map