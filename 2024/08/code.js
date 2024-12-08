const { groupBy, uniq, uniqBy } = require('lodash')
const { Map, Node } = require('../../utils/helpers')

class AntennaNode extends Node {
  isAntinode = false
  isAntenna() {
    return this.char !== '.'
  }
}

class AntennaMap extends Map {
  constructor(input) {
    return super(input, AntennaNode)
  }

  getAllAntennae() {
    return this.matrix.flat().filter((n) => n.isAntenna())
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const map = new AntennaMap(input)

  // Apparently the plural "antennas" is used to refer to electrical equipment,
  // and "antennae" refers to the insect protuberances. I choose to imagine this
  // map containing insect protuberances!
  const antennae = map.getAllAntennae()
  const grouped = groupBy(antennae, (n) => n.char)

  // Get all pairs of matching antennae
  const pairs = []
  Object.values(grouped).forEach((group) => {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push([group[i], group[j]])
      }
    }
  })

  // Generate antinode coordinates
  const antinodes = []
  pairs.forEach(([a, b]) => {
    const xDiff = a.x - b.x
    const yDiff = a.y - b.y

    const newA = { x: a.x + xDiff, y: a.y + yDiff }
    const newB = { x: b.x - xDiff, y: b.y - yDiff }

    antinodes.push(newA, newB)
  })

  // Remove any outside the bounds of the map
  const filtered = antinodes.filter(
    (a) => a.x >= 0 && a.x < map.width() && a.y >= 0 && a.y < map.height()
  )

  // De-dupe
  const uniques = uniqBy(filtered, (n) => `${n.x}${n.y}`)

  return uniques.length
}
