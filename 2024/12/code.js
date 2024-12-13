const { sum, Node, Map } = require('../../utils/helpers')

class Plot extends Node {}

class Garden extends Map {
  constructor(input) {
    return super(input, Plot)
  }
}

const growRegion = (node, region, garden) => {
  const neighbors = garden.neighbors(node.x, node.y)
  for (const neighbor of neighbors) {
    if (neighbor.inARegion) continue
    if (neighbor.char === node.char) {
      region.push(neighbor)
      neighbor.inARegion = true
      region = growRegion(neighbor, region, garden)
    }
  }
  return region
}

const getRegions = (garden) => {
  const regions = []
  let toTraverse = garden.matrix.flat()
  while (toTraverse.length) {
    const node = toTraverse.pop()
    node.inARegion = true
    const region = growRegion(node, [node], garden)
    // These nodes no longer need to be traversed
    toTraverse = toTraverse.filter((n) => !region.includes(n))
    regions.push(region)
  }
  return regions
}

class PerimeterSegment {
  constructor(x, y, direction) {
    this.x = x
    this.y = y
    this.direction = direction
  }

  getNextStraights() {
    switch (this.direction) {
      case 'BELOW': {
        return [
          new PerimeterSegment(this.x - 1, this.y, this.direction),
          new PerimeterSegment(this.x + 1, this.y, this.direction),
        ]
      }
      case 'LEFT': {
        return [
          new PerimeterSegment(this.x, this.y - 1, this.direction),
          new PerimeterSegment(this.x, this.y + 1, this.direction),
        ]
      }
      case 'ABOVE': {
        return [
          new PerimeterSegment(this.x + 1, this.y, this.direction),
          new PerimeterSegment(this.x - 1, this.y, this.direction),
        ]
      }
      case 'RIGHT': {
        return [
          new PerimeterSegment(this.x, this.y + 1, this.direction),
          new PerimeterSegment(this.x, this.y - 1, this.direction),
        ]
      }
    }
  }

  getNextStraight() {
    switch (this.direction) {
      case 'BELOW': {
        return new PerimeterSegment(this.x - 1, this.y, this.direction)
      }
      case 'LEFT': {
        return new PerimeterSegment(this.x, this.y - 1, this.direction)
      }
      case 'ABOVE': {
        return new PerimeterSegment(this.x + 1, this.y, this.direction)
      }
      case 'RIGHT': {
        return new PerimeterSegment(this.x, this.y + 1, this.direction)
      }
    }
  }

  getNextTurns() {
    switch (this.direction) {
      case 'BELOW': {
        return [
          new PerimeterSegment(this.x, this.y, 'LEFT'),
          new PerimeterSegment(this.x - 1, this.y + 1, 'RIGHT'),
          new PerimeterSegment(this.x, this.y, 'RIGHT'),
          new PerimeterSegment(this.x + 1, this.y + 1, 'LEFT'),
        ]
      }
      case 'LEFT': {
        return [
          new PerimeterSegment(this.x, this.y, 'ABOVE'),
          new PerimeterSegment(this.x - 1, this.y - 1, 'BELOW'),
          new PerimeterSegment(this.x, this.y, 'BELOW'),
          new PerimeterSegment(this.x - 1, this.y + 1, 'ABOVE'),
        ]
      }
      case 'ABOVE': {
        return [
          new PerimeterSegment(this.x, this.y, 'RIGHT'),
          new PerimeterSegment(this.x + 1, this.y - 1, 'LEFT'),
          new PerimeterSegment(this.x, this.y, 'LEFT'),
          new PerimeterSegment(this.x - 1, this.y - 1, 'RIGHT'),
        ]
      }
      case 'RIGHT': {
        return [
          new PerimeterSegment(this.x, this.y, 'BELOW'),
          new PerimeterSegment(this.x + 1, this.y + 1, 'ABOVE'),
          new PerimeterSegment(this.x, this.y, 'ABOVE'),
          new PerimeterSegment(this.x + 1, this.y - 1, 'BELOW'),
        ]
      }
    }
  }

