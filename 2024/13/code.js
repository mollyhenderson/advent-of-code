const { getLines, int, sum } = require('../../utils/helpers')

class Button {
  constructor(line, cost) {
    const {
      groups: { x, y },
    } = line.match(/X\+(?<x>\d+), Y\+(?<y>\d+)/)
    this.x = int(x)
    this.y = int(y)
    this.cost = cost
  }

  toString() {
    return `(${this.x}, ${this.y}) for ${this.cost} credits`
  }
}

class ClawMachine {
  constructor(input) {
    this.buttonA = new Button(input[0], 3)
    this.buttonB = new Button(input[1], 1)

    const {
      groups: { x, y },
    } = input[2].match(/X=(?<x>\d+), Y=(?<y>\d+)/)
    this.x = int(x) + 10000000000000
    this.y = int(y) + 10000000000000
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  const machines = []
  for (let i = 0; i < lines.length; i += 4) {
    machines.push(new ClawMachine(lines.slice(i, i + 3)))
  }
  return machines
}

module.exports.answer2 = (input) => {
  const machines = parseInput(input)

  let sum = 0
  for (const machine of machines) {
    console.log(machine)
    const options = []
    // let aPresses = 10000000000000

    const px = machine.x
    const py = machine.y
    const ax = machine.buttonA.x
    const ay = machine.buttonA.y
    const bx = machine.buttonB.x
    const by = machine.buttonB.y

    // while (true) {
    //   const x = machine.buttonA.x * aPresses
    //   const y = machine.buttonA.y * aPresses
    //   const remainderX = machine.x - x
    //   const remainderY = machine.y - y

    //   if (remainderX < 0 || remainderY < 0) {
    //     break
    //   }

    //   const bPresses = remainderX / machine.buttonB.x

    //   if (
    //     Number.isInteger(bPresses) &&
    //     remainderY / machine.buttonB.y === bPresses
    //   ) {
    //     options.push({ a: aPresses, b: bPresses })
    //     break
    //   }

    //   aPresses--

    //   // Binary search?
    // }

    if (options.length) {
      sum += options[0].a * 3 + options[0].b
    }
  }
  return sum
}

module.exports.answer1 = (input) => {
  const machines = parseInput(input)

  let sum = 0
  for (const machine of machines) {
    const options = []
    for (let aPresses = 0; aPresses <= 100; aPresses++) {
      const x = machine.buttonA.x * aPresses
      const y = machine.buttonA.y * aPresses
      const remainderX = machine.x - x
      const remainderY = machine.y - y

      const bPresses = remainderX / machine.buttonB.x

      if (
        Number.isInteger(bPresses) &&
        remainderY / machine.buttonB.y === bPresses
      ) {
        options.push({ a: aPresses, b: bPresses })
      }
    }
    if (options.length) {
      sum += options[0].a * 3 + options[0].b
    }
  }
  return sum
}
