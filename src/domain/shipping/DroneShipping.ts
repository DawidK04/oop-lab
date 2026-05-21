import { Money } from "../Money.js";
import type { ShippingMethod } from "./ShippingMethod.js";
import type { Size } from "../Size.js";

export class DroneShipping implements ShippingMethod {
    calculate(size: Size): Money {
        if (!this.canDeliver(size)) {
            throw new Error("Drones can only carry up to 5L");
        }
        const volumeLiters = size.volume / 1000;
        return new Money(5000 + volumeLiters * 1000);
    }

    name(): string {
        return "Drone Delivery";
    }

    estimateDeliveryDays(): number {
        return 1;
    }

    canDeliver(size: Size): boolean {
        return size.volume <= 5000;
    }
}
