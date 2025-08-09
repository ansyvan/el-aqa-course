// What will be outputed ?
'use strict'
function f () {
  console.log(this)
}
const user = {
  g: f.bind(null),
  arrowFunc: () => console.log(this)
}
user.g() // null or global object in non-strict mode
user.arrowFunc() // {} in Node.js or Window in browser
// Explanation:
// this inside the f function is locked to null.
// When user.g() is called the console.log(this) inside the original f function runs.
// Arrow function referes to the scope where it is defined - global.
