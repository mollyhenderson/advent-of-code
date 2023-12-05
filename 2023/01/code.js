const { getLines, getCharacters, int } = require("../../utils/helpers")

const isInt = (c) => c == int(c)

const firstNumber = (line) => {
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ]
  const firsts = numbers.map((n) => line.indexOf(n))

  let min = Infinity
  let minIndex = Infinity
  for (let i = 0; i < firsts.length; i++) {
    const num = firsts[i]
    if (num === -1) continue

    if (num < min) {
      min = num
      minIndex = i
    }
  }

  if (minIndex < 9) return minIndex + 1
  return minIndex - 8
}

module.exports.answer2 = (input) => {
  let out = 0
  getLines(input).forEach((line) => {
    const first = firstNumber(line)
    // TODO: this doesn't work because now the words are backwards! silly me
    const last = firstNumber(line.split('').reverse().join(''))

    const num = int(`${first}${last}`)
    out += num
  })

  return out
}

module.exports.answer1 = (input) => {
  let out = 0
  getLines(input).forEach((line) => {
    const chars = getCharacters(line)
    const first = chars.find(isInt)
    const last = chars.findLast(isInt)
    const num = int(`${first}${last}`)
    out += num
  })

  return out
}
