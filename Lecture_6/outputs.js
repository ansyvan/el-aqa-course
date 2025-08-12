// What is the value of the keyword this in the following example:

const data = this
console.log(data) // {}
// Browser: Window {window: Window, self: Window, document: document, name: '', location: Location,…}
// Node.js: {}
// Explanation:
// this refers to the Object depending of the context. In this case the code is in global scope,
// so this points to the global object Window with lots of data.
// In Node.js the output would be just {} as it points to module.exports, which starts as an empty object.

// What does this function output? Why?

function logThis () {
  return this
}

logThis() // nothing
// Explanation: the function logThis() displays nothing.
// We need console.log(logThis()) for visible output.

const instructor = {
  firstName: 'Tim',
  sayHi: function () {
    console.log('Hello! ' + this.firstName)
  }
}

instructor.sayHi() // Hello! Tim
// Explanation: instructor is an Object, sayHi is the Object's method, which displays the message.
// In the message this is refering to the Object itself and its property firstName.
// The function is called as a method of an object: object.method()

const instructor2 = {
  firstName: 'Tim',
  info: {
    catOwner: true,
    boatOwner: true
  },
  displayInfo: function () {
    console.log('Cat owner? ' + this.catOwner)
  }
}

instructor2.displayInfo() // Cat owner? undefined
// Explanation:
// catOwner is in nested object so we can't call it like object.catOwner.
// We need object.info.catOwner to see Cat owner? true.

const instructor3 = {
  firstName: 'Tim',
  info: {
    catOwner: true,
    boatOwner: true,
    displayLocation: function () {
      return this.data.location
    },
    data: {
      location: 'Oakland'
    }
  }
}

instructor3.info.displayLocation() // nothing
console.log(instructor3.info.displayLocation()) // Oakland
// Explanation:
// There is nothing in the output unless we print the result.

const instructor4 = {
  firstName: 'Tim',
  info: {
    catOwner: true,
    boatOwner: true,
    displayLocation: function () {
      return this.location
    },
    data: {
      location: 'Oakland',
      logLocation: this.displayLocation
    }
  }
}

instructor4.info.data.logLocation() // Why might we be getting an error here?
// this.location refers to info.location but location is under data object.
// There is no displayLocation property in data object (this),
// so the object is not properly created.
