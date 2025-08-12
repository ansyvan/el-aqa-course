function sum (n) {
  return function (m) {
    return n + m
  }
}

console.log(sum(2)(3))
