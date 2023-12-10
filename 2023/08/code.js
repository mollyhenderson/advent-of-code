const { getLines } = require('../../utils/helpers')

class Node {
  constructor(line) {
    const [id, left, right] = line.match(/[A-Z0-9]{3}/g)
    this.id = id
    this.left = left
    this.right = right
  }
}

class Network {
  constructor(lines) {
    this._nodes = Object.fromEntries(
      lines.map((l) => {
        const node = new Node(l)
        return [node.id, node]
      })
    )
  }

  get(id) {
    return this._nodes[id]
  }

  getMany(ids) {
    return ids.map((id) => this.get(id))
  }

  nodes() {
    return Object.values(this._nodes)
  }

  nodeIds() {
    return this.nodes().map((n) => n.id)
  }
}

const followPath = ({ start, end, instructions, network }) => {
  const initialInstructions = [...instructions]

  let distance = 0
  while (true) {
    if (start === end) {
      return { distance }
    }

    if (!instructions.length) {
      instructions = [...initialInstructions]
    }
    const instruction = instructions.shift()
    const node = network.get(start)

    distance += 1
    start = instruction === 'L' ? node.left : node.right
  }
}

const followPaths = ({ instructions, network }) => {
  const initialInstructions = [...instructions]

  let starts = network.nodeIds().filter((id) => id.endsWith('A'))

  let distance = 0
  while (true) {
    if (distance % 1000 === 0) console.log(distance)

    if (starts.every((id) => id.endsWith('Z'))) {
      return { distance }
    }

    if (!instructions.length) {
      instructions = [...initialInstructions]
    }
    const instruction = instructions.shift()
    const nodes = network.getMany(starts)

    distance += 1
    const dir = instruction === 'L' ? 'left' : 'right'
    starts = nodes.map((n) => n[dir])
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  const instructions = lines.shift().split('')
  lines.shift()
  return { instructions, network: new Network(lines) }
}

module.exports.answer2 = (input) => {
  const { instructions, network } = parseInput(input)
  return followPaths({
    instructions,
    network,
  }).distance
}

module.exports.answer1 = (input) => {
  const { instructions, network } = parseInput(input)
  return followPath({
    start: 'AAA',
    end: 'ZZZ',
    instructions,
    network,
  }).distance
}
