const { getLines, getCharacters } = require('../../utils/helpers')

class Spot {
  visited = false

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

  toString() {
    return this.visited ? '!' : this.char
  }
}

const move = ({ direction, spot, lab }) => {
  spot.visit()
  switch (direction) {
    case 'UP': {
      if (spot.y === 0) return

      const next = lab.get(spot.y - 1, spot.x)
      if (next.isFree()) {
        spot = next
      } else {
        direction = 'RIGHT'
      }
      break
    }
    case 'DOWN': {
      if (spot.y === lab.matrix.length - 1) return

      const next = lab.get(spot.y + 1, spot.x)
      if (next.isFree()) {
        spot = next
      } else {
        direction = 'LEFT'
      }
      break
    }
    case 'LEFT': {
      if (spot.x === 0) return

      const next = lab.get(spot.y, spot.x - 1)
      if (next.isFree()) {
        spot = next
      } else {
        direction = 'UP'
      }
      break
    }
    case 'RIGHT': {
      if (spot.x === lab.matrix[0].length - 1) return

      const next = lab.get(spot.y, spot.x + 1)
      if (next.isFree()) {
        spot = next
      } else {
        direction = 'DOWN'
      }
      break
    }
  }
  move({ direction, spot, lab })
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

  traverse() {
    const spot = this.guard
    let direction = 'UP'

    move({ direction, spot, lab: this })
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
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const lab = new Lab(input)
  lab.traverse()
  console.log(lab.toString())
  return lab.countVisited()
}
