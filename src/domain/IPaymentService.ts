import { Money } from "./Money.js";

export interface IPaymentService {
    pay(amount: Money): boolean;
}
