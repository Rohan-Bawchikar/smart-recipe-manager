import { Theme } from '../enums/Theme';
import { StorageService } from './StorageService';
import { AppConstants } from '../constants/AppConstants';

export class ThemeService {
  private currentTheme: Theme;
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
  }

  private loadTheme(): Theme {
    const saved = this.storageService.getItem<Theme>(AppConstants.STORAGE_KEYS.THEME);
    if (saved && Object.values(Theme).includes(saved)) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
  }

  public toggleTheme(): void {
    this.currentTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.storageService.setItem(AppConstants.STORAGE_KEYS.THEME, this.currentTheme);
    this.applyTheme(this.currentTheme);
  }

  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
