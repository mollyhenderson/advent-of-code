const { int, SafeMatrix } = require('../../utils/helpers')

const isASymbol = (c) => !c.match(/[.0-9]/)

const indexOfAfter = (str, substr, i) => {
  if (i === 0) return str.indexOf(substr)
  const newStr = str.substr(i + 1)
  const index = newStr.indexOf(substr)
  return index < 0 ? -1 : index + i + 1
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const matrix = new SafeMatrix(input, '.')

  let sum = 0
  for (let i = 0; i < matrix.height(); i++) {
    const line = matrix.lineAt(i).join('')
    const numbers = line.match(/(\d+)/g) ?? []

    let latestIndex = 0
    numbers.forEach((number) => {
      const j = indexOfAfter(line, number, latestIndex)
      let isPartNumber = false
      for (let newJ = 0; newJ < number.length; newJ++) {
        // check the box around each digit
        isPartNumber ||= matrix.checkAround(j + newJ, i, isASymbol)
      }

      if (isPartNumber) sum += int(number)
      latestIndex = j + number.length
    })
  }
  return sum
}
