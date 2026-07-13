import { Theme } from '../enums/Theme';
import { StorageService } from './StorageService';
export declare class ThemeService {
    private currentTheme;
    private storageService;
    constructor(storageService: StorageService);
    private loadTheme;
    toggleTheme(): void;
    getCurrentTheme(): Theme;
    private applyTheme;
}
//# sourceMappingURL=ThemeService.d.ts.map