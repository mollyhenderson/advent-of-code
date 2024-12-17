const { getLines, int } = require('../../utils/helpers')

class Instruction {
  constructor(a, b, computer) {
    this.instruction = a
    this.operand = b
    this.computer = computer
  }

  get literalOperand() {
    return this.operand
  }

  get comboOperand() {
    switch (this.operand) {
      case 0:
      case 1:
      case 2:
      case 3:
        return this.operand
      case 4:
        return this.computer.A
      case 5:
        return this.computer.B
      case 6:
        return this.computer.C
      default:
        console.log('SOMETHING WENT WRONG HERE')
    }
  }

  run() {
    const numerator = this.computer.A
    const denominator = 2 ** this.comboOperand
    const divisionResult = Math.trunc(numerator / denominator)
    switch (this.instruction) {
      case 0: {
        this.computer.A = divisionResult
        break
      }
      case 1: {
        this.computer.B = this.computer.B ^ this.literalOperand
        break
      }
      case 2: {
        this.computer.B = this.comboOperand % 8
        break
      }
      case 3: {
        if (this.computer.A) {
          this.computer.index = Math.floor(this.literalOperand / 2)
          return false
        }
        break
      }
      case 4: {
        this.computer.B = this.computer.B ^ this.computer.C
        break
      }
      case 5: {
        this.computer.output(this.comboOperand % 8)
        break
      }
      case 6: {
        this.computer.B = divisionResult
        break
      }
      case 7: {
        this.computer.C = divisionResult
        break
      }
    }
    return true
  }
}

class Computer {
  A
  B
  C
  instructions = []
  outputs = []
  constructor(input) {
    const lines = getLines(input)
    this.A = int(lines[0].match(/\d+/)[0])
    this.B = int(lines[1].match(/\d+/)[0])
    this.C = int(lines[2].match(/\d+/)[0])

    this.program = lines[4].match(/(\d+,?)+/g)[0]

    const numbers = this.program.split(',').map(int)
    for (let i = 0; i < numbers.length; i += 2) {
      this.instructions.push(new Instruction(numbers[i], numbers[i + 1], this))
    }
  }

  run() {
    this.outputs = []
    this.index = 0
    while (this.index < this.instructions.length) {
      const output = this.instructions[this.index].run()
      if (output) {
        this.index++
      }
    }
    return this.outputs.join(',')
  }

  output(num) {
    this.outputs.push(num)
  }

  findA() {
    let a = 0
    while (true) {
      if (a % 100 === 0) console.log(`A: ${a}`)
      this.A = a
      const out = this.run()
      if (out === this.program) return a
      a++
    }
  }
}

module.exports.answer2 = (input) => {
  return new Computer(input).findA()
}

module.exports.answer1 = (input) => {
  return new Computer(input).run()
}
