export type SizeUnit = "mm" | "cm" | "m";

export class Size {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _length: number;
    private readonly _unit: SizeUnit;

    constructor(width: number, height: number, length: number, unit: SizeUnit = "cm") {
        if (width <= 0 || height <= 0 || length <= 0) {
            throw new Error("Wymiary muszą być wartościami dodatnimi.");
        }

        this._width = width;
        this._height = height;
        this._length = length;
        this._unit = unit;
    }

    get width(): number { return this._width; }
    get height(): number { return this._height; }
    get length(): number { return this._length; }
    get unit(): SizeUnit { return this._unit; }

    get volume(): number {
        return this._width * this._height * this._length;
    }

    format(): string {
        return `${this._width}x${this._height}x${this._length} ${this._unit}`;
    }

    equals(other: Size): boolean {
        if (other === null || other === undefined) {
            return false;
        }

        return this._width === other._width &&
            this._height === other._height &&
            this._length === other._length &&
            this._unit === other._unit;
    }
}
