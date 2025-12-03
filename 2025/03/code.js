const { getLines } = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  const lines = getLines(input)

  let sum = 0
  for (const line of lines) {
    const nums = line.split('').map((c) => +c)

    let leftmostIndex = 0
    let numStr = ''
    for (let i = 11; i >= 0; i--) {
      const partialList = nums.slice(leftmostIndex, nums.length - i)
      const digit = Math.max(...partialList)
      leftmostIndex = partialList.indexOf(digit) + leftmostIndex + 1
      numStr += digit
    }
    sum += +numStr
  }

  return sum
}

module.exports.answer1 = (input) => {
  const lines = getLines(input)

  let sum = 0
  for (const line of lines) {
    const nums = line.split('').map((c) => +c)
    const firstDigit = Math.max(...nums.slice(0, -1))
    const firstIndex = nums.indexOf(firstDigit)
    const secondDigit = Math.max(...nums.slice(firstIndex + 1))

    const newNum = firstDigit * 10 + secondDigit
    sum += newNum
  }

  return sum
}
