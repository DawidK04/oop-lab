import { describe, it, expect } from "vitest";
import { Checkout } from "../src/app/Checkout.js";
import { FakePaymentService } from "../src/infra/FakePaymentService.js";
import { NotificationService } from "../src/domain/NotificationService.js";
import { CartValidator } from "../src/domain/CartValidator.js";
import { Koszyk as Cart } from "../src/Cart.js";
import type { IOrderRepository } from "../src/domain/IOrderRepository.js";

class FakeRepo implements IOrderRepository {
  async save(order: any): Promise<void> {
  }
}

describe("Checkout", () => {
  it("fails for empty cart", async () => {
    const checkout = new Checkout(
      new FakePaymentService(),
      new FakeRepo(),
      new NotificationService(),
      new CartValidator()
    );

    const result = await checkout.execute(new Cart());

    expect(result.success).toBe(false);
  });
});
