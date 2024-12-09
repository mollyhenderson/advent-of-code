const { groupBy, uniqBy } = require('lodash')
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

const getAntennaPairs = (map) => {
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
  return pairs
}

module.exports.answer2 = (input) => {
  const map = new AntennaMap(input)
  const pairs = getAntennaPairs(map)

  // Generate antinode coordinates
  const antinodes = []
  pairs.forEach(([a, b]) => {
    let xDiff = a.x - b.x
    let yDiff = a.y - b.y

    let coords = { x: a.x, y: a.y }
    while (map.isInBounds(coords.x, coords.y)) {
      antinodes.push(coords)
      coords = { x: coords.x - xDiff, y: coords.y - yDiff }
    }

    coords = { x: a.x, y: a.y }
    while (map.isInBounds(coords.x, coords.y)) {
      antinodes.push(coords)
      coords = { x: coords.x + xDiff, y: coords.y + yDiff }
    }
  })

  // antinodes.forEach((n) => (map.at(n.x, n.y).char = '#'))
  // console.log(map.toString())

  // lol my previous de-dupe implmentation had a bug that would erroneously
  // consider { x:12, y:3 } equal to { x:1, y:23 }
  const uniques = uniqBy(antinodes, (n) => `x:${n.x}y:${n.y}`)

  return uniques.length
}

module.exports.answer1 = (input) => {
  const map = new AntennaMap(input)
  const pairs = getAntennaPairs(map)

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
