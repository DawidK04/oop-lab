import { Koszyk } from "../Cart.js";
import { type Result, ok, fail } from "../shared/Result.js";

type RemoveFromCartError =
  | "PRODUCT_NOT_IN_CART";

export class RemoveFromCart {
  constructor(
    private readonly cart: Koszyk
  ) { }

  execute(
    productId: string
  ): Result<void, RemoveFromCartError> {
    const existing = this.cart.produkty.find(i => i.produkt.id === productId);

    if (!existing) {
      return fail("PRODUCT_NOT_IN_CART");
    }

    this.cart.usunProdukt(existing);

    return ok(undefined);
  }
}
