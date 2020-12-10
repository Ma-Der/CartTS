import { v4 as uuidv4 } from "uuid";
import { Validation } from "./Validation";

export interface ICartItem {
  uuid: string;
  name: string;
  category: string;
  price: number;
  priceWithDiscount: number;
  discount: number;
  modifyPrice(price: number): void;
  modifyName(name: string): void;
  modifyDiscount(discount: number): void;
  addCategory(category: string): void;
}

export class CartItem implements ICartItem {
  uuid: string;
  name: string;
  category: string;
  price: number;
  priceWithDiscount: number;
  discount: number;

  constructor(
    name: string,
    category: string,
    price: number,
    discount: number = 0
  ) {
    Validation.isStringEmpty(name);
    Validation.isStringEmpty(category);
    Validation.isNumberPositive(price);
    Validation.isNumberBetweenRange(discount, 0, 100);
    this.uuid = uuidv4();
    this.name = name;
    this.category = category;
    this.price = price;
    this.priceWithDiscount = price - (price * discount) / 100;
    this.discount = discount;
  }

  modifyPrice(price: number): void {
    Validation.isNumberPositive(price);
    this.price = price;
  }

  modifyName(name: string): void {
    Validation.isStringEmpty(name);
    this.name = name;
  }

  modifyDiscount(discount: number): void {
    Validation.isNumberBetweenRange(discount, 0, 100);
    this.discount = discount;
    this.priceWithDiscount = this.price - (this.price * discount) / 100;
  }

  addCategory(category: string): void {
    Validation.isStringEmpty(category);
    this.category = category;
  }
}