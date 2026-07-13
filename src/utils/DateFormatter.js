export class DateFormatter {
    static format(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    }
    static formatRelative(date) {
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
        const daysDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (Math.abs(daysDifference) < 30) {
            return rtf.format(daysDifference, 'day');
        }
        return this.format(date);
    }
}
//# sourceMappingURL=DateFormatter.js.map