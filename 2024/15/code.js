const {
  getLines,
  Node,
  Map,
  sum,
  getCharacters,
} = require('../../utils/helpers')

class RobotGrid extends Map {
  constructor(input) {
    super(input)
    this.robot = this.matrix.flat().find((n) => n.char === '@')
  }

  move(node, direction) {
    if (node.char === '.') return true
    if (node.char === '#') return false

    const x = node.x
    const y = node.y
    let newX = x
    let newY = y
    switch (direction) {
      case '<':
        newX = x - 1
        break
      case '^':
        newY = y - 1
        break
      case '>':
        newX = x + 1
        break
      case 'v':
        newY = y + 1
        break
    }

    const newNode = this.at(newX, newY)

    if (this.move(newNode, direction)) {
      node.x = newX
      node.y = newY
      this.placeAt(newX, newY, node)
      this.placeAt(x, y, new Node('.', x, y))
      return true
    }
  }

  moveRobot(direction) {
    this.move(this.robot, direction)
  }
}

class LargeRobotGridNode extends Node {}

class LargeRobotGrid extends Map {
  constructor(input) {
    super()
    this.matrix = getLines(input).map((l, i) => {
      const chars = getCharacters(l)
      return chars
        .map((c) => {
          switch (c) {
            case '#':
              return '##'
            case 'O':
              return '[]'
            case '.':
              return '..'
            case '@':
              return '@.'
          }
        })
        .join('')
        .split('')
        .map((c, j) => new LargeRobotGridNode(c, j, i))
    })

    this.robot = this.matrix.flat().find((n) => n.char === '@')
  }

  move(node, direction) {
    if (node.char === '.') return true
    if (node.char === '#') return false

    const x = node.x
    const y = node.y
    let newX = x
    let newY = y
    switch (direction) {
      case '<':
        newX = x - 1
        break
      case '^':
        newY = y - 1
        break
      case '>':
        newX = x + 1
        break
      case 'v':
        newY = y + 1
        break
    }

    const newNode = this.at(newX, newY)

    if (this.move(newNode, direction)) {
      node.x = newX
      node.y = newY
      this.placeAt(newX, newY, node)
      this.placeAt(x, y, new Node('.', x, y))
      return true
    }
  }

  moveRobot(direction) {
    this.move(this.robot, direction)
  }
}

const parseInput = (input, gridType = RobotGrid) => {
  const lines = getLines(input)
  const blankIndex = lines.findIndex((l) => l === '')

  const mapLines = lines.slice(0, blankIndex).join('\n')
  const movementLines = lines.slice(blankIndex)

  const map = new gridType(mapLines)
  const movements = movementLines.join('').split('')

  return { map, movements }
}

module.exports.answer2 = (input) => {
  const { map, movements } = parseInput(input, LargeRobotGrid)

  for (const movement of movements) {
    map.moveRobot(movement)
  }

  return map.toString()
}

module.exports.answer1 = (input) => {
  const { map, movements } = parseInput(input)

  for (const movement of movements) {
    map.moveRobot(movement)
  }
  console.log(map.toString())
  return sum(
    map.matrix
      .flat()
      .filter((n) => n.char === 'O')
      .map((n) => n.y * 100 + n.x)
  )
}
