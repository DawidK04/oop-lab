import type { IPaymentService } from "../domain/IPaymentService.js";
import { Money } from "../domain/Money.js";

export class FakePaymentService implements IPaymentService {
    pay(amount: Money): boolean {
        return Math.random() > 0.5;
    }
}
