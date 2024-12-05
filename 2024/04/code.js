const { getLines, getCharacters } = require('../../utils/helpers')

let LETTERS

module.exports.answer2 = (input) => {
  LETTERS = ['M', 'A', 'S']
  const matrix = getLines(input).map((l) => getCharacters(l))

  let total = 0
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i]
    for (let j = 0; j < line.length; j++) {
      if (checkUpLeft(matrix, j, i)) {
        if (checkUpRight(matrix, j - 2, i) || checkDownLeft(matrix, j, i - 2)) {
          total++
        }
      }
      if (checkDownRight(matrix, j, i)) {
        if (checkUpRight(matrix, j, i + 2) || checkDownLeft(matrix, j + 2, i)) {
          total++
        }
      }
    }
  }

  return total
}

const checkUp = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (y < 0) return false
  if (matrix[y][x] !== letter) return false

  return checkUp(matrix, x, y - 1, toCheck)
}

const checkDown = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (y === matrix.length) return false
  if (matrix[y][x] !== letter) return false

  return checkDown(matrix, x, y + 1, toCheck)
}

const checkLeft = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x < 0) return false
  if (matrix[y][x] !== letter) return false

  return checkLeft(matrix, x - 1, y, toCheck)
}

const checkRight = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x === matrix[0].length) return false
  if (matrix[y][x] !== letter) return false

  return checkRight(matrix, x + 1, y, toCheck)
}

const checkUpLeft = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x < 0 || y < 0) return false
  if (matrix[y][x] !== letter) return false

  return checkUpLeft(matrix, x - 1, y - 1, toCheck)
}

const checkDownLeft = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x < 0 || y === matrix.length) return false
  if (matrix[y][x] !== letter) return false

  return checkDownLeft(matrix, x - 1, y + 1, toCheck)
}

const checkUpRight = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x === matrix.length || y < 0) return false
  if (matrix[y][x] !== letter) return false

  return checkUpRight(matrix, x + 1, y - 1, toCheck)
}

const checkDownRight = (matrix, x, y, toCheck = [...LETTERS]) => {
  const letter = toCheck.shift()

  // Base cases
  if (!letter) return true
  if (x === matrix.length || y === matrix.length) return false
  if (matrix[y][x] !== letter) return false

  return checkDownRight(matrix, x + 1, y + 1, toCheck)
}

module.exports.answer1 = (input) => {
  LETTERS = ['X', 'M', 'A', 'S']

  const matrix = getLines(input).map((l) => getCharacters(l))

  let total = 0
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i]
    for (let j = 0; j < line.length; j++) {
      total += [
        checkUp(matrix, j, i),
        checkDown(matrix, j, i),
        checkLeft(matrix, j, i),
        checkRight(matrix, j, i),
        checkUpLeft(matrix, j, i),
        checkDownLeft(matrix, j, i),
        checkUpRight(matrix, j, i),
        checkDownRight(matrix, j, i),
      ].filter((x) => x).length
    }
  }

  return total
}
