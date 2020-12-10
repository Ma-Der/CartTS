import { v4 as uuidv4 } from "uuid";
import { Validation } from "./Validation";
import { ICartItem } from "./CartItem";
import { IOrderItem, OrderItem } from "./OrderItem";
import { discountCodes } from "./discountCodes";

interface ICart {
  uuid: string;
  discount: number;
  discountCode: string;
  cartList: IOrderItem[];
  _initializeDiscounts(): void;
  addItem(item: ICartItem, amount: number): void;
  changeAmount(item: ICartItem, amount: number): void;
  deleteItem(cartItem: ICartItem): void;
  cartSummary(): number | string;
  showCart(): void;
}

export class Cart implements ICart {
  uuid: string;
  discount: number;
  discountCode: string;
  cartList: IOrderItem[];

  constructor(discountCode: string = "noDiscount") {
    this.uuid = uuidv4();
    this.discount = 0;
    this.discountCode = discountCode;
    this.cartList = [];

    this._initializeDiscounts();
  }

  _initializeDiscounts(): void {
    const isDiscountCodeExist = Object.keys(discountCodes).find(
      (key) => this.discountCode.toLowerCase() === key.toLowerCase()
    );
    if (!isDiscountCodeExist) {
      throw new Error("Wrong discount code.");
    }

    Object.keys(discountCodes).forEach((key) => {
      if (this.discountCode === key) {
        this.discount = discountCodes[key];
      }
    });
  }

  addItem(item: ICartItem, amount: number): void {
    Validation.isNumberPositive(amount);
    const order = new OrderItem(item, amount);
    this.cartList.push(order);
  }

  changeAmount(item: ICartItem, amount: number): void {
    Validation.isNumberPositive(amount);
    if (amount === 0) this.deleteItem(item);

    this.cartList.forEach((element) =>
      element.item.uuid === item.uuid ? element.changeQuantity(amount) : false
    );
  }

  deleteItem(cartItem: ICartItem): void {
    const index = this.cartList.findIndex(
      (element) => element.item.uuid === cartItem.uuid
    );
    if (index === -1) throw new Error("No such item in cart.");
    this.cartList.splice(index, 1);
  }

  cartSummary(): number | string {
    const result = this.cartList.reduce((acc, el) => {
      return (acc += el.totalPrice - el.totalPrice * (this.discount / 100));
    }, 0);
    if (result === 0) return "Cart empty.";
    return result;
  }

  showCart(): void {
    console.log(`
        Cart:
            ${this.cartList.map(
              (el, index) => `
            
            Product ${index + 1}

            id: ${el.item.uuid}
            name: ${el.item.name}
            category: ${el.item.category}
            price: ${el.item.price}
            discount: ${el.item.discount}
            amount: ${el.amount}
            `
            )}
        `);
    console.log(`Price to pay: ${this.cartSummary()} PLN.`);
  }
}