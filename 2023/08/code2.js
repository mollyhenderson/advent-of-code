const fs = require('fs')
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

let id = 0
class Instruction {
  constructor(direction) {
    this.id = id++
    this.direction = direction
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  const instructions = lines.shift().split('')
  lines.shift()
  return { instructions, network: new Network(lines) }
}

const prevIndex = (i, arr) => (i === 0 ? arr.length - 1 : i - 1)
const nextIndex = (i, arr) => (i === arr.length - 1 ? 0 : i + 1)

module.exports.answer2 = (input) => {
  const { instructions, network } = parseInput(input)
  const allNodeIds = network.nodeIds()
  const adjMatrices = instructions.map((instruction) => {
    // matrix is an object of objects,
    // mapping each node id to each other node id & the distance between them
    const matrix = Object.fromEntries(
      allNodeIds.map((id) => [
        id,
        Object.fromEntries(allNodeIds.map((id2) => [id2, Infinity])),
      ])
    )
    // initialize with the nearest nodes
    const dir = instruction === 'L' ? 'left' : 'right'
    allNodeIds.forEach((id) => {
      const next = network.get(id)[dir]
      matrix[id][next] = 1
    })

    return matrix
  })
  // index in the adjMatrices array represents the index of the starting instruction

  let iterationCount = 1

  instructions.forEach((instruction, i) => {
    const adjMatrix = adjMatrices[i]

    Object.entries(adjMatrix).forEach(([id, adjToThis]) => {
      let nextAdjMatrix = adjMatrices[nextIndex(i, instructions)]
      let dir = instructions[i] === 'L' ? 'left' : 'right'
      let next = network.get(id)[dir]
      let nextInstructionId = nextIndex(i, instructions)

      while (nextInstructionId !== i) {
        const currDist = adjMatrix[id][next]
        if (currDist < Infinity) break
        // set some new stuff?
        adjMatrix[id][next] = nextAdjMatrix[next][dir]
      }
    })
  })

  // for (let i = 0; i < instructions.length; i++) {
  //   const dir = instructions[i] === 'L' ? 'left' : 'right'
  //   const adjMatrix = adjMatrices[i]
  //   const nextAdjMatrix = adjMatrices[nextIndex(i, instructions)]

  //   allNodeIds.forEach((id) => {
  //     const adjToThis = adjMatrix[id]
  //     Object.entries(adjToThis).forEach(([adjId, dist]) => {
  //       if (dist < Infinity) return
  //       const next = network.get(adjId)[dir]
  //       adjToThis[adjId] = nextAdjMatrix[adjId][next] + iterationCount
  //     })
  //   })
  // }

  console.log(adjMatrices)
}

module.exports.answer2(fs.readFileSync('2023/08/test_input.txt', 'utf-8'))
