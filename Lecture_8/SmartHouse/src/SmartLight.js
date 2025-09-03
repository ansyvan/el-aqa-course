import { SmartDevice } from './SmartDevice.js'

export class SmartLight extends SmartDevice {
  constructor (location) {
    super()
    this.brigtness = 50
    this.location = location
  }

  turnOn () {
    super.turnOn()
    console.log('Light: Turned on.')
  }

  turnOff () {
    super.turnOff()
    console.log('Light: Turned off.')
  }

  increaseBrightness () {
    if (this.brigtness < 10) {
      this.brigtness++
      console.log(`Light: Luminosity level increased to: ${this.brigtness}`)
    } else {
      console.log('Light: Luminosity is at maximum.')
    }
  }

  decreaseBrightness () {
    if (this.brigtness > 0) {
      this.brigtness--
      console.log(`Light: Decreasing luminosity. New level: ${this.brigtness}%`)
    } else {
      console.log('Light: Light output is at minimum.')
    }
  }

  setBrightness (level) {
    this.brigtness = level
    console.log(`Light: Set brightness to ${level}%.`)
  }

  setDefaultBrightness (level) {
    this.brigtness = level
    console.log(`Light: Default brightness is ${level}%.`)
  }
}
