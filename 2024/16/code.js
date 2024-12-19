const { uniqBy } = require('lodash')
const { getLines, Map, Node } = require('../../utils/helpers')
const PriorityQueue = require('../../utils/pq')

const DIR_CHAR_MAP = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
}

class MazeNode2 extends Node {
  distance = Infinity
  direction

  prev

  equals(other) {
    return super.equals(other) && this.direction === other.direction
  }

  // constructor(char, x, y) {
  //   super(char, x, y)
  //   // this.direction = direction
  // }

  static from(node, direction) {
    const newNode = new MazeNode2(node.char, node.x, node.y)
    newNode.distance = node.distance
    newNode.direction = direction
    newNode.prev = node.prev

    return newNode
  }

  notWall() {
    return this.char !== '#'
  }
}

class MazeNode extends Node {
  distance = Infinity
  visited = false

  prev = null

  notWall() {
    return this.char !== '#'
  }
}

class Maze extends Map {
  constructor(input, nodeClass = MazeNode) {
    super(input, nodeClass)
    const nodes = this.nodes()
    this.start = nodes.find((n) => n.char === 'S')
    this.end = nodes.find((n) => n.char === 'E')
  }
}

const dijkstra2 = (maze) => {
  const results = []

  const nodes = maze
    .nodes()
    .filter((n) => n.notWall())
    .map((n) => {
      // add a node for each direction from each node
      const nodes = ['UP', 'DOWN', 'LEFT', 'RIGHT'].map((d) =>
        MazeNode2.from(n, d)
      )
      if (n.char === 'S') {
        // Moving 'RIGHT' from the start node is our first move
        nodes[3].distance = 0
      }
      return nodes
    })
    .flat()

  const q = new PriorityQueue((a, b) => a.distance < b.distance)
  q.push(...nodes)

  while (!q.isEmpty()) {
    const node = q.pop()

    if (node.char === 'E') {
      results.push(node)
      // return node
    }

    // if (node.x === 5 && node.y === 7) {
    //   console.log('HERE WITH NODE')
    //   console.log(node)
    // }

    for (const direction of ['UP', 'DOWN', 'LEFT', 'RIGHT']) {
      if (direction === node.direction) continue

      const neighbor = nodes.find(
        (n) => n.x === node.x && n.y === node.y && n.direction === direction
      )

      const newDistance = node.distance + 1000

      if (newDistance < neighbor.distance) {
        // neighbor.distance = newDistance
        // neighbor.prev = node
        // console.log('STORING', neighbor)
        q.reprioritizeFirstMatch((n) => {
          const matches = neighbor.equals(n)
          if (matches) {
            n.distance = newDistance
            n.prev = node
          }
          return matches
        })
      } else if (newDistance === neighbor.distance) {
        // console.log('EQUAL (TURN)', { neighbor })
        // neighbor.distance = newDistance
        // neighbor.prev = node
        // console.log('STORING', neighbor)
        q.reprioritizeFirstMatch((n) => {
          const matches = neighbor.equals(n)
          if (matches) {
            n.distance = newDistance
            n.prev = node
          }
          return matches
        })
      }
    }

    const neighbors = maze.neighbors(node.x, node.y)
    for (const neighbor of neighbors) {
      if (
        neighbor.notWall() &&
        maze.directionFrom(node, neighbor) === node.direction
      ) {
        // console.log('ADDING NEIGHBOR', { neighbor, direction: node.direction })
        const newDistance = node.distance + 1

        // if (neighbor.x === 5 && neighbor.y === 7) {
        //   console.log('HERE')
        //   console.log({ neighbor, node, newDistance })
        // }

        if (newDistance < neighbor.distance) {
          neighbor.direction = node.direction
          q.reprioritizeFirstMatch((n) => {
            const matches = neighbor.equals(n)
            if (matches) {
              n.distance = newDistance
              n.direction = node.direction
              n.prev = node
            }
            return matches
          })
        } else if (newDistance === neighbor.distance) {
          // console.log('EQUAL (NEIGHBOR)', { neighbor })
          neighbor.direction = node.direction
          q.reprioritizeFirstMatch((n) => {
            const matches = neighbor.equals(n)
            if (matches) {
              n.distance = newDistance
              n.direction = node.direction
              n.prev = node
            }
            return matches
          })
        }
      }
    }
  }

  return nodes
}

module.exports.answer2 = (input) => {
  const maze = new Maze(input, MazeNode2)

  const nodes = dijkstra2(maze)

  const finalNodes = []
  let toTraverse = nodes.filter((n) => n.char === 'E')

  while (toTraverse.length) {
    const node = toTraverse.pop()
    const matchingNodes = nodes.filter((n) => n.x === node.x && n.y === node.y)
    toTraverse = toTraverse.filter((n) => !matchingNodes.includes(n))
    // console.log(node)
    if (!node) continue

    maze.at(node.x, node.y).char = 'O'

    finalNodes.push(node)
    toTraverse.push(
      ...nodes
        .filter((n) => n.x === node.x && n.y === node.y)
        .map((n) => n.prev)
    )
  }

  console.log(maze.toString())

  return uniqBy(finalNodes, (n) => `x:${n.x},y:${n.y}`).length
}

const dijkstra = (maze) => {
  maze.start.distance = 0
  maze.start.direction = 'RIGHT'

  const q = new PriorityQueue((a, b) => a.distance < b.distance)
  q.push(...maze.nodes().filter((n) => n.notWall()))

  while (!q.isEmpty()) {
    const node = q.pop()

    if (node.char === 'E') {
      return node
    }

    node.visited = true
    const neighbors = maze.neighbors(node.x, node.y)
    for (const neighbor of neighbors) {
      if (!neighbor.visited && neighbor.notWall()) {
        const newDirection = maze.directionFrom(node, neighbor)
        let newDistance = node.distance
        if (newDirection === node.direction) {
          newDistance += 1
        } else {
          newDistance += 1001
        }

        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance
          neighbor.direction = newDirection
          neighbor.prev = node
          q.reprioritizeFirstMatch((n) => neighbor.equals(n))
        }
      }
    }
  }
}

module.exports.answer1 = (input) => {
  const maze = new Maze(input)
  const res = dijkstra(maze)
  return res.distance
}
