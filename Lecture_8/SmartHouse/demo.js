import { SmartHomeController } from './src/SmartHomeController.js'
import { SmartDevice } from './src/SmartDevice.js'

function printSectionHeader (title) {
  console.log('\n' + '='.repeat(50))
  console.log(`=== ${title.toUpperCase()} ===`)
  console.log('='.repeat(50))
}

function printScenarioDetails (scenarioDetails) {
  console.log('--- Scenario details ---')
  console.log(`${scenarioDetails}`)
}

function printLogsTitle () {
  console.log('-'.repeat(50))
  console.log('--- Logs ---')
}

function printDeviceStatus (controller) {
  console.log('-'.repeat(50))
  console.log('--- Current Device Status ---')
  console.log(`Smart Home mode: "${SmartDevice.mode}"`)

  for (const deviceName in controller.devices) {
    const device = controller.devices[deviceName]
    console.log(`${deviceName}: ${device.isOn ? 'On' : 'Off'}`)
  }
}

function runSmartHomeDemo () {
  const controller = new SmartHomeController()

  printSectionHeader('Initializing Smart Home System')
  console.log(`Initialization complete. Total devices created: ${SmartDevice.deviceCount}`)

  printDeviceStatus(controller)

  printSectionHeader('Scenario 1: Motion Detected Outside')
  printScenarioDetails(
    `When the motion sensor is detecting movements outside
the outside lights are turning on and the brighness
is increased to 100% to illuminate the intruder.
The camera starts the recording.`)
  printLogsTitle()

  controller.devices.motionSensor.detectMotion(true)
  controller.checkMotionOutside()

  printDeviceStatus(controller)

  printSectionHeader('Scenario 2: All Clear Outside')
  printScenarioDetails(
    `The motion sensor is no longer detecting the movement.
The lights and camera are turned off.`)
  printLogsTitle()

  controller.devices.motionSensor.detectMotion(false)
  controller.checkMotionOutside()

  printDeviceStatus(controller)

  printSectionHeader('Scenario 3: Arriving Home (Home Mode)')
  printScenarioDetails(
    `User arrives home and turning on the "Home" mode.
The indoor light turned on and the thermostat
switched automatically to the climate control mode.`)
  printLogsTitle()

  SmartDevice.mode = 'Home'
  controller.checkSmartDeviceMode()

  printDeviceStatus(controller)

  printSectionHeader('Scenario 4: Thermostat Manual Control')
  printScenarioDetails(
    `User feels cold and manually sets the temperature
to 24°C. After that turns the thermostat off.
After few hours the room temperature is decreasing.
A sensor detects change, but it's ignored because 
the thermostat is in manual mode.`)
  printLogsTitle()

  controller.devices.thermostat.setTemperatureManually(24)
  console.log(`Thermostat mode: ${controller.devices.thermostat.mode}`)
  console.log(`The current room temperature is: ${controller.devices.thermostat.currentTemperature}°C.`)
  controller.devices.thermostat.turnOff()
  console.log('\nThe temperature in the room decreased to 15°C.')
  printLogsTitle()

  controller.devices.thermostat.updateTemperature(15)

  printDeviceStatus(controller)

  printSectionHeader('Scenario 5: Thermostat Automatic Control')
  printScenarioDetails(
    `The user decides to switch back to automatic
climate control. The detected low temperature (15°C)
causes the heating to turn on.`)
  printLogsTitle()
  console.log(`The current room temperature is: ${controller.devices.thermostat.currentTemperature}°C.`)

  controller.devices.thermostat.enableAutoMode()

  console.log(`Thermostat mode: ${controller.devices.thermostat.mode}`)
  printDeviceStatus(controller)

  printSectionHeader('Scenario 6: Leaving the House (Away Mode)')
  printScenarioDetails(
    `After user sets the "Away" mode the all lights and
the thermostat turned off.`)
  printLogsTitle()

  SmartDevice.mode = 'Away'
  controller.checkSmartDeviceMode()

  printDeviceStatus(controller)
}

runSmartHomeDemo()
