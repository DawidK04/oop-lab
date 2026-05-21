import { Koszyk } from "../Cart.js";
import { KoszykItem } from "../CartItem.js";
import type { IProductRepository } from "../domain/IProductRepository.js";
import { type Result, ok, fail } from "../shared/Result.js";

type AddToCartError =
  | "PRODUCT_NOT_FOUND"
  | "INVALID_QUANTITY";

export class AddToCart {
  constructor(
    private readonly repo: IProductRepository,
    private readonly cart: Koszyk
  ) { }

  async execute(
    productId: string,
    quantity: number
  ): Promise<Result<void, AddToCartError>> {
    if (quantity <= 0) {
      return fail("INVALID_QUANTITY");
    }

    const product = await this.repo.getById(productId);

    if (!product) {
      return fail("PRODUCT_NOT_FOUND");
    }

    this.cart.dodajProdukt(new KoszykItem(product, quantity));

    return ok(undefined);
  }
}
