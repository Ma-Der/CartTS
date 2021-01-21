interface discounts {
  [bestClient: string]: number;
  midBestClient: number;
  midClient: number;
  newClient: number;
  noDiscount: number;
}

export const discountCodes: discounts = {
    bestClient: 30,
    midBestClient: 25,
    midClient: 20,
    newClient: 5,
    noDiscount: 0
  }