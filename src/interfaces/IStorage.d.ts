export interface IStorage {
    getItem<T>(key: string): T | null;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
    clear(): void;
}
//# sourceMappingURL=IStorage.d.ts.map