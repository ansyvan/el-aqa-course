const user = {}

user.name = 'John'

user.introduce = function (surname) {
  console.log(`Hello, my name is ${this.name} ${surname}`)
}

user.introduce('Doe')
