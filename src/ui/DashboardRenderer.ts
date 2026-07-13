import { RecipeStats } from '../types/CommonTypes';

export class DashboardRenderer {
  private container: HTMLElement;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Dashboard container ${containerId} not found`);
    this.container = el;
  }

  public render(stats: RecipeStats): void {
    this.container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon stat-blue">📊</div>
          <div class="stat-info">
            <span class="stat-label">Total Recipes</span>
            <span class="stat-value">${stats.total}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-red">♥</div>
          <div class="stat-info">
            <span class="stat-label">Favorites</span>
            <span class="stat-value">${stats.favorites}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-green">🥬</div>
          <div class="stat-info">
            <span class="stat-label">Vegetarian</span>
            <span class="stat-value">${stats.vegetarian}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon stat-yellow">⏱</div>
          <div class="stat-info">
            <span class="stat-label">Avg. Time</span>
            <span class="stat-value">${stats.averageTime}m</span>
          </div>
        </div>
      </div>
    `;
  }
}
