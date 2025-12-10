const { getLines } = require('../../utils/helpers')

class Problem {
  constructor(op, nums) {
    this.op = op
    this.nums = nums.map((n) => +n)
  }

  solve() {
    return this.nums.reduce((prev, num) => eval(`${prev} ${this.op} ${num}`))
  }
}

const parseInput = (input, clz = Problem) => {
  const lines = getLines(input).map((l) => l.trim().split(/\s+/))
  const ops = lines.pop()

  const problems = []
  for (let i = 0; i < ops.length; i++) {
    const op = ops[i]
    const nums = lines.map((l) => l[i])
    problems.push(new clz(op, nums))
  }

  return problems
}

const parseInput2 = (input, clz = Problem) => {
  const lines = getLines(input)
  const ops = lines.pop().trim().split(/\s+/)

  const numLines = lines.map((l) => l.split(''))

  const problems = []
  let nums = []
  for (let i = 0; i < numLines[0].length; i++) {
    const num = numLines.map((l) => l[i]).join('')
    if (num.trim() == '') {
      problems.push(new Problem(ops.shift(), nums))
      nums = []
    } else {
      nums.push(num)
    }
  }
  problems.push(new Problem(ops.shift(), nums))
  return problems
}

module.exports.answer2 = (input) => {
  const problems = parseInput2(input)
  return problems.reduce((sum, problem) => sum + problem.solve(), 0)
}

module.exports.answer1 = (input) => {
  const problems = parseInput(input)
  return problems.reduce((sum, problem) => sum + problem.solve(), 0)
}
