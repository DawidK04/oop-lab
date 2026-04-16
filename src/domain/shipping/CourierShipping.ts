import { Money } from "../Money.js";
import type { ShippingMethod } from "./ShippingMethod.js";
import type { Size } from "../Size.js";

export class CourierShipping implements ShippingMethod {
    calculate(size: Size): Money {
        if (!this.canDeliver(size)) {
            throw new Error(`Carrier ${this.name()} cannot deliver size exceeding 50L (50000 cm3)`);
        }
        const volumeLiters = size.volume / 1000;
        return new Money(1500 + volumeLiters * 200);
    }

    name(): string {
        return "Courier";
    }

    estimateDeliveryDays(): number {
        return 3;
    }

    canDeliver(size: Size): boolean {
        return size.volume <= 50000;
    }
}
