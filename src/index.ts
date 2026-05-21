import { InMemoryProductRepository } from "./infra/InMemoryProductRepository.js";
import { Koszyk } from "./Cart.js";
import { AddToCart } from "./app/AddToCart.js";
import { Checkout } from "./app/Checkout.js";
import { ListProducts } from "./app/ListProducts.js";
import { CourierShipping } from "./domain/shipping/CourierShipping.js";
import { ExpressShipping } from "./domain/shipping/ExpressShipping.js";
import { DroneShipping } from "./domain/shipping/DroneShipping.js";
import { isSuccess } from "./shared/Result.js";
import { FakePaymentService } from "./infra/FakePaymentService.js";
import { NotificationService } from "./domain/NotificationService.js";
import { CartValidator } from "./domain/CartValidator.js";
import type { IOrderRepository } from "./domain/IOrderRepository.js";

async function main() {
    const repo = new InMemoryProductRepository();
    const listProducts = new ListProducts(repo);

    const products = await listProducts.execute();
    console.log("Dostępne produkty:", products.map(p => `${p.Nazwa} (${p.Cena.format()})`));

    console.log("\n--- Test Checkout ---");
    const cart = new Koszyk("Mój Koszyk", 1);
    const addToCart = new AddToCart(repo, cart);

    if (products.length > 0) {
        const laptop = products[0];
        console.log(`Dodaję do koszyka: ${laptop.Nazwa}`);
        const result = await addToCart.execute(laptop.id, 1);

        if (isSuccess(result)) {
            console.log("Sukces! Produkt dodany.");
        }
    }

    console.log("\nZawartość koszyka:");
    cart.listaProduktow().forEach(item => {
        console.log(`- ${item.produkt.Nazwa}: ${item.ilosc} szt.`);
    });

    const paymentService = new FakePaymentService();
    const notificationService = new NotificationService();
    const cartValidator = new CartValidator();
    const orderRepo: IOrderRepository = {
        save: async (order) => {
            console.log("[OrderRepo] Zapisano zamówienie o wartości:", order.total.format());
        }
    };

    const checkout = new Checkout(paymentService, orderRepo, notificationService, cartValidator);

    console.log("\nUruchamiam Checkout dla koszyka:");
    const checkoutResult = await checkout.execute(cart);
    if (isSuccess(checkoutResult)) {
        console.log("Checkout zakończony sukcesem!");
    } else {
        console.log("Checkout nieudany:", checkoutResult.error);
    }

    console.log("\n--- Test Pustego Koszyka ---");
    const emptyCart = new Koszyk("Pusty", 1);
    const emptyResult = await checkout.execute(emptyCart);
    if (!isSuccess(emptyResult)) {
        console.log(`Pusty koszyk zwrócił błąd: ${emptyResult.error}`);
    }
}

main();
