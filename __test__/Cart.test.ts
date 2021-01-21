import { CartItem } from "../CartItem";
import { Cart } from "../Cart";

/*

W produktach sklep zauważył, że pomylił się w nazwach produktów i chce je poprawić: 
- w jednym nazwa, na początku pomylił się i pozostawił pustą nazwę co spowodowało błąd
- w jednym zmienić kategorie
- w jednym zmienić cenę, przez pomyłkę wcisnął znak minus i dodał ujemną liczbę co spowodowało błąd
- w jednym dodać zniżkę (promocje), za pierwszym razem przytrzymał za długo jedno zero i dodał liczbę 1000, co spowodowało błąd

Do koszyka dodano 10 produktów:
- bluePaint w ilości 2
- yellowPaint w ilości 4, przez przypadek klient wcisnął znak (-) przy ilości co spowodowało błąd
- redPaint w ilości 5
- blackPaint w ilości 6
- whitePaint w ilości 7
- bucket20L w ilości 2
- bucket10L w ilości 3
- brushMD w ilości 5
- brushXL w ilości 10
- brushSM w ilości 10

po jakimś czasie w koszyku zmieniono ilości:
- bluePaint na 5
- blackPaint na 10
- brushMD na 10

Z koszyka usunięto niepotrzebne wiadra - bucket20L, przez przypadek wpisano produkt nie istniejący w koszyku co spowodowało błąd

Przy następnym zakupie dodano do koszyka kod zniżkowy (BestClient), przez co podsumowanie koszyka jest niższe o 30%. Do koszyka: 
- nic nie dodano i kliknięto podsumowanie
- dodano bucket20L w ilości 10 i podsumowano zakup

takiego samego zakupu dokonano w trzecim koszyku, z tym, że bez zniżki.
*/

const wrench = new CartItem("16th", "tool", 2, 5);
const bluePaint = new CartItem("Blueish", "paint", 10);
const hammer = new CartItem("hammer", "tool", 2);
const nails = new CartItem("nails", "metal", 0.5);
const yellowPaint = new CartItem("Yellow", "paint", 15);
const redPaint = new CartItem("Red", "paint", 12);
const blackPaint = new CartItem("Black", "paint", 10);
const whitePaint = new CartItem("White", "paint", 10);
const brushXL = new CartItem("BrushXL", "brushes", 3);
const brushL = new CartItem("BrushL", "brushes", 2);
const brushMD = new CartItem("BrushMD", "brushes", 1);
const brushSM = new CartItem("BrushSM", "brushes", 0.5);
const bucket20L = new CartItem("Bucket20L", "dish", 15);
const bucket15L = new CartItem("Bucket15L", "dish", 12);
const bucket10L = new CartItem("Bucket10L", "dish", 10);

const cart1 = new Cart();

describe("In products, shop detected some mistakes, which wanted correct", () => {
  test("wrong name with empty string which caused error", () => {
    expect(() => bluePaint.modifyName("")).toThrowError("Empty string.");
  });

  test("wrong name", () => {
    const properResult = "Blue";
    
    bluePaint.modifyName("Blue");
    expect(bluePaint.name).toEqual(properResult);
  });

  test("wrong category", () => {
    const properResult = "tool";

    nails.addCategory("tool");
    expect(nails.category).toEqual(properResult);
  });

  test("price with negative number caused error", () => {
    expect(() => wrench.modifyPrice(-5)).toThrowError("Argument should be more or equal to zero.");
  });

  test("price", () => {
    const properResult = 5;

    wrench.modifyPrice(5);
    expect(wrench.price).toBe(properResult);
  });

  test("discount with number 1000 caused error", () => {
    expect(() => yellowPaint.modifyDiscount(1000)).toThrowError("Discount is a percentage number. Its value needs to be beetween 0 and a 100.");
  });

  test("discount", () => {
    const properResult = 20;

    yellowPaint.modifyDiscount(20);
    expect(yellowPaint.discount).toBe(properResult);
  });
});

describe("To cart added", () => {
  cart1.addItem(bluePaint, 2);
  cart1.addItem(yellowPaint, 4);
  cart1.addItem(redPaint, 5);
  cart1.addItem(blackPaint, 6);
  cart1.addItem(whitePaint, 7);
  cart1.addItem(bucket20L, 2);
  cart1.addItem(bucket10L, 3);
  cart1.addItem(brushMD, 5);
  cart1.addItem(brushXL, 10);
  cart1.addItem(brushSM, 10);

  test("one product with negative amount number caused error", () => { 
    expect(() => cart1.addItem(yellowPaint, -4)).toThrowError("Argument should be more or equal to zero.");
  });

  test("10 products inside", () => {
    const properResult = 10;

    expect(cart1.cartList.length).toBe(properResult);
  });
});

describe("At some point amount of couple products where changed", () => {
  test("blue Paint to 5", () => {
    const properResult = 5;
    cart1.changeAmount(bluePaint, properResult);
    const bluePaintItem = cart1.cartList[0];

    expect(bluePaintItem.amount).toBe(properResult);
  });

  test("black Paint to 10", () => {
    const properResult = 10;
    cart1.changeAmount(blackPaint, properResult);
    const blackPaintItem = cart1.cartList[3];

    expect(blackPaintItem.amount).toBe(properResult);
   });

  test("brushMD to 10", () => {
    const properResult = 10;
    cart1.changeAmount(brushMD, properResult);
    const brushMDItem = cart1.cartList[7];

    expect(brushMDItem.amount).toBe(properResult);
  });
});

describe("From cart deleted", () => {
  test("bucket20L", () => {
    const properCartLength = 9;

    cart1.deleteItem(bucket20L);
    expect(cart1.cartList.length).toBe(properCartLength);
  });

  test("product that wasn't in cart which caused error", () => {
    expect(() => cart1.deleteItem(hammer)).toThrowError("No such item in cart.");
  });
});

describe("After clicking buy button", () => {
  test("cart sums it up", () => {
    const properResult = 415;

    expect(cart1.cartSummary()).toBe(properResult);
  });
});

describe("On next carts", () => {
  const cart2 = new Cart("bestClient");
  const cart3 = new Cart();
  
  test("nothing was added and went to cart summary", () => {
    const properResult = "Cart empty.";

    expect(cart2.cartSummary()).toEqual(properResult);
    expect(cart3.cartSummary()).toEqual(properResult);
  });

  test("added one product", () => {
    const properLength = 1;
    cart2.addItem(bucket20L, 10);
    cart3.addItem(bucket20L, 10);
    expect(cart2.cartList.length).toBe(properLength);
    expect(cart3.cartList.length).toBe(properLength);
  });

  test("after adding product went to summary", () => {
    const properCart2Summary = 105;
    const properCart3Summary = 150;

    expect(cart2.cartSummary()).toBe(properCart2Summary);
    expect(cart3.cartSummary()).toBe(properCart3Summary);
  });
});
