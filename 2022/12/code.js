const helpers = require('../../utils/helpers')
const PriorityQueue = require('../../utils/pq')

class Node {
  char
  initial = false
  destination = false
  visited = false
  distance = Infinity
  elevation
  prev
  position

  constructor(char, position) {
    this.char = char
    if (char === 'S') {
      this.initial = true
      this.distance = 0
      char = 'a'
    }
    if (char === 'E') {
      this.destination = true
      char = 'z'
    }
    this.elevation = char.charCodeAt(0) - 'a'.charCodeAt(0)
    this.position = position
  }

  equals(other) {
    return this.position === other.position
  }
}

const parseInput = (input) => {
  const lines = helpers.getLines(input)
  return lines.map((l, y) => 
    helpers.getCharacters(l).map((c, x) => 
      new Node(c, [x, y])))
}

// From 2021, day 15
// work smarter not harder
// (Now that I think about it, this could probably 
// be done with optional chaining - oh well)
const getNeighbors = (node, map) => {
  const neighbors = []
  const [x, y] = node.position
  if (x > 0) neighbors.push(map[y][x-1])
  if (x < map[y].length-1) neighbors.push(map[y][x+1])
  if (y > 0) neighbors.push(map[y-1][x])
  if (y < map.length-1) neighbors.push(map[y+1][x])
  return neighbors
}

const dijkstra = (map) => {
  const q = new PriorityQueue((a, b) => a.distance < b.distance)
  for (const line of map) {
    q.push(...line)
  }

  while (!q.isEmpty()) {
    const node = q.pop()
    
    if (node.destination) {
      return node
    }

    node.visited = true
    const neighbors = getNeighbors(node, map)
    for (const neighbor of neighbors) {
      if (!neighbor.visited && 
        neighbor.elevation <= node.elevation + 1 &&
        neighbor.distance > node.distance + 1) {
          neighbor.distance = node.distance + 1
          neighbor.prev = node
          q.reprioritizeFirstMatch((x) => neighbor.equals(x))
      }
    }
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const map = parseInput(input)
  let node = dijkstra(map)

  let count = 0
  while (node.prev) {
    count++
    node = node.prev
  }
  return count
}
