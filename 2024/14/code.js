const { getLines, Map, Node, times, int } = require('../../utils/helpers')

class Robot {
  constructor(input) {
    const {
      groups: { px, py, vx, vy },
    } = input.match(
      /p=(?<px>[-\d]+),(?<py>[-\d]+) v=(?<vx>[-\d]+),(?<vy>[-\d]+)/
    )
    this.startingPosition = { x: int(px), y: int(py) }
    this.velocity = { x: int(vx), y: int(vy) }
    this.position = this.startingPosition
  }

  move(mapX, mapY) {
    let newX = this.position.x + this.velocity.x
    let newY = this.position.y + this.velocity.y

    while (!(newX >= 0 && newX < mapX)) {
      if (newX >= mapX) {
        newX = newX - mapX
      }
      if (newX < 0) {
        newX = mapX + newX
      }
    }

    while (!(newY >= 0 && newY < mapY)) {
      if (newY >= mapY) {
        newY = newY - mapY
      }
      if (newY < 0) {
        newY = mapY + newY
      }
    }

    this.position = { x: newX, y: newY }
  }
}

class RobotMapNode extends Node {}

class RobotMap extends Map {
  constructor(x, y) {
    super()
    this.matrix = times(y, () => times(x, () => new RobotMapNode('.')))
  }

  toStringWithRobots(robots) {
    return this.matrix
      .map((row, y) =>
        row
          .map((_, x) => {
            const matchingRobots = robots.filter(
              (r) => r.position.x === x && r.position.y === y
            )
            return matchingRobots.length > 0 ? matchingRobots.length : '.'
          })
          .join('')
      )
      .join('\n')
  }
}

const parseInput = (input, x, y) => {
  const map = new RobotMap(x, y)
  const robots = getLines(input).map((l) => new Robot(l))
  return { map, robots }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

const MAP_X = 101
const MAP_Y = 103
const SECS = 100
module.exports.answer1 = (input) => {
  // Turns out I didn't actually need the map!
  const { map, robots } = parseInput(input, MAP_X, MAP_Y)

  for (const robot of robots) {
    for (let i = 1; i <= SECS; i++) {
      robot.move(MAP_X, MAP_Y)
    }
  }

  const halfX = Math.floor(MAP_X / 2)
  const halfY = Math.floor(MAP_Y / 2)

  const quadrant1 = robots.filter((r) => {
    return r.position.x < halfX && r.position.y < halfY
  })

  const quadrant2 = robots.filter((r) => {
    return r.position.x > halfX && r.position.y < halfY
  })

  const quadrant3 = robots.filter((r) => {
    return r.position.x < halfX && r.position.y > halfY
  })

  const quadrant4 = robots.filter((r) => {
    return r.position.x > halfX && r.position.y > halfY
  })

  return [quadrant1, quadrant2, quadrant3, quadrant4].reduce(
    (acc, robots) => (acc *= robots.length),
    1
  )
}
