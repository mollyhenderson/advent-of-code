const { getLines, sum } = require('../../utils/helpers')

let id = 1
class Node {
  id = 0

  constructor(char, x, y) {
    if (char === '#') this.id = id++
    this.char = char
    this.x = x
    this.y = y
  }

  toString() {
    return this.id || this.char
  }
}

class Map {
  constructor(input) {
    const lines = getLines(input)
    this.map = lines.map((l, i) => {
      const chars = l.split('')
      return chars.map((c, j) => new Node(c, j, i))
    })
  }

  expand() {
    const newMap = []
    // duplicate rows
    this.map.forEach((row, i) => {
      newMap.push(row)
      if (row.every((n) => n.char === '.')) {
        // duplicate this row
        newMap.push(row.map((n) => new Node(n.char)))
      }
    })

    // duplicate columns
    for (let i = 0; i < newMap[0].length; i++) {
      if (newMap.every((l) => l[i].char === '.')) {
        // duplicate this column
        newMap.forEach((l, j) => l.splice(i, 0, new Node('.')))
        i += 1
      }
    }

    // fix indices
    for (let i = 0; i < newMap.length; i++) {
      const row = newMap[i]
      for (let j = 0; j < row.length; j++) {
        row[j].x = j
        row[j].y = i
      }
    }

    this.map = newMap
  }

  allPairs() {
    const nodes = this.map.flat().filter((n) => n.char === '#')
    const pairs = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        pairs.push([nodes[i], nodes[j]])
      }
    }
    return pairs
  }

  dist(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  }

  toString() {
    return this.map.map((l) => l.join('')).join('\n')
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const map = new Map(input)
  map.expand()
  console.log(`${map}`)
  const distances = map.allPairs().map(([a, b]) => map.dist(a, b))
  return sum(distances)
}
