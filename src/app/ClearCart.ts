import { Koszyk } from "../Cart.js";
import { type Result, ok } from "../shared/Result.js";

export class ClearCart {
  constructor(
    private readonly cart: Koszyk
  ) {}

  execute(): Result<void, never> {
    this.cart.wyczysc();
    return ok(undefined);
  }
}
