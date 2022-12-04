const helpers = require('../../utils/helpers')

const mapWire = (wire) => {
  const instructions = wire.split(',')

  const map = new helpers.GrowingMap()
  let currX = 0
  let currY = 0
  for (const instruction of instructions) {
    const direction = instruction[0]
    const distance = helpers.int(instruction.substring(1))

    switch(direction) {
      case 'U':
        helpers.times(distance, (i) => {
          map.set(currX, ++currY, 1)
        })
        break
      case 'D':
        helpers.times(distance, (i) => {
          map.set(currX, --currY, 1)
        })
        break
      case 'L':
        helpers.times(distance, (i) => {
          map.set(--currX, currY, 1)
        })
        break
      case 'R':
        helpers.times(distance, (i) => {
          map.set(++currX, currY, 1)
        })
        break
    }
  }

  return map
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  return 'I got bored with this one, maybe I should try again later! Check out helpers.GrowingMap for....a thing'

  const wires = helpers.getLines(input)

  const allMaps = wires.map(mapWire)

  return allMaps.join('\n\n')
}