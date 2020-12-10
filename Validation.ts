import { IOrderItem } from "./OrderItem";

export class Validation {
  static isStringEmpty(str: string): void {
    if (str.length === 0) throw new Error("Empty string.");
  }
  static isNumberPositive(num: number): void {
    if (isNaN(num)) throw new Error("Argument should be a number.");
    if (!(num >= 0))
      throw new Error("Argument should be more or equal to zero.");
  }
  static isIntegerPositive(num: number): void {
    this.isNumberPositive(num);
    if (!Number.isInteger(num)) throw new Error("Argument should be integer.");
  }
  static isInstanceExistsInList(
    instance: IOrderItem,
    list: IOrderItem[]
  ): boolean {
    return list.some((element) => instance.item.uuid === element.item.uuid);
  }
  static isNumberBetweenRange(value: number, min: number, max: number): void {
    this.isNumberPositive(value);
    this.isNumberPositive(min);
    this.isNumberPositive(max);
    if (!(value >= 0 || value <= 100)) {
      throw new Error(
        "Discount is a percentage number. Its value needs to be beetween 0 and a 100."
      );
    }
  }
}
