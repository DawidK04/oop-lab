import type { IProductRepository } from "../domain/IProductRepository.js";
import { Product } from "../Product.js";

export class FakeProductRepository implements IProductRepository {
    public created: Product[] = [];

    constructor(private products: Product[] = []) { }

    async getById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) ?? null;
    }

    async list(): Promise<Product[]> {
        return [...this.products];
    }

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        this.created.push(product);
        return product;
    }
}
