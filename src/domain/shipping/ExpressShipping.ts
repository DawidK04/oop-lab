import { Money } from "../Money.js";
import type { ShippingMethod } from "./ShippingMethod.js";
import type { Size } from "../Size.js";

export class ExpressShipping implements ShippingMethod {
    calculate(size: Size): Money {
        if (!this.canDeliver(size)) {
            throw new Error(`${this.name()} limit is 30L`);
        }
        const volumeLiters = size.volume / 1000;
        return new Money(3000 + volumeLiters * 300);
    }

    name(): string {
        return "Express Courier";
    }

    estimateDeliveryDays(): number {
        return 2;
    }

    canDeliver(size: Size): boolean {
        return size.volume <= 30000;
    }
}