  getNextTurnConcave() {
    switch (this.direction) {
      case 'BELOW': {
        return new PerimeterSegment(this.x, this.y, 'LEFT')
      }
      case 'LEFT': {
        return new PerimeterSegment(this.x, this.y, 'ABOVE')
      }
      case 'ABOVE': {
        return new PerimeterSegment(this.x, this.y, 'RIGHT')
      }
      case 'RIGHT': {
        return new PerimeterSegment(this.x, this.y, 'BELOW')
      }
    }
  }

  getNextTurnConvex() {
    switch (this.direction) {
      case 'BELOW': {
        return new PerimeterSegment(this.x - 1, this.y + 1, 'RIGHT')
      }
      case 'LEFT': {
        return new PerimeterSegment(this.x - 1, this.y - 1, 'BELOW')
      }
      case 'ABOVE': {
        return new PerimeterSegment(this.x + 1, this.y - 1, 'LEFT')
      }
      case 'RIGHT': {
        return new PerimeterSegment(this.x + 1, this.y + 1, 'ABOVE')
      }
    }
  }

  equals(other) {
    return (
      other &&
      this.x === other.x &&
      this.y === other.y &&
      this.direction === other.direction
    )
  }
}

const getPerimeterSegments = (region, garden) => {
  const perimeterSegments = []
  for (const n of region) {
    if (garden.at(n.x, n.y + 1)?.char !== n.char) {
      perimeterSegments.push(new PerimeterSegment(n.x, n.y, 'BELOW'))
    }
    if (garden.at(n.x - 1, n.y)?.char !== n.char) {
      perimeterSegments.push(new PerimeterSegment(n.x, n.y, 'LEFT'))
    }
    if (garden.at(n.x, n.y - 1)?.char !== n.char) {
      perimeterSegments.push(new PerimeterSegment(n.x, n.y, 'ABOVE'))
    }
    if (garden.at(n.x + 1, n.y)?.char !== n.char) {
      perimeterSegments.push(new PerimeterSegment(n.x, n.y, 'RIGHT'))
    }
  }
  return perimeterSegments
}

module.exports.answer2 = (input) => {
  const garden = new Garden(input)
  const regions = getRegions(garden)

  return sum(
    regions.map((r, i) => {
      const area = r.length

      let perimeterSegments = getPerimeterSegments(r, garden)
      // console.log(perimeterSegments)

      let segment = perimeterSegments.shift()
      let sides = 1
      // Segments will always be sorted such that the lower right corner is first
      // (Turns out that doesn't matter tho)
      while (segment) {
        // console.log({ segment, sides })
        const maybeNexts = segment.getNextStraights()
        next = perimeterSegments.find(
          (x) => x.equals(maybeNexts[0]) || x.equals(maybeNexts[1])
        )
        if (!next) {
          const maybeNexts = segment.getNextTurns()
          next = perimeterSegments.find((x) =>
            maybeNexts.find((y) => x.equals(y))
          )
          if (next) {
            // We completed a side, moving to an adjacent side
            sides++
          }
        }
        if (!next) {
          // We completed a side, moving to another unconnected side
          next = perimeterSegments.shift()
          // console.log('STARTING ANEW', { next, sides })
          if (next) sides++
        }
        segment = next
        perimeterSegments = perimeterSegments.filter((s) => !s.equals(segment))
      }

      console.log('FINAL NUMBER OF SIDES:', {
        char: r[0].char,
        sides,
      })
      return area * sides
    })
  )
}

module.exports.answer1 = (input) => {
  const garden = new Garden(input)
  const regions = getRegions(garden)

  return sum(
    regions.map((r) => {
      const area = r.length

      let perimeter = 0
      for (const node of r) {
        const neighbors = garden.neighbors(node.x, node.y)
        perimeter += 4 - neighbors.length
        perimeter += neighbors.filter((n) => n.char !== node.char).length
      }

      return area * perimeter
    })
  )
}
