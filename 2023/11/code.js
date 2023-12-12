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
  dupeRows = []
  dupeCols = []

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

  expand2() {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i].every((n) => n.char === '.')) this.dupeRows.push(i)
    }

    for (let i = 0; i < this.map[0].length; i++) {
      if (this.map.every((l) => l[i].char === '.')) this.dupeCols.push(i)
    }
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

  dist2(a, b) {
    const minX = Math.min(a.x, b.x)
    const maxX = Math.max(a.x, b.x)
    const minY = Math.min(a.y, b.y)
    const maxY = Math.max(a.y, b.y)

    const rowsToAdd = this.dupeRows.filter((i) => minY < i && i < maxY)
    const colsToAdd = this.dupeCols.filter((i) => minX < i && i < maxX)

    const numDupes = 1000000
    return (
      maxX +
      (numDupes - 1) * colsToAdd.length -
      minX +
      (maxY + (numDupes - 1) * rowsToAdd.length - minY)
    )
  }

  toString() {
    return this.map.map((l) => l.join('')).join('\n')
  }
}

module.exports.answer2 = (input) => {
  const map = new Map(input)
  map.expand2()
  const distances = map.allPairs().map(([a, b]) => map.dist2(a, b))
  return sum(distances)
}

module.exports.answer1 = (input) => {
  const map = new Map(input)
  map.expand()
  console.log(`${map}`)
  const distances = map.allPairs().map(([a, b]) => map.dist(a, b))
  return sum(distances)
}
