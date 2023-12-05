const { getLines, getCharacters, int } = require('../../utils/helpers')

const isInt = (c) => c == int(c)
const reverseString = (s) => s.split('').reverse().join('')

module.exports.answer2 = (input) => {
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }
  const regexString = Object.keys(numbers).join('|')
  const regex = RegExp(regexString, 'g')
  const backwardsRegex = RegExp(reverseString(regexString), 'g')

  let out = 0
  getLines(input).forEach((line) => {
    const firstLine = line.replaceAll(regex, (match) => numbers[match])
    const first = firstLine.split('').find(isInt)

    const lastLine = reverseString(line).replaceAll(
      backwardsRegex,
      (match) => numbers[reverseString(match)]
    )
    const last = lastLine.split('').find(isInt)

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
