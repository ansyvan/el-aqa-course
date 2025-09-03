export class SmartDevice {
  static mode = 'Away'
  static deviceCount = 0

  constructor () {
    this.isOn = false
    SmartDevice.deviceCount++
  }

  turnOn () {
    if (!this.isOn) {
      this.isOn = true
    }
    return this.isOn
  }

  turnOff () {
    if (this.isOn) {
      this.isOn = false
    }
    return this.isOn
  }
}
