import type { IProductRepository } from "../domain/IProductRepository.js";
import { Product } from "../Product.js";
// import { Money } from "../domain/Money.js";

export class InMemoryProductRepository
    implements IProductRepository {

    private products: Product[] = [
        new Product("Laptop", 3500, "Mocny sprzęt", []),
        new Product("Myszka", 150, "Bezprzewodowa", []),
        new Product("Klawiatura", 300, "Mechaniczna", []),
    ];

    async getById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id === id) ?? null;
    }

    async list(): Promise<Product[]> {
        return this.products;
    }

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }
}

