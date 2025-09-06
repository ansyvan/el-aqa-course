function Taxable(taxAmount: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalGetter = descriptor.get

    if (!originalGetter) {
        throw new Error('`@Taxable can only be used on a getter.`')
        
    }
    descriptor.get = function () {
      const originalPrice = originalGetter.apply(this)
      const priceAfterTax = originalPrice * (1 + taxAmount)
      const priceAfterTaxRounded = Math.round(priceAfterTax * 100) / 100
      return priceAfterTaxRounded
    };
  };
}

export class Dish {
  constructor(
    private _price: number,
    private _name: string,
    private _weight: number,
    private _availability: boolean
  ) {}

  @Taxable(0.07)
  get price() {
    return this._price;
  }

  get name() {
    return this._name;
  }

  get weight() {
    return this._weight;
  }

  get availability() {
    return this._availability;
  }

  set price(price) {
    this._price = price;
  }

  set name(name) {
    this._name = name;
  }

  set weight(weight) {
    this._weight = weight;
  }

  set availability(availability) {
    this._availability = availability;
  }
}
