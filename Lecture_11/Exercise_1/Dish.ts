/* eslint-disable no-useless-constructor */
import { IDish } from './types.js'
import { Taxable } from './decorators.js'

export class Dish implements IDish {
  constructor (
    private _price: number,
    private _name: string,
    private _weight: number,
    private _availability: boolean
  ) {}

  @Taxable(0.07)
  get price () {
    return this._price
  }

  get name () {
    return this._name
  }

  get weight () {
    return this._weight
  }

  get availability () {
    return this._availability
  }

  set price (price) {
    this._price = price
  }

  set name (name) {
    this._name = name
  }

  set weight (weight) {
    this._weight = weight
  }

  set availability (availability) {
    this._availability = availability
  }
}
