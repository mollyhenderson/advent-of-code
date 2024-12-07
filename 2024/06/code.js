const { getLines, getCharacters } = require('../../utils/helpers')

class Spot {
  visited = false

  hits = []

  constructor(char, x, y) {
    this.char = char
    this.x = x
    this.y = y
  }

  isGuard() {
    return this.char === '^'
  }

  isFree() {
    return this.char !== '#'
  }

  visit() {
    this.visited = true
  }

  hitFrom(direction) {
    this.hits.push(direction)
  }

  hasBeenHitFrom(direction) {
    return this.hits.includes(direction)
  }

  reset() {
    this.visited = false
    this.hits = []
  }

  toString() {
    return this.visited ? '!' : this.char
  }
}

const move = ({ direction, spot, lab }) => {
  while (true) {
    spot.visit()
    switch (direction) {
      case 'UP': {
        if (spot.y === 0) return true

        const next = lab.get(spot.y - 1, spot.x)
        if (next.isFree()) {
          spot = next
        } else {
          if (next.hasBeenHitFrom(direction)) {
            // guard's in an infinite loop
            return false
          }
          next.hitFrom(direction)
          direction = 'RIGHT'
        }
        break
      }
      case 'DOWN': {
        if (spot.y === lab.matrix.length - 1) return true

        const next = lab.get(spot.y + 1, spot.x)
        if (next.isFree()) {
          spot = next
        } else {
          if (next.hasBeenHitFrom(direction)) {
            // guard's in an infinite loop
            return false
          }
          next.hitFrom(direction)
          direction = 'LEFT'
        }
        break
      }
      case 'LEFT': {
        if (spot.x === 0) return true

        const next = lab.get(spot.y, spot.x - 1)
        if (next.isFree()) {
          spot = next
        } else {
          if (next.hasBeenHitFrom(direction)) {
            // guard's in an infinite loop
            return false
          }
          next.hitFrom(direction)
          direction = 'UP'
        }
        break
      }
      case 'RIGHT': {
        if (spot.x === lab.matrix[0].length - 1) return true

        const next = lab.get(spot.y, spot.x + 1)
        if (next.isFree()) {
          spot = next
        } else {
          if (next.hasBeenHitFrom(direction)) {
            // guard's in an infinite loop
            return false
          }
          next.hitFrom(direction)
          direction = 'DOWN'
        }
        break
      }
    }
  }
}

class Lab {
  constructor(input) {
    this.matrix = getLines(input).map((l, i) =>
      getCharacters(l).map((c, j) => {
        const spot = new Spot(c, j, i)
        if (spot.isGuard()) {
          this.guard = spot
        }
        return spot
      })
    )
  }

  reset() {
    for (let row of this.matrix) {
      for (let spot of row) {
        spot.reset()
      }
    }
  }

  traverse() {
    const spot = this.guard
    let direction = 'UP'

    return move({ direction, spot, lab: this })
  }

  findObstaclePositions() {
    let count = 0
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[0].length; j++) {
        const spot = this.get(i, j)
        if (spot.isFree()) {
          spot.char = '#'
          const res = this.traverse()
          if (!res) count++
          spot.char = '.'
          this.reset()
        }
      }
    }
    return count
  }

  countVisited() {
    let count = 0
    for (let row of this.matrix) {
      for (let spot of row) {
        if (spot.visited) count++
      }
    }
    return count
  }

  get(y, x) {
    return this.matrix[y][x]
  }

  toString() {
    return this.matrix.map((row) => row.join('')).join('\n')
  }
}

module.exports.answer2 = (input) => {
  // The idea:
  // for each obstacle spot, record a list of "hit from" directions
  // if hitting from the same direction multiple times, we've hit a loop.
  // Then we can try placing a new obstacle at each spot
  // and test whether traverse hits a loop
  const lab = new Lab(input)
  return lab.findObstaclePositions()
}

module.exports.answer1 = (input) => {
  const lab = new Lab(input)
  lab.traverse()
  console.log(lab.toString())
  return lab.countVisited()
}
