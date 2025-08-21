import { SmartDevice } from './SmartDevice.js'

export class MotionSensor extends SmartDevice {
  constructor () {
    super()
    this.isOn = true
    this._motionDetected = false
  }

detectMotion(isSomeoneAround) {
  this._motionDetected = isSomeoneAround;
  console.log(`Motion Sensor: ${isSomeoneAround ? 'Movement detected.' : 'No movement detected.'}`);
}
}
