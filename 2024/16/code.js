const { getLines, Map, Node } = require('../../utils/helpers')
const PriorityQueue = require('../../utils/pq')

const DIR_CHAR_MAP = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
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
  constructor(input) {
    super(input, MazeNode)
    const nodes = this.nodes()
    this.start = nodes.find((n) => n.char === 'S')
    this.end = nodes.find((n) => n.char === 'E')
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
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
          switch (node.direction) {
            case 'UP':
            case 'DOWN':
              if (['LEFT', 'RIGHT'].includes(newDirection)) {
                newDistance += 1001
              } else if (['UP', 'DOWN'].includes(newDirection)) {
                newDistance += 2001
              } else {
                console.log('ERROR')
              }
              break
            case 'LEFT':
            case 'RIGHT':
              if (['UP', 'DOWN'].includes(newDirection)) {
                newDistance += 1001
              } else if (['LEFT', 'RIGHT'].includes(newDirection)) {
                newDistance += 2001
              } else {
                console.log('ERROR')
              }
              break
          }
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

  // let node = res.prev
  // while (node.prev) {
  //   node.char = DIR_CHAR_MAP[node.direction]
  //   node = node.prev
  // }

  return res.distance
}
