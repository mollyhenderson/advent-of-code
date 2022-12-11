const helpers = require('../../utils/helpers')

class Monkey {
  items = []
  operation
  testDivisor
  ifTrue
  ifFalse
  totalInspections = 0

  constructor(lines) {
    this.items = lines[0].slice(18).split(', ').map(helpers.int)
    const operation = lines[1].slice(19)
    this.operation = eval(`(old) => ${operation}`)
    this.testDivisor = helpers.int(lines[2].slice(21))
    this.ifTrue = helpers.int(lines[3].slice(29))
    this.ifFalse = helpers.int(lines[4].slice(30))
  }
}

// Stack overvflow to the rescue once again
// https://stackoverflow.com/questions/31302054/how-to-find-the-least-common-multiple-of-a-range-of-numbers
function leastCommonMultiple(arr) {
  function gcd(a, b) {
      return !b ? a : gcd(b, a % b)
  }

  function lcm(a, b) {
      return (a * b) / gcd(a, b)
  }

  var multiple = arr[0]
  arr.forEach(function(n) {
      multiple = lcm(multiple, n)
  });

  return multiple
}

const doRound = (monkeys) => {
  for (const monkey of monkeys) {
    while(monkey.items.length) {
      monkey.totalInspections++
      const item = monkey.items.shift()
      const newWorryLevel = Math.floor(monkey.operation(item) / 3)
      if (newWorryLevel % monkey.testDivisor === 0) {
        monkeys[monkey.ifTrue].items.push(newWorryLevel)
      } else {
        monkeys[monkey.ifFalse].items.push(newWorryLevel)
      }
    }
  }
}

const doRoundModified = (monkeys, lcm) => {
  for (const monkey of monkeys) {
    while(monkey.items.length) {
      monkey.totalInspections++
      const item = monkey.items.shift()
      const newWorryLevel = monkey.operation(item) % lcm
      if (newWorryLevel % monkey.testDivisor === 0) {
        monkeys[monkey.ifTrue].items.push(newWorryLevel)
      } else {
        monkeys[monkey.ifFalse].items.push(newWorryLevel)
      }
    }
  }
}

const parseInput = (input) => {
  const lines = helpers.getLines(input)
  const monkeys = []
  for (let i = 0; i < lines.length; i+=7) {
    monkeys.push(new Monkey(lines.slice(i + 1, i + 6)))
  }
  return monkeys
}

module.exports.answer2 = (input) => {
  const monkeys = parseInput(input)
  const lcm = leastCommonMultiple(monkeys.map(m => m.testDivisor))

  helpers.times(10000, () => doRoundModified(monkeys, lcm))

  monkeys.sort((a, b) => b.totalInspections - a.totalInspections)

  return monkeys[0].totalInspections * monkeys[1].totalInspections
}

module.exports.answer1 = (input) => {
  const monkeys = parseInput(input)

  helpers.times(20, () => doRound(monkeys))

  monkeys.sort((a, b) => b.totalInspections - a.totalInspections)

  return monkeys[0].totalInspections * monkeys[1].totalInspections
}
