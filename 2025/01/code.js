const { getLines } = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  let num = 50
  let count = 0

  const lines = getLines(input)
  for (const line of lines) {
    const [, dir, n] = line.match(/(L|R)(\d+)/)
    const amount = +n

    if (dir === 'R') {
      num += amount
    } else {
      num -= amount
    }

    while (num < 0 || num > 99) {
      if (num > 99) {
        num = num - 100
      }
      if (num < 0) {
        num = 100 - Math.abs(num)
      }
    }

    if (num === 0) count++
  }
  return count
}
