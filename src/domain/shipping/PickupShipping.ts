import { Money } from "../Money.js";
import type { ShippingMethod } from "./ShippingMethod.js";
import type { Size } from "../Size.js";

export class PickupShipping implements ShippingMethod {
    calculate(size: Size): Money {
        return new Money(0);
    }

    name(): string {
        return "Pickup";
    }

    estimateDeliveryDays(): number {
        return 0;
    }

    canDeliver(size: Size): boolean {
        return true;
    }
}

