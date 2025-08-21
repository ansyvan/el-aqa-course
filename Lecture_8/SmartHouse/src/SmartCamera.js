import { SmartDevice } from './SmartDevice.js'

export class SmartCamera extends SmartDevice {
  constructor () {
    super()
    this._isRecording = false
  }

  get isRecording () {
    return this._isRecording
  }

  startRecording () {
    if (!this.isOn) {
      console.log('Camera is off, cannot start recording.')
      return
    }

    if (!this._isRecording) {
      this._isRecording = true
      console.log('Camera: Recording started.')
    }
  }

  stopRecording () {
    if (this._isRecording) {
      this._isRecording = false
      console.log('Camera: Recording stopped.')
    }
  }
}
