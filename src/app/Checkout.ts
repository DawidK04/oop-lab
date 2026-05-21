import { type Result, ok, fail } from "../shared/Result.js";
import type { IPaymentService } from "../domain/IPaymentService.js";
import type { IOrderRepository } from "../domain/IOrderRepository.js";
import { NotificationService } from "../domain/NotificationService.js";
import { CartValidator } from "../domain/CartValidator.js";
import { Koszyk as Cart } from "../Cart.js";

type CheckoutError =
    | "EMPTY_CART"
    | "PAYMENT_FAILED";

export class Checkout {
    constructor(
        private readonly payment: IPaymentService,
        private readonly repo: IOrderRepository,
        private readonly notifier: NotificationService,
        private readonly validator: CartValidator
    ) { }

    async execute(cart: Cart): Promise<Result<void, CheckoutError>> {
        if (!this.validator.validate(cart)) {
            return fail("EMPTY_CART");
        }

        const total = cart.totalPrice();

        const success = this.payment.pay(total);

        if (!success) {
            return fail("PAYMENT_FAILED");
        }

        await this.repo.save({
            items: cart.getItems(),
            total
        });

        this.notifier.send();

        return ok(undefined);
    }
}
