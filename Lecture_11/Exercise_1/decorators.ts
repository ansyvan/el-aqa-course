/* eslint-disable @typescript-eslint/no-explicit-any */
export function Taxable (taxAmount: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalGetter = descriptor.get

    if (!originalGetter) {
      throw new Error('@Taxable can only be used on a getter.')
    }

    descriptor.get = function () {
      const originalPrice = originalGetter.apply(this)
      const priceAfterTax = originalPrice * (1 + taxAmount)
      const priceAfterTaxRounded = Math.round(priceAfterTax * 100) / 100
      return priceAfterTaxRounded
    }
  }
}
