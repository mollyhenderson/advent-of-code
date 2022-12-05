const helpers = require('../../utils/helpers')

class Instruction {
  count
  startStack
  endStack

  constructor (line) {
    const found = line.match(/move (\d+) from (\d+) to (\d+)/)
  
    this.count = helpers.int(found[1])
    // convert to 0-based
    this.startStack = helpers.int(found[2]) - 1
    this.endStack = helpers.int(found[3]) - 1
    
  }
}

const parseInput = (input) => {
  const lines = helpers.getLines(input)
  const i = lines.findIndex(l => l === '')
  const crateLines = lines.slice(0, i)
  const instructionLines = lines.slice(i + 1)

  const instructions = instructionLines.map(l => new Instruction(l))

  // find the last digit on the line
  const crateCount = helpers.int(crateLines.at(-1).match(/.* (\d+) /)[1])

  const stacks = helpers.times(crateCount, _ => [])

  for (let i = crateLines.length - 2; i >= 0; i--) {
    const line = crateLines[i]
    helpers.times(crateCount, i => {
      char = line[i * 4 + 1]
      if (char !== ' ') {
        stacks[i].push(char)
      }
    })
  }

  return { stacks, instructions }
}

module.exports.answer2 = (input) => {
  const { stacks, instructions } = parseInput(input)
  
  for (const instruction of instructions) {
    const crates = helpers.times(instruction.count, _ => stacks[instruction.startStack].pop()).reverse()
    stacks[instruction.endStack].push(...crates)
  }

  return stacks.map(c => c.at(-1)).join('')
}

module.exports.answer1 = (input) => {
  const { stacks, instructions } = parseInput(input)
  
  for (const instruction of instructions) {
    helpers.times(instruction.count, _ => {
      const crate = stacks[instruction.startStack].pop()
      stacks[instruction.endStack].push(crate)
    })
  }

  return stacks.map(c => c.at(-1)).join('')
}
