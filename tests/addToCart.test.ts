import { describe, it, expect } from "vitest";
import { AddToCart } from "../src/app/AddToCart.js";
import { InMemoryProductRepository } from "../src/infra/InMemoryProductRepository.js";
import { Koszyk } from "../src/Cart.js";
import { isSuccess } from "../src/shared/Result.js";

describe("AddToCart", () => {
  it("powinien poprawnie dodać produkt do koszyka", async () => {
    const repo = new InMemoryProductRepository();
    const cart = new Koszyk("Testowy Koszyk", 1);
    const useCase = new AddToCart(repo, cart);

    const products = await repo.list();
    const product = products[0];

    const result = await useCase.execute(product.id, 2);

    expect(isSuccess(result)).toBe(true);
    expect(cart.totalItems()).toBe(2);
    expect(cart.produkty[0].produkt.Nazwa).toBe(product.Nazwa);
  });

  it("powinien zwrócić błąd, gdy ilość jest mniejsza lub równa 0", async () => {
    const repo = new InMemoryProductRepository();
    const cart = new Koszyk("Testowy Koszyk", 1);
    const useCase = new AddToCart(repo, cart);
    const products = await repo.list();

    const result = await useCase.execute(products[0].id, 0);

    expect(isSuccess(result)).toBe(false);
    if (!isSuccess(result)) {
      expect(result.error).toBe("INVALID_QUANTITY");
    }
  });

  it("powinien zwrócić błąd, gdy produkt nie istnieje", async () => {
    const repo = new InMemoryProductRepository();
    const cart = new Koszyk("Testowy Koszyk", 1);
    const useCase = new AddToCart(repo, cart);

    const result = await useCase.execute("non-existent-id", 1);

    expect(isSuccess(result)).toBe(false);
    if (!isSuccess(result)) {
      expect(result.error).toBe("PRODUCT_NOT_FOUND");
    }
  });
});
