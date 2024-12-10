const { uniqBy } = require('lodash')
const { getLines, Map, Node } = require('../../utils/helpers')

class TopoNode extends Node {
  trails = []
  addTrail(trail) {
    this.trails.push(trail)
  }
}

class TopoMap extends Map {
  constructor(input) {
    return super(input, TopoNode)
  }

  getTrailheads() {
    return this.matrix.flat().filter((n) => n.char === '0')
  }
}

module.exports.answer2 = (input) => {
  const map = new TopoMap(input)

  const trailheads = map.getTrailheads()

  let totalScore = 0
  for (const trailhead of trailheads) {
    // search
    const nodesToCheck = [trailhead]
    while (nodesToCheck.length) {
      const node = nodesToCheck.pop()
      if (node.char === '9') {
        // we did it
        // go team
        const trail = [node]
        let traverser = node
        while (traverser.prev) {
          trail.push(traverser.prev)
          traverser = traverser.prev
        }
        // Store a list of trails per trailhead
        traverser.addTrail(trail)
      }
      const nextNeighbors = map
        .neighbors(node.x, node.y)
        .filter((n) => parseInt(n.char) === parseInt(node.char) + 1)
      nextNeighbors.forEach((n) => (n.prev = node))
      nodesToCheck.push(...nextNeighbors)
    }

    /// This is the only difference!
    const score = trailhead.trails.length
    totalScore += score
  }
  return totalScore
}

module.exports.answer1 = (input) => {
  const map = new TopoMap(input)

  const trailheads = map.getTrailheads()

  let totalScore = 0
  for (const trailhead of trailheads) {
    // search
    const nodesToCheck = [trailhead]
    while (nodesToCheck.length) {
      const node = nodesToCheck.pop()
      if (node.char === '9') {
        // we did it
        // go team
        const trail = [node]
        let traverser = node
        while (traverser.prev) {
          trail.push(traverser.prev)
          traverser = traverser.prev
        }
        // Store a list of trails per trailhead
        traverser.addTrail(trail)
      }
      const nextNeighbors = map
        .neighbors(node.x, node.y)
        .filter((n) => parseInt(n.char) === parseInt(node.char) + 1)
      nextNeighbors.forEach((n) => (n.prev = node))
      nodesToCheck.push(...nextNeighbors)
    }

    console.log(trailhead.trails)
    const score = uniqBy(
      trailhead.trails,
      (t) => `x:${t[0].x},y:${t[0].y}`
    ).length
    totalScore += score
  }
  return totalScore
}
