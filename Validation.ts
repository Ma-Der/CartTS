import { OrderItem } from './OrderItem';

export class Validation {
    constructor() {}

    static isStringValid(str: string): void {
        if(str.length === 0) throw new Error("Empty string.")
    }
    static isNumberValid(num: number): void {
        if(isNaN(num)) throw new Error("Argument should be a number.");
        if(!(num >= 0)) throw new Error("Argument should be more or equal to zero.");
    }
    static isInstanceExistsInList(instance: OrderItem, list: OrderItem[]): boolean {
        return list.some(element => instance.item.uuid === element.item.uuid);
      }
    static isDiscountValid(discount: number): void {
        this.isNumberValid(discount);
        if(discount > 100) throw new Error("Discount is a percentage number. Its value needs to be beetween 0 and a 100.");
    }
};
