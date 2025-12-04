const { Map } = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const map = new Map(input)

  const accessible = []

  for (let y = 0; y < map.height(); y++) {
    for (let x = 0; x < map.width(); x++) {
      const node = map.at(x, y)
      if (node.char !== '@') continue

      const neighbors = []
      if (map.isInBounds(x - 1, y)) neighbors.push(map.at(x - 1, y))
      if (map.isInBounds(x + 1, y)) neighbors.push(map.at(x + 1, y))
      if (map.isInBounds(x, y - 1)) neighbors.push(map.at(x, y - 1))
      if (map.isInBounds(x, y + 1)) neighbors.push(map.at(x, y + 1))

      if (map.isInBounds(x - 1, y - 1)) neighbors.push(map.at(x - 1, y - 1))
      if (map.isInBounds(x - 1, y + 1)) neighbors.push(map.at(x - 1, y + 1))
      if (map.isInBounds(x + 1, y - 1)) neighbors.push(map.at(x + 1, y - 1))
      if (map.isInBounds(x + 1, y + 1)) neighbors.push(map.at(x + 1, y + 1))

      if (neighbors.filter((n) => n.char === '@').length < 4) {
        accessible.push(node)
      }
    }
  }
  return accessible.length
}
