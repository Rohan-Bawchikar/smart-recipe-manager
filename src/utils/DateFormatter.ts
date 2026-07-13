export class DateFormatter {
  public static format(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
  
  public static formatRelative(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(daysDifference) < 30) {
        return rtf.format(daysDifference, 'day');
    }
    return this.format(date);
  }
}
