const { writeFileSync } = require('fs')
const { generateSync } = require('text-to-image')
const { getLines, Map, Node, times, int } = require('../../utils/helpers')

const MAP_X = 101
const MAP_Y = 103
const SECS = 100

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

class RobotMap extends Map {
  constructor(x, y) {
    super()
    this.matrix = times(y, () => times(x, () => '.'))
  }

  toStringWithRobots(robots) {
    return this.matrix
      .map((row, y) =>
        row
          .map((_, x) => {
            const matchingRobots = robots.filter(
              (r) => r.position.x === x && r.position.y === y
            )
            return matchingRobots.length > 0 ? '*' : '\xA0'
          })
          .join('')
      )
      .join('\n')
  }
}

const parseInput = (input) => {
  return getLines(input).map((l) => new Robot(l))
}

const writeToFile = (str, i) => {
  const img = generateSync(str, {
    fontSize: 24,
    maxWidth: 800,
    lineHeight: 5,
  })
  const data = img.replace(/^data:image\/\w+;base64,/, '')
  const buf = Buffer.from(data, 'base64')
  writeFileSync(
    `/Users/mollyhenderson/git/advent-of-code/2024/14/output/${i}.png`,
    buf
  )
}

module.exports.answer2 = (input) => {
  const robots = parseInput(input)
  const map = new RobotMap(MAP_X, MAP_Y)

  let i = 1
  while (i < 9000) {
    for (const robot of robots) {
      robot.move(MAP_X, MAP_Y)
    }
    writeToFile(map.toStringWithRobots(robots), i)
    i++
  }
}

module.exports.answer1 = (input) => {
  const robots = parseInput(input)

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
