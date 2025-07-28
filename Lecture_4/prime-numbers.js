function checkIfNumberIsValid (n) {
  if (typeof n !== 'number') {
    return 'It\'s not a number!'
  }
  if (!Number.isInteger(n)) {
    return 'Your number must be an integer!'
  }
  if (n < 2) {
    return 'Your number is less than 2!'
  }
  return true
}

function checkIfNumberIsPrime (n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function printNumber (n) {
  console.log(n)
}

function main (n) {
  const isValidInput = checkIfNumberIsValid(n)

  if (isValidInput !== true) {
    console.log(isValidInput)
  } else {
    console.log(`Prime numbers up to ${n}:`)
    for (let i = 2; i <= n; i++) {
      if (checkIfNumberIsPrime(i)) {
        printNumber(i)
      }
    }
  }
}

main(55)
