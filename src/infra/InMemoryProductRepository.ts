import type { IProductRepository } from "../domain/IProductRepository.js";
import { Product } from "../Product.js";
import { Money } from "../domain/Money.js";

export class InMemoryProductRepository
    implements IProductRepository {

    private products: Product[] = [
        new Product("Laptop", new Money(350000), "Mocny sprzęt", []),
        new Product("Myszka", new Money(15000), "Bezprzewodowa", []),
        new Product("Klawiatura", new Money(30000), "Mechaniczna", []),
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

