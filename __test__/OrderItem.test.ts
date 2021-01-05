import { OrderItem } from "../OrderItem";
import { CartItem } from "../CartItem";

const wrench = new CartItem("16th", "tool", 2, 5);
const bluePaint = new CartItem("Blueish", "paint", 10);
const hammer = new CartItem("hammer", "tool", 2);

const order1 = new OrderItem(wrench, 5);

describe("OrderItem tests methods behavior", () => {
  it("changing quantity", () => {
    order1.changeQuantity(1);
    expect(order1.amount).toBe(1);
  });
});

describe("OrderItem tests for errors", () => {
  it("changing quantity with bad argument", () => {
    () => expect(order1.changeQuantity("asd")).toThrowError();
    () => expect(order1.changeQuantity()).toThrowError();
    () => expect(order1.changeQuantity(-2)).toThrowError();
  });
});
