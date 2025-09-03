import { AutomationQA } from './src/AutomationQA.js'
import { getUserInfo } from './src/utils.js'

getUserInfo(2)
  .then(userData => {
    const fullName = userData.name.split(' ')
    const firstName = fullName[0]
    const lastName = fullName[1]

    const automationQA = new AutomationQA(firstName, lastName)

    console.log(automationQA.greeting())
    console.log(automationQA.myExperience('Git', 'CI/CD'))
    console.log(automationQA.mySkills({ tool: 'Notepad' }))
  })
  .catch(error => {
    console.error('Failed to fetch user data:', error)
  })
