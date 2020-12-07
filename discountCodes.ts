interface discounts {
  [bestReader: string]: number;
  midBestReader: number;
  midReader: number;
  newReader: number;
  noDiscount: number;
}

export const discountCodes: discounts = {
    bestReader: 30,
    midBestReader: 25,
    midReader: 20,
    newReader: 5,
    noDiscount: 0
  }