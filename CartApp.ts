import { CartItem } from "./CartItem";
import { Cart } from "./Cart";

const wrench = new CartItem("16th", "tool", 2, 5);
const bluePaint = new CartItem("Blueish", "paint", 10);
const hammer = new CartItem("hammer", "tool", 2);

const cart1 = new Cart("bestReader");

cart1.addItem(wrench, 5);
cart1.addItem(bluePaint, 15);
cart1.addItem(hammer, 2);
//cart1.deleteItem(hammer);
cart1.changeAmount(bluePaint, 1);
cart1.showCart();