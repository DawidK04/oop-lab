import { Uzytkownik } from "./Uzytkownik.js";
import { Money } from "./domain/Money.js";
import { type ProductFeature, ShippingFeature } from "./domain/ProductFeature.js";
import { Size } from "./domain/Size.js";

export class Product {
    private static products: Product[] = [];

    private readonly _id: string;
    private _nazwa: string;
    private _cena: Money;
    private _opis: string;
    private _opinie: string[];
    private _features: ProductFeature[] = [];
    private _size?: Size;

    constructor(id: string, nazwa: string, features: ProductFeature[]);
    constructor(nazwa: string, cena: Money, opis: string, opinie: string[]);
    constructor(arg1: string, arg2: any, arg3: any, arg4?: any) {
        if (Array.isArray(arg3)) {
            this._id = arg1;
            this._nazwa = arg2;
            this._cena = new Money(0);
            this._opis = "";
            this._opinie = [];
            for (const f of arg3) {
                this.addFeature(f);
            }
        } else {
            this._id = crypto.randomUUID();
            this._nazwa = arg1;
            this._cena = arg2;
            this._opis = arg3;
            this._opinie = arg4 || [];
        }
    }

    get id(): string { return this._id; }
    get Nazwa(): string { return this._nazwa; }
    get Cena(): Money { return this._cena; }
    get Opis(): string { return this._opis; }
    get Opinie(): string[] { return this._opinie; }
    get Size(): Size | undefined { return this._size; }

    set Cena(value: Money) {
        // Money constructor already throws if amount < 0
        this._cena = value;
    }

    set Size(value: Size) {
        this._size = value;
    }

    addFeature(feature: ProductFeature) {
        if (feature instanceof ShippingFeature) {
            const hasShipping = this._features.some(f => f instanceof ShippingFeature);
            if (hasShipping) {
                throw new Error("Produkt nie może mieć więcej niż jednego ShippingFeature.");
            }
        }
        this._features.push(feature);
    }

    getFeatures<T extends ProductFeature>(type: new (...args: any[]) => T): T[] {
        return this._features.filter((f): f is T => f instanceof type);
    }

    dodajProdukt() {
        Product.products.push(this);
    }

    static findProduct(name: string): Product | undefined {
        return Product.products.find(p => p.Nazwa === name);
    }

    dodajOpinie(opinia: string, userID: number) {
        this._opinie.push(`User ${Uzytkownik.getNameFromID(userID)}: ${opinia}`);
    }

    static listOpinie(name: string): string[] | undefined {
        return Product.findProduct(name)?.Opinie;
    }

    validate(): void {
        const hasShipping = this._features.some(f => f instanceof ShippingFeature);
        if (hasShipping && !this._size) {
            throw new Error("Błąd Walidacji: Produkt posiadający opcję wysyłki (ShippingFeature) musi mieć zdefiniowany rozmiar (Size VO).");
        }
    }
}

