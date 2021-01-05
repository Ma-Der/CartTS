import { CartItem } from "../CartItem";
import { Cart } from "../Cart";
import { OrderItem } from "../OrderItem";

describe("Cart tests method behavior", () => {
  const wrench = new CartItem("16th", "tool", 2, 5);
  const bluePaint = new CartItem("Blueish", "paint", 10);
  const hammer = new CartItem("hammer", "tool", 2);

  const cart1 = new Cart("bestReader");

  it("adding item to cart", () => {
    cart1.addItem(wrench, 7);
    cart1.addItem(bluePaint, 15);
    cart1.addItem(hammer, 2);
    expect(cart1.cartList).toHaveLength(3);
  });

  it("adding same item to cart should increase amount of that item", () => {
    cart1.addItem(wrench, 3);
    expect(cart1.cartList).toHaveLength(3);
    expect(cart1.cartList[0].amount).toBe(10);
  });

  it("changing amount of the cart item", () => {
    cart1.changeAmount(bluePaint, 1);
    expect(cart1.cartList[1].amount).toBe(1);
  });

  it("deleting item from cart", () => {
    cart1.deleteItem(hammer);
    expect(cart1.cartList).toHaveLength(2);
  });

  it("summary of a cart", () => {
    expect(cart1.cartSummary()).toEqual(16.31);
  });
});

describe("Cart tests for checking errors", () => {
  const wrench = new CartItem("16th", "tool", 2, 5);
  const bluePaint = new CartItem("Blueish", "paint", 10);
  const hammer = new CartItem("hammer", "tool", 2);

  const cart1 = new Cart("bestReader");

  cart1.addItem(wrench, 7);
  cart1.addItem(bluePaint, 15);

  it("adding wrong arguments should throw error", () => {
    const tool = "tool";
    () => expect(cart1.addItem(tool, "asd")).toThrowError();
  });

  it("changing amount with wrong arguments", () => {
    () => expect(cart1.changeAmount(wrench, [34])).toThrowError();
    () => expect(cart1.changeAmount(tool, 34)).toThrowError();
  });

  it("deleting item with wrong arguments", () => {
    () => expect(cart1.deleteItem("asd")).toThrowError();
  });

  it("deleting item that does not exists in cart", () => {
    () => expect(cart1.deleteItem(hammer)).toThrowError();
  });
});
