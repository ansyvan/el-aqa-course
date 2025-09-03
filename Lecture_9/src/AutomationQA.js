import { Person } from './Person.js'

export class AutomationQA extends Person {
  mySkills ({ language = 'TypeScript', framework = 'Playwright', tool = 'VS Code' }) {
    return `My skills are: ${language} with ${framework} framework, and using ${tool} editor.`
  }
}
