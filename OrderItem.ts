import { ICartItem } from "./CartItem";
import { Validation } from "./Validation";

export interface IOrderItem {
  item: ICartItem;
  amount: number;
  totalPrice: number;
  changeQuantity(amount: number): void;
  _countTotalPrice(amount: number): void;
}

export class OrderItem implements IOrderItem {
  item: ICartItem;
  amount: number;
  totalPrice: number;

  constructor(item: ICartItem, amount: number) {
    Validation.isIntegerPositive(amount);
    this.item = item;
    this.amount = amount;
    this.totalPrice = this.item.priceWithDiscount * this.amount;
  }

  changeQuantity(amount: number): void {
    Validation.isIntegerPositive(amount);
    this.amount = amount;
    this._countTotalPrice(amount);
  }

  _countTotalPrice(amount: number): void {
    Validation.isIntegerPositive(amount);
    this.totalPrice = this.item.priceWithDiscount * amount;
  }
}
}