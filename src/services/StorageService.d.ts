import { IStorage } from '../interfaces/IStorage';
export declare class StorageService implements IStorage {
    private static instance;
    private constructor();
    static getInstance(): StorageService;
    getItem<T>(key: string): T | null;
    setItem<T>(key: string, value: T): void;
    removeItem(key: string): void;
    clear(): void;
}
//# sourceMappingURL=StorageService.d.ts.map