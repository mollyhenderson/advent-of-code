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

  runBackward() {
    switch (this.instruction) {
      case 0: {
        if (this.operand === 4) {
          throw new Error("Whoops, didn't handle this case!")
        }
        this.computer.A = this.computer.A * 2 ** this.comboOperand
        break
      }
      case 1: {
        console.log('Ignoring instruction 1')
        break
      }
      case 2: {
        console.log('Ignoring instruction 2')
        break
      }
      case 3: {
        // Jump. This is a no-op when running backward.
        break
      }
      case 4: {
        console.log('Ignoring instruction 4')
        break
      }
      case 5: {
        // Technically the register could be set to any x s.t. x%8 === expected.
        // But we're gonna see if this works!
        const expected = this.computer.getNextExpectedOutput()
        switch (this.operand) {
          case 0:
          case 1:
          case 2:
          case 3:
            if (this.operand % 8 !== expected) {
              throw new Error('Something has gone wrong!')
            }
            break
          case 4:
            if (this.computer.A % 8 !== expected) {
              console.log({ value: this.computer.A, expected })
              throw new Error('Something has gone wrong!')
            }
            this.computer.A = expected
            break
          case 5:
            this.computer.B = expected
            break
          case 6:
            this.computer.C = expected
            break
          default:
            console.log('SOMETHING WENT WRONG HERE')
        }
        break
      }
      case 6: {
        console.log('Ignoring instruction 6')
        break
      }
      case 7: {
        console.log('Ignoring instruction 7')
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

    this.program = lines[4]
      .match(/(\d+,?)+/g)[0]
      .split(',')
      .map(int)

    for (let i = 0; i < this.program.length; i += 2) {
      this.instructions.push(
        new Instruction(this.program[i], this.program[i + 1], this)
      )
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

  getNextExpectedOutput() {
    return this.outputs.pop()
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

  findA2() {
    // work backwards
    this.A = 0
    this.B = 0
    this.C = 0
    this.index = this.instructions.length - 1
    this.outputs = this.program
    while (this.index >= 0) {
      this.instructions[this.index].runBackward()
      console.log({ index: this.index, A: this.A, B: this.B, C: this.C })
      this.index--

      // If we run into the beginning of the program but haven't fulfilled the
      // requirements yet, loop back to the jmp instruction. (it bugs me how
      // tailored this is to the specific input given, but I'm not sure how to
      // make it more robust)
      if (this.index < 0 && this.outputs.length) {
        this.index = this.instructions.length - 1
      }
    }
    return this.A
  }
}

module.exports.answer2 = (input) => {
  const computer = new Computer(input)
  const a = computer.findA2()
  console.log(computer)
  return a
}

module.exports.answer1 = (input) => {
  return new Computer(input).run()
}
