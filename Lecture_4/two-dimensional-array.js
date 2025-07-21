function selectMainDiagonal (items) {
  const length = items.length
  const result = []
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (i === j) {
        result.push(items[i][j])
      }
    }
  }
  return result
}

function countMax (array) {
  return Math.max(...array)
}

function countMin (array) {
  return Math.min(...array)
}

function sortDescending (array) {
  return [...array].reverse()
}

const twoDimensionalArr = [
  [3, -7, 12, 13, 0, 17, 21],
  [-7, -1, 5, -2, 9, 11, 2],
  [12, 5, -3, 12, 22, 15, 30],
  [6, -2, 12, 15, 13, 4, 4],
  [0, 9, 22, 13, 35, 1, 24],
  [17, 11, 15, 4, 1, 8, -5],
  [21, 2, 30, -4, 24, -5, 16]
]
const mainDiagonalArr = selectMainDiagonal(twoDimensionalArr)
const maxNumberOnDiagonal = countMax(mainDiagonalArr)
const minNumberOnDiagonal = countMin(mainDiagonalArr)
const mainDiagonalSortedDesc = sortDescending(mainDiagonalArr)

console.log(`Main diagonal: ${mainDiagonalArr}`)
console.log(`Max number on main diagonal: ${maxNumberOnDiagonal}`)
console.log(`Min number on main diagonal: ${minNumberOnDiagonal}`)
console.log(`Descending order of main diagonal: ${mainDiagonalSortedDesc}`)
