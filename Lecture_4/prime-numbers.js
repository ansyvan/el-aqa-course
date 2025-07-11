// Write the code which outputs prime numbers in the interval from 2 to n

function isPrime (n) {
  for (let i = 2; i <= n; i++) {
    let isPrime = true

    for (let divisor = 2; divisor < i; divisor++) {
      if (i % divisor === 0) {
        isPrime = false
        break
      }
    }

    if (isPrime) {
      console.log(i)
    }
  }
}

isPrime(20)
