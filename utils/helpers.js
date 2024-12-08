const getLines = (input) => input.split('\n')

const getCharacters = (input) => input.split('')

const int = (str) => parseInt(str, 10)

const times = (num, cb) => [...Array(num)].map((_, i) => cb(i))

const parseNumbers = (input) => input.match(/(-*\d+)/g).map(int)

const sum = (input) => input.reduce((sum, curr) => sum + curr, 0)

// Basic node. Handles parsing input; can be extended to add additional functionality
class Node {
  char
  x
  y

  constructor(char, x, y) {
    this.char = char
    this.x = x
    this.y = y
  }

  toString() {
    return this.char
  }
}

// Basic map. Handles parsing input; can be extended to add additional functionality.
class Map {
  matrix

  constructor(input, nodeClass = Node) {
    this.matrix = getLines(input).map((l, i) =>
      getCharacters(l).map((c, j) => new nodeClass(c, j, i))
    )
  }

  height() {
    return this.matrix.length
  }

  width(at = 0) {
    return this.matrix[at].length
  }

  at(x, y) {
    return this.matrix[y][x]
  }

  toString() {
    return this.matrix.map((row) => row.join('')).join('\n')
  }
}

let id = 0
class CountNode {
  count = 0
  value = 1

  constructor(c) {
    this.id = id++
    this.character = c
  }

  get val() {
    return this.character
  }

  toString() {
    return this.count
  }
}
class SafeMatrix {
  constructor(input, fallback) {
    this.matrix = getLines(input).map((line) => {
      const chars = getCharacters(line)
      return chars.map((c) => new CountNode(c))
    })
    this.fallback = fallback
  }

  rawLine(y) {
    return y >= 0 && y < this.height() ? this.matrix[y].map((x) => x.val) : []
  }

  get(x, y) {
    if (
      y < 0 ||
      y >= this.matrix.length ||
      x < 0 ||
      x >= this.matrix[y].length
    ) {
      return this.fallback
    }
    return this.matrix[y][x].val
  }

  checkAround(x, y, predicate) {
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (predicate(this.get(j, i))) {
          return true
        }
      }
    }
    return false
  }

  findPositionAround(x, y, predicate) {
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (predicate(this.get(j, i))) {
          return { x: j, y: i }
        }
      }
    }
    return false
  }

  increment(x, y) {
    const node = this.matrix[y][x]
    node.count++
  }

  multiplyValue(x, y, val) {
    const node = this.matrix[y][x]
    node.value *= val
  }

  height() {
    return this.matrix.length
  }

  width(y) {
    return y >= 0 && y < this.height() ? this.matrix[y].length : 0
  }
}

class GrowingMap {
  #map
  #fillChar

  #minX = 0
  #minY = 0
  #maxY = 0
  #maxX = 0

  constructor(fillChar = 0) {
    this.#fillChar = fillChar
    this.#map = {
      0: { 0: this.#fillChar },
    }
  }

  get(x, y) {
    return this.#map[y][x]
  }

  set(x, y, value) {
    this.resizeToFit(x, y)
    this.#map[y][x] = value
  }

  // this is wildly inefficient ¯\_(ツ)_/¯
  resizeToFit(x, y) {
    while (y < this.#minY) {
      this.#minY--
      this.#map[this.#minY] = {}
      for (let i = this.#minX; i < this.#maxX; i++) {
        this.#map[this.#minY][i] = this.#fillChar
      }
    }
    while (y > this.#maxY) {
      this.#maxY++
      this.#map[this.#maxY] = {}
      for (let i = this.#minX; i < this.#maxX; i++) {
        this.#map[this.#maxY][i] = this.#fillChar
      }
    }

    while (x < this.#minX) {
      this.#minX--
      Object.values(this.#map).forEach(
        (row) => (row[this.#minX] = this.#fillChar)
      )
    }
    while (x > this.#maxX) {
      this.#maxX++
      Object.values(this.#map).forEach(
        (row) => (row[this.#maxX] = this.#fillChar)
      )
    }
  }

  toString() {
    let str = ''
    for (let i = this.#maxY; i >= this.#minY; i--) {
      for (let j = this.#minX; j <= this.#maxX; j++) {
        str += this.get(j, i)
      }
      str += '\n'
    }
    return str
  }
}

module.exports = {
  Node,
  Map,
  getLines,
  getCharacters,
  int,
  times,
  parseNumbers,
  sum,
  SafeMatrix,
  GrowingMap,
}
