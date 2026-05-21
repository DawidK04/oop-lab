import type { Money } from "../Money.js";
import type { Size } from "../Size.js";

export interface ShippingMethod {
    calculate(size: Size): Money;
    name(): string;
    estimateDeliveryDays(): number;
    canDeliver(size: Size): boolean;
}
