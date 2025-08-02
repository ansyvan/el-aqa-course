function makeStringUpperCase (string) {
  return string.toUpperCase()
}

function splitStringByEqualSign (string) {
  return string.split('=')
}

function printResult (array) {
  console.log(array)
}

function transformStringToArray (string) {
  const upper = makeStringUpperCase(string)
  const array = splitStringByEqualSign(upper)
  printResult(array)
}

const str = 's=t=r=i=n=g'

transformStringToArray(str)
