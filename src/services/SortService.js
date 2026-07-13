export class SortService {
    // Strategy pattern equivalent for sorting
    static sort(recipes, option) {
        const sorted = [...recipes];
        switch (option) {
            case 'newest':
                return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            case 'oldest':
                return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            case 'alphabetical':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'difficulty': {
                const diffMap = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                return sorted.sort((a, b) => (diffMap[a.difficulty] || 0) - (diffMap[b.difficulty] || 0));
            }
            default:
                return sorted;
        }
    }
}
//# sourceMappingURL=SortService.js.map