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

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
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
