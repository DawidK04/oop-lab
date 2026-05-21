import { Money } from "./Money.js";

export class DiscountService {
  calculateDiscount(total: Money): Money {
    if (total.amount > 10000) {
      return total.multiply(0.1);
    }
    return new Money(0, total.currency);
  }
}
