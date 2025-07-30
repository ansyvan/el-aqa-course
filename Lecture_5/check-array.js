function checkArray (array, item) {
  return array.includes(item)
}

function printIfNameFound (array, item) {
  if (checkArray(array, item)) {
    console.log(`${item} is in the list`)
  } else {
    console.log(`${item} is not invited!`)
  }
}

const characters = [
  'Harry',
  'Hermione',
  'Ron',
  'Draco',
  'Luna',
  'Neville',
  'Severus',
  'Albus'
]

const inputName = 'Tom'

printIfNameFound(characters, inputName)
