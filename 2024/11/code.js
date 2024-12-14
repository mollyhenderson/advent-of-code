const { int, parseNumbers } = require('../../utils/helpers')

const blink = (nums) => {
  const res = []
  for (const num of nums) {
    const str = num.toString()
    if (num === 0) {
      res.push(1)
    } else if (str.length % 2 === 0) {
      res.push(int(str.slice(0, str.length / 2)))
      res.push(int(str.slice(str.length / 2)))
    } else {
      res.push(num * 2024)
    }
  }
  return res
}

const memo = {}
const blinkTimes = (num, count) => {
  const key = `${num}/${count}`
  if (memo[key]) return memo[key]
  if (count === 0) return 1

  const str = num.toString()
  if (num === 0) {
    res = blinkTimes(1, count - 1)
  } else if (str.length % 2 === 0) {
    const left = str.slice(0, str.length / 2)
    const right = str.slice(str.length / 2)
    res = blinkTimes(int(left), count - 1) + blinkTimes(int(right), count - 1)
  } else {
    res = blinkTimes(num * 2024, count - 1)
  }
  memo[key] = res
  return res
}

module.exports.answer2 = (input) => {
  const BLINKS = 75
  let nums = parseNumbers(input)
  let sum = 0
  for (const num of nums) {
    sum += blinkTimes(num, BLINKS)
  }
  return sum
}

module.exports.answer1 = (input) => {
  let nums = parseNumbers(input)
  const BLINKS = 25

  for (let i = 0; i < BLINKS; i++) {
    // console.log(nums.join(' '))
    nums = blink(nums)
  }
  return nums.length
}
