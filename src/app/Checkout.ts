import { Koszyk } from "../Cart.js";
import type { ShippingMethod } from "../domain/shipping/ShippingMethod.js";
import type { Money } from "../domain/Money.js";

export class Checkout {
    constructor(private readonly shipping: ShippingMethod) { }

    calculate(cart: Koszyk): Money {
        const size = cart.getTotalSize();
        const itemsTotal = cart.totalPrice();
        const threshold = 50000;

        if (!this.shipping.canDeliver(size)) {
            throw new Error(`Shipping method ${this.shipping.name()} cannot deliver this order (Size: ${size.volume} cm3)`);
        }

        if (itemsTotal.amount >= threshold) {
            console.log(`[Checkout] Free shipping applied for ${this.shipping.name()} (Total > 500 PLN)`);
            return itemsTotal;
        }

        const shippingCost = this.shipping.calculate(size);
        return itemsTotal.add(shippingCost);
    }
}
