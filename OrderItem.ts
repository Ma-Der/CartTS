import { CartItem } from './CartItem';
import { Validation } from './Validation';

export class OrderItem {
    
    item: CartItem;
    amount: number;

    constructor(item: CartItem, amount: number) {
        Validation.isNumberValid(amount);
        this.item = item;
        this.amount = amount;
    }

    changeQuantity(amount: number): void {

        Validation.isNumberValid(amount);
        this.amount = amount;        

    }
}