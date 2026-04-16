import { KoszykItem } from "./CartItem.js";
import { Money } from "./domain/Money.js";
import { Size } from "./domain/Size.js";

export class Koszyk {
    private static koszyki: Koszyk[] = [];

    private _nazwa: string;
    private _userID: number;
    private _produkty: KoszykItem[];

    constructor(nazwa: string, userID: number) {
        this._nazwa = nazwa;
        this._userID = userID;
        this._produkty = [];
        Koszyk.koszyki.push(this);
    }

    get Nazwa(): string { return this._nazwa; }
    get userID(): number { return this._userID; }
    get produkty(): KoszykItem[] { return this._produkty; }

    static getKoszyk(nazwa: string): Koszyk | undefined {
        return Koszyk.koszyki.find(k => k.Nazwa === nazwa);
    }

    dodajProdukt(item: KoszykItem) {
        const existing = this._produkty.find(i => i.produkt.Nazwa === item.produkt.Nazwa);
        if (existing) {
            existing.ilosc += item.ilosc;
        } else {
            this._produkty.push(item);
        }
    }

    usunProdukt(item: KoszykItem) {
        this._produkty = this._produkty.filter(i => i.produkt.Nazwa !== item.produkt.Nazwa);
    }

    listaProduktow(): KoszykItem[] {
        return this._produkty;
    }

    sumaProduktow(): number {
        return this._produkty.reduce((sum, item) => sum + item.suma().amount, 0);
    }

    getTotalWeight(): number {
        return this._produkty.reduce(
            (sum, item) => sum + (item.ilosc * 1),
            0
        );
    }

    getTotalSize(): Size {
        const totalVolume = this._produkty.reduce((sum, item) => {
            const itemSize = item.produkt.Size || new Size(10, 10, 10, "cm");
            return sum + (itemSize.volume * item.ilosc);
        }, 0);

        const side = Math.pow(totalVolume, 1 / 3);
        return new Size(side, side, side, "cm");
    }

    totalPrice(): Money {
        return this._produkty.reduce(
            (sum: Money, item: KoszykItem) =>
                sum.add(item.produkt.Cena.multiply(item.ilosc)),
            new Money(0)
        );
    }
}
