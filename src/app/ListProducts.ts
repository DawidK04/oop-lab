import type { IProductRepository } from "../domain/IProductRepository.js";

export class ListProducts {
    constructor(private readonly repo: IProductRepository) { }

    async execute() {
        return await this.repo.list();
    }
}