import { Koszyk as Cart } from "../Cart.js";

export class CartValidator {
  validate(cart: Cart): boolean {
    return cart.totalItems() > 0;
  }
}
