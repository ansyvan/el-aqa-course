export class Person {
  constructor (firstName = 'Jon', lastName = 'Snow') {
    this.firstName = firstName
    this.lastName = lastName
  }

  greeting () {
    return `Hi, my name is ${this.firstName} ${this.lastName}.`
  }

  myExperience (...skills) {
    return `I have experience in: ${skills.join(', ')}.`
  }
}
