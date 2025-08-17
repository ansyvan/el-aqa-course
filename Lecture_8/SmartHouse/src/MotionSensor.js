import { SmartDevice } from './SmartDevice.js'

export class MotionSensor extends SmartDevice {
  constructor () {
    super()
    this.isOn = true
    this._motionDetected = false
  }

  detectMotion (isSomeoneAround) {
    if (isSomeoneAround) {
      console.log('Motion Sensor: Movement detected.')
      this._motionDetected = true
    } else {
      console.log('Motion Sensor: No movement detected.')
      this._motionDetected = false
    }
  }
}
