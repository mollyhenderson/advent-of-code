const { getLines, sum } = require('../../utils/helpers')

class Equation {
  constructor(line) {
    const [testNum, numString] = line.split(': ')
    const nums = numString.split(' ')

    this.testNum = parseInt(testNum)
    this.nums = nums.map((n) => parseInt(n))
  }
}

const parseInput = (input) => {
  return getLines(input).map((l) => new Equation(l))
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const equations = parseInput(input)

  const valids = equations.filter((equation) => {
    const { testNum, nums } = equation

    const possibilities = [nums.shift()]
    for (const num of nums) {
      const len = possibilities.length
      for (let j = 0; j < len; j++) {
        possibilities.push(possibilities[j] * num)
        possibilities[j] += num
      }
    }

    if (possibilities.includes(testNum)) return true
  })

  return valids.reduce((sum, e) => (sum += e.testNum), 0)
}
