import { v4 as uuidv4 } from 'uuid';
import { Validation } from'./Validation';

export class CartItem {

  uuid: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  
    constructor(name: string, category: string, price: number, discount: number = 0) {
      Validation.isStringValid(name);
      Validation.isStringValid(category);
      Validation.isNumberValid(price);
      Validation.isDiscountValid(discount);
      this.uuid = uuidv4();
      this.name = name;
      this.category = category;
      this.price = price - (price * discount / 100);
      this.discount = discount;
    }
   
    modifyPrice(price: number): void {
      Validation.isNumberValid(price);
      this.price = price;
    }
   
    modifyName(name: string): void {
      Validation.isStringValid(name);
      this.name = name;
    }
   
    modifyDiscount(discount: number): void {
      Validation.isDiscountValid(discount);
      this.discount = discount;
    }
   
    addCategory(category: string): void {
      Validation.isStringValid(category);
      this.category = category;
    }
  };
