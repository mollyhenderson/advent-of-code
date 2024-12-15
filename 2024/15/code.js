const { getLines, Node, Map, sum } = require('../../utils/helpers')

class RobotGridNode extends Node {}

class RobotGrid extends Map {
  constructor(input) {
    super(input, RobotGridNode)
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
      this.placeAt(x, y, new RobotGridNode('.', x, y))
      return true
    }
  }

  moveRobot(direction) {
    this.move(this.robot, direction)
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  const blankIndex = lines.findIndex((l) => l === '')

  const mapLines = lines.slice(0, blankIndex).join('\n')
  const movementLines = lines.slice(blankIndex)

  const map = new RobotGrid(mapLines)
  const movements = movementLines.join('').split('')

  return { map, movements }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
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
