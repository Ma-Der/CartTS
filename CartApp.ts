import { CartItem }from './CartItem';
import { Cart }  from './Cart';

const wrench = new CartItem('16th', 'tool', 2, 5);
const bluePaint = new CartItem('Blueish', 'paint', 10);

const cart1 = new Cart();

cart1.addItem(wrench, 5);
cart1.addItem(bluePaint, 15);
cart1.initializeDiscounts('bestReader');
//cart1.deleteItem(bluePaint);
cart1.changeAmount(bluePaint , 1);
//cart1.discounts('midbestreader');
cart1.showCart();