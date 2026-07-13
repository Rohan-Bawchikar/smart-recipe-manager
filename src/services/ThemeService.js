import { Theme } from '../enums/Theme';
import { AppConstants } from '../constants/AppConstants';
export class ThemeService {
    currentTheme;
    storageService;
    constructor(storageService) {
        this.storageService = storageService;
        this.currentTheme = this.loadTheme();
        this.applyTheme(this.currentTheme);
    }
    loadTheme() {
        const saved = this.storageService.getItem(AppConstants.STORAGE_KEYS.THEME);
        if (saved && Object.values(Theme).includes(saved)) {
            return saved;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
    }
    toggleTheme() {
        this.currentTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        this.storageService.setItem(AppConstants.STORAGE_KEYS.THEME, this.currentTheme);
        this.applyTheme(this.currentTheme);
    }
    getCurrentTheme() {
        return this.currentTheme;
    }
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}
//# sourceMappingURL=ThemeService.js.map