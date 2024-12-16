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

  prevs = []

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
  maze.start.distance = 0
  maze.start.prevs.push([null, 'RIGHT'])

  const q = new PriorityQueue((a, b) => a.distance < b.distance)
  q.push(...maze.nodes().filter((n) => n.notWall()))

  while (!q.isEmpty()) {
    const node = q.pop()

    if (node.char === 'E') {
      return node
    }

    if (node.x === 5 && node.y === 7) {
      console.log('HERE WITH NODE')
      console.log(node)
    }

    const neighbors = maze.neighbors(node.x, node.y)
    for (const neighbor of neighbors) {
      if (neighbor.notWall()) {
        const newDirection = maze.directionFrom(node, neighbor)
        let newDistance = node.distance
        if (node.prevs.find((p) => p[1] === newDirection)) {
          newDistance += 1
        } else {
          newDistance += 1001
        }

        if (neighbor.x === 5 && neighbor.y === 7) {
          console.log('HERE')
          console.log({ neighbor, node, newDirection, newDistance })
        }

        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance
          neighbor.prevs.push([node, newDirection])
          q.reprioritizeFirstMatch((n) => neighbor.equals(n))
        }
        if (newDistance === neighbor.distance) {
          // Technically this could be part of the above conditional but why
          // have the program do the extra work when I could leave a lengthy
          // comment instead!
          neighbor.prevs.push([node, newDirection])
        }
      }
    }
  }
}

module.exports.answer2 = (input) => {
  const maze = new Maze(input, MazeNode2)

  const res = dijkstra2(maze)

  console.log(maze.at(5, 7).prevs)

  const finalNodes = []
  const toTraverse = [res]

  while (toTraverse.length) {
    const node = toTraverse.pop()
    node.finalTraversed = true
    node.char = 'O'
    finalNodes.push(node)

    toTraverse.push(
      ...node.prevs.map((p) => p[0]).filter((n) => n && !n.finalTraversed)
    )
  }

  console.log(maze.toString())

  return new Set(finalNodes).size
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
