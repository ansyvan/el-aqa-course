import { SmartDevice } from './SmartDevice.js'

export class SmartThermostat extends SmartDevice {
  constructor () {
    super()
    this.currentTemperature = 20
    this.mode = 'auto'
    this._minComfortTemp = 18
    this._maxComfortTemp = 22
  }

  turnOff () {
    super.turnOff()
    console.log('Thermostat: Turned off.')
  }

  updateTemperature (newTemperature) {
    this.currentTemperature = newTemperature
    console.log(`Sensor update: Room temperature is ${this.currentTemperature}°C.`)

    if (this.mode === 'auto') {
      this._maintainComfortClimate()
    }
  }

  setComfortRange (min, max) {
    this._minComfortTemp = min
    this._maxComfortTemp = max
    console.log(`Thermostat: Comfort range updated to ${min}°C - ${max}°C.`)
  }

  enableAutoMode () {
    this.mode = 'auto'
    console.log('Thermostat: Switched to automatic climate control mode.')
    this._maintainComfortClimate()
  }

  enableManualMode () {
    this.mode = 'manual'
  }

  setTemperatureManually (targetTemperature) {
    this.mode = 'manual'
    this.currentTemperature = targetTemperature
    console.log(`Thermostat: Setting temperature to ${targetTemperature}°C.`)
    this.turnOn()
  }

  turnOnAutoClimateControl (newTemperature) {
    this.mode = 'auto'
    this.currentTemperature = this._checkTemperature(newTemperature)
    this._maintainComfortClimate()
  }

  _maintainComfortClimate () {
    if (this.currentTemperature < this._minComfortTemp) {
      console.log('Thermostat: Thermal deviation detected. Activating heating protocol.')
      this.turnOn()
    } else if (this.currentTemperature > this._maxComfortTemp) {
      console.log('Thermostat: Temperature exceeds optimal range. Activating cooling systems.')
      this.turnOn()
    } else {
      console.log('Thermostat: Optimal climate parameters achieved. Monitoring.')
      this.turnOff()
    }
  }
}
