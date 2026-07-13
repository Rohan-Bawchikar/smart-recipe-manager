export class StorageService {
    static instance;
    // Singleton pattern for centralized storage access
    constructor() { }
    static getInstance() {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }
    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch (error) {
            console.error(`Error reading from localStorage key "${key}":`, error);
            return null;
        }
    }
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error);
        }
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}
//# sourceMappingURL=StorageService.js.map