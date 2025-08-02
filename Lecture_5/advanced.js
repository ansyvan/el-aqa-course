function over4Characters (value) {
  return value.length > 4
}

function filterUniqueValues (array) {
  return [...new Set(array)]
}

function splitCharactersArray (array) {
  const joinedValues = array.join('')
  const splitValues = joinedValues.split('')
  return splitValues
}

function countCharacter (array, character) {
  const count = array.reduce((acc, curr) => {
    if (curr.toLowerCase() === character.toLowerCase()) {
      return acc + 1
    }
    return acc
  }, 0)

  return count
}

function printResult (result) {
  console.log('Names longer than 4 characters:', result.over4)
  console.log('Unique names with more than 4 characters:', result.uniqueOver4)
  console.log('The amount of "o" in the Unique Names list:', result.sumO)
}

function main (array) {
  const over4 = array.filter(over4Characters)
  const uniqueOver4 = filterUniqueValues(over4)
  const splitArray = splitCharactersArray(uniqueOver4)
  const sumO = countCharacter(splitArray, 'o')
  const result = { over4, uniqueOver4, sumO }
  printResult(result)
}

const arr = [
  'Adam', 'Alex', 'Monte', 'Aaron', 'Ben',
  'Carl', 'Dan', 'Tim', 'David', 'Edward',
  'Fred', 'Frank', 'George', 'Hal', 'Ike',
  'John', 'Alex', 'Jack', 'Joe', 'Larry',
  'Monte', 'Matthew', 'Mark', 'Nathan', 'Otto',
  'Peter', 'Roger', 'Steve', 'Ben', 'Thomas',
  'Tim', 'Ty', 'Victor', 'Walter'
]

main(arr)
