const { getLines } = require('../../utils/helpers')

class Node {
  constructor(line) {
    const [id, left, right] = line.match(/[A-Z]{3}/g)
    this.id = id
    this.left = left
    this.right = right
  }
}

class Network {
  constructor(lines, initialInstructions) {
    this.initialInstructions = initialInstructions
    this.nodes = Object.fromEntries(
      lines.map((l) => {
        const node = new Node(l)
        return [node.id, node]
      })
    )
  }

  get(id) {
    return this.nodes[id]
  }
}

const followPath = ({ start, end, instructions, network, distance = 0 }) => {
  if (start === end) {
    return { distance }
  }

  if (!instructions.length) {
    instructions = network.initialInstructions
  }

  const modifiedInstructions = [...instructions]
  const instruction = modifiedInstructions.shift()
  const node = network.get(start)

  if (instruction === 'L') {
    return followPath({
      start: node.left,
      end,
      instructions: modifiedInstructions,
      network,
      distance: distance + 1,
    })
  }
  return followPath({
    start: node.right,
    end,
    instructions: modifiedInstructions,
    network,
    distance: distance + 1,
  })
}

const parseInput = (input) => {
  const lines = getLines(input)
  const instructions = lines.shift().split('')
  lines.shift()
  return { instructions, network: new Network(lines, instructions) }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const { instructions, network } = parseInput(input)
  return followPath({
    start: 'AAA',
    end: 'ZZZ',
    instructions,
    network,
  })
}
