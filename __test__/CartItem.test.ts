import { CartItem } from "../CartItem";

const wrench = new CartItem("16th", "tool", 2, 5);
const bluePaint = new CartItem("Blueish", "paint", 10);
const hammer = new CartItem("hammer", "tool", 2);

describe("CartItems tests method behavior", () => {
  it("modifying price", () => {
    wrench.modifyPrice(20);
    expect(wrench.price).toBe(20);
  });

  it("modifying name", () => {
    bluePaint.modifyName("Blue-ish");
    expect(bluePaint.name).toEqual("Blue-ish");
  });

  it("modifying discount", () => {
    hammer.modifyDiscount(50);
    expect(hammer.discount).toBe(50);
  });

  it("modifying category", () => {
    hammer.addCategory("bicycle");
    expect(hammer.category).toBe("bicycle");
  });
});

describe("CartItems tests for errors", () => {
  it("modifying price with bad argument should throw error", () => {
    () => expect(wrench.modifyPrice("koniec")).toThrowError();
    () => expect(wrench.modifyPrice(-23)).toThrowError();
  });

  it("modifying name with bad argument should throw error", () => {
    () => expect(bluePaint.modifyName(78443)).toThrowError();
    () => expect(bluePaint.modifyName()).toThrowError();
  });

  it("modifying discount with bad argument should throw error", () => {
    () => expect(hammer.modifyDiscount([123])).toThrowError();
  });

  it("modifying discount with number out of range (0 - 100) should throw error", () => {
    () => expect(hammer.modifyDiscount(105)).toThrowError();
  });

  it("modifying category with bad argument should throw error", () => {
    () => expect(hammer.addCatgeory(432)).toThrowError();
    () => expect(bluePaint.addCategory()).toThrowError();
  });
});
