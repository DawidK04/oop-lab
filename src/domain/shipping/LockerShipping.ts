import { Money } from "../Money.js";
import type { ShippingMethod } from "./ShippingMethod.js";
import type { Size } from "../Size.js";

export class LockerShipping implements ShippingMethod {
    calculate(size: Size): Money {
        if (!this.canDeliver(size)) {
            throw new Error(`Locker cannot accept parcels over 25L`);
        }
        const volumeLiters = size.volume / 1000;
        return new Money(800 + volumeLiters * 100);
    }

    name(): string {
        return "Locker";
    }

    estimateDeliveryDays(): number {
        return 2;
    }

    canDeliver(size: Size): boolean {
        return size.volume <= 25000;
    }
}