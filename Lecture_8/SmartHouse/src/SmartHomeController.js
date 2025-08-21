import { SmartDevice } from './SmartDevice.js'
import { SmartLight } from './SmartLight.js'
import { SmartThermostat } from './SmartThermostat.js'
import { SmartCamera } from './SmartCamera.js'
import { MotionSensor } from './MotionSensor.js'

export class SmartHomeController {
  constructor () {
    this.devices = {
      indoorLight: new SmartLight('indoor'),
      outdoorLight: new SmartLight('outdoor'),
      thermostat: new SmartThermostat(),
      camera: new SmartCamera(),
      motionSensor: new MotionSensor()
    }
  }

  checkSmartDeviceMode () {
    if (SmartDevice.mode === 'Away') {
      console.log("Controller: 'Away' mode. Turning off indoor devices.")
      this.devices.thermostat.turnOff()
      this.devices.indoorLight.turnOff()
      return
    }

    if (SmartDevice.mode === 'Home') {
      console.log("Controller: 'Home' mode. Activating indoor devices.")
      this.devices.indoorLight.turnOn()
      this.devices.thermostat.enableAutoMode()
    }
  }

  checkMotionOutside () {
    if (this.devices.motionSensor._motionDetected) {
      console.log('Controller: Someone is around! Activating outdoor security.')
      this.devices.outdoorLight.turnOn()
      this.devices.outdoorLight.setBrightness(100)
      this.devices.camera.turnOn()
      this.devices.camera.startRecording()
    } else {
      console.log('Controller: All quiet! Turning off the outdoor security.')
      if (this.devices.outdoorLight.isOn) {
        this.devices.outdoorLight.turnOff()
      }
      if (this.devices.camera.isRecording) {
        this.devices.camera.stopRecording()
        this.devices.camera.turnOff()
      }
    }
  }

  checkMotionInside () {
    if (this.devices.motionSensor._motionDetected) {
      console.log('Controller: Motion detected! Activating outdoor security.')
      this.devices.indoorLight.turnOn()
    } else {
      if (this.devices.indoorLight.isOn) {
        this.devices.indoorLight.turnOff()
      }
    }
  }
}
