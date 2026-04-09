export interface IRepository<T> {
    getById(id: string): Promise<T | null>;
    list(): Promise<T[]>;
    create(item: T): Promise<T>;
}
