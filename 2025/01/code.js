const { getLines } = require('../../utils/helpers')

const parseLine = (line) => {
  const [, dir, n] = line.match(/(L|R)(\d+)/)
  const amount = +n

  return { dir, amount }
}

module.exports.answer2 = (input) => {
  let num = 50
  let count = 0

  const lines = getLines(input)
  for (const line of lines) {
    const { dir, amount } = parseLine(line)

    if (dir === 'R') {
      num += amount
    } else {
      num -= amount
    }

    while (num < 0 || num > 99) {
      if (num > 99) {
        num = num - 100
        count++
      }
      if (num < 0) {
        num = num + 100
        count++
      }
    }
  }
  return count
}

module.exports.answer1 = (input) => {
  let num = 50
  let count = 0

  const lines = getLines(input)
  for (const line of lines) {
    const { dir, amount } = parseLine(line)

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
        num = num + 100
      }
    }

    if (num === 0) count++
  }
  return count
}
