import { v4 as uuidv4 } from 'uuid';
import { Validation } from './Validation';
import { CartItem } from './CartItem';
import { OrderItem } from './OrderItem';
import { discountCodes } from './discountCodes';



export class Cart {

  uuid: string;
  discount: number;
  discountCode: null | string;
  cartList: OrderItem[];

    constructor() {
      this.uuid = uuidv4();
      this.discount = 0;
      this.discountCode = null
      this.cartList = [];

      this.initializeDiscounts();
    }

    initializeDiscounts(discountCode: string = 'noDiscount'): void {
      Validation.isStringValid(discountCode);

      const isDiscountCodeExist = Object.keys(discountCodes).find(key => discountCode.toLowerCase() === key.toLowerCase())
      if(!isDiscountCodeExist) {
        throw new Error("Wrong discount code.")
      } 

      Object.keys(discountCodes).forEach(key => {
        if(discountCode === key) {
          this.discount = discountCodes[key];
          this.discountCode = key;
        }
      });
    }

    addItem(item: CartItem, amount: number): void {
      Validation.isNumberValid(amount);      
      const order = new OrderItem(item, amount);
      this.cartList.push(order);
    }

    changeAmount(item: CartItem, amount: number): void {
      Validation.isNumberValid(amount);
      if(amount === 0) this.deleteItem(item);
      this.cartList.find(element => {
        element.item.uuid === item.uuid ? element.changeQuantity(amount) : false;
  
      });
    }

    deleteItem(cartItem: CartItem): void {
      const index = this.cartList.findIndex(element => element.item.uuid === cartItem.uuid);
      this.cartList.splice(index, 1);
    }
   
    cartSummary(): number | string {
      const result = this.cartList.reduce((acc, el) => {
        return acc += ((el.item.price * el.amount) - (el.item.price * el.amount * (this.discount/100)))
      }, 0);
      if(result === 0) return ('Cart empty.');
      return result;
    }
    
    showCart(): void {
        console.log(`
        Cart:
            ${this.cartList.map((el, index) => `
            
            Product ${index + 1}

            id: ${el.item.uuid}
            name: ${el.item.name}
            category: ${el.item.category}
            price: ${el.item.price}
            discount: ${el.item.discount}
            amount: ${el.amount}
            `)}
        `);
        console.log(`Price to pay: ${this.cartSummary()} PLN.`);    
    }
  }