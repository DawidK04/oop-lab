import type { IRepository } from "./IRepository.js";
import type { Product } from "../Product.js";

export interface IProductRepository extends IRepository<Product> {}