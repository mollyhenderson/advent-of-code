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

const followPath = ({ start, endCondition, instructions, network }) => {
  instructions = [...instructions]
  const initialInstructions = [...instructions]

  let distance = 0
  while (true) {
    if (endCondition(start)) {
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
  let instructionIndex = 0
  let starts = network.nodeIds().filter((id) => id.endsWith('A'))
  let distance = 0
  while (true) {
    if (distance % 100000000 === 0) console.log(distance)

    if (starts.every((id) => id.endsWith('Z'))) {
      return { distance }
    }

    if (instructionIndex === instructions.length) {
      instructionIndex = 0
    }
    const instruction = instructions[instructionIndex]
    const nodes = network.getMany(starts)

    distance += 1
    instructionIndex += 1
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

const minIndex = (nums) => {
  let min = Infinity
  let minIndex = -1
  nums.forEach((n, i) => {
    if (n < min) {
      min = n
      minIndex = i
    }
  })
  return minIndex
}

const lcm = (nums) => {
  const multiples = [...nums]
  while (!multiples.every((n) => n === multiples[0])) {
    const min = minIndex(multiples)
    multiples[min] += nums[min]
  }
  return multiples[0]
}

module.exports.answer2 = (input) => {
  const { instructions, network } = parseInput(input)
  const starts = network.nodes().filter((n) => n.id.endsWith('A'))

  const dists = starts.map(
    (n) =>
      followPath({
        start: n.id,
        endCondition: (id) => id.endsWith('Z'),
        instructions,
        network,
      }).distance
  )
  return lcm(dists)
}

module.exports.answer1 = (input) => {
  const { instructions, network } = parseInput(input)
  return followPath({
    start: 'AAA',
    endCondition: (id) => id === 'ZZZ',
    instructions,
    network,
  }).distance
}
