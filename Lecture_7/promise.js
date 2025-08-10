function logIn500Millis () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log(1)
      resolve('1')
    }, 500)
  })
}

function logIn100Millis () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2)
      resolve('2')
    }, 100)
  })
}

function logIn300Millis () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3)
      resolve('2')
    }, 300)
  })
}

function homeWork () {
  return logIn500Millis()
    .then(() => logIn100Millis())
    .then(() => logIn300Millis())
}

homeWork()
