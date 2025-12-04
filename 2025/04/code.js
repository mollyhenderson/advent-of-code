const { Map } = require('../../utils/helpers')

const getNeighbors = (map, x, y) => {
  const neighbors = []
  if (map.isInBounds(x - 1, y)) neighbors.push(map.at(x - 1, y))
  if (map.isInBounds(x + 1, y)) neighbors.push(map.at(x + 1, y))
  if (map.isInBounds(x, y - 1)) neighbors.push(map.at(x, y - 1))
  if (map.isInBounds(x, y + 1)) neighbors.push(map.at(x, y + 1))

  if (map.isInBounds(x - 1, y - 1)) neighbors.push(map.at(x - 1, y - 1))
  if (map.isInBounds(x - 1, y + 1)) neighbors.push(map.at(x - 1, y + 1))
  if (map.isInBounds(x + 1, y - 1)) neighbors.push(map.at(x + 1, y - 1))
  if (map.isInBounds(x + 1, y + 1)) neighbors.push(map.at(x + 1, y + 1))

  return neighbors
}

const isAccessible = (map, x, y) => {
  const neighbors = getNeighbors(map, x, y)
  return neighbors.filter((n) => n.char === '@').length < 4
}

module.exports.answer2 = (input) => {
  const map = new Map(input)

  const removed = []
  let accessible = []

  do {
    accessible = []
    for (let y = 0; y < map.height(); y++) {
      for (let x = 0; x < map.width(); x++) {
        const node = map.at(x, y)
        if (node.char !== '@') continue

        if (isAccessible(map, x, y)) {
          accessible.push(node)
        }
      }
    }

    for (const nodeToRemove of accessible) {
      removed.push(nodeToRemove)
      nodeToRemove.char = '.'
    }
  } while (accessible.length)

  return removed.length
}

module.exports.answer1 = (input) => {
  const map = new Map(input)

  const accessible = []

  for (let y = 0; y < map.height(); y++) {
    for (let x = 0; x < map.width(); x++) {
      const node = map.at(x, y)
      if (node.char !== '@') continue
      if (isAccessible(map, x, y)) {
        accessible.push(node)
      }
    }
  }
  return accessible.length
}
