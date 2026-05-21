import { Product } from "./Product.js";
import { Money } from "./domain/Money.js";


export class KoszykItem {
    private _produkt: Product;
    private _ilosc: number;

    constructor(produkt: Product, ilosc: number) {
        if (ilosc <= 0) throw new Error("Ilość musi być większa od 0");
        this._produkt = produkt;
        this._ilosc = ilosc;
    }

    get produkt(): Product { return this._produkt; }
    get ilosc(): number { return this._ilosc; }

    set ilosc(value: number) {
        if (value <= 0) throw new Error("Ilość musi być większa od 0");
        this._ilosc = value;
    }

    increase(ilosc: number): void {
        if (ilosc <= 0) throw new Error("Ilość musi być większa od 0");
        this._ilosc += ilosc;
    }

    suma(): Money {
        return this._produkt.Cena.multiply(this._ilosc);
    }
}
