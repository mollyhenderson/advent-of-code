const helpers = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  const chars = helpers.getCharacters(input)

  for (let i = 0; i < chars.length; i++) {
    const numUniques = new Set(chars.slice(i, i+14)).size
    if (numUniques === 14) return i + 14
  }
}

module.exports.answer1 = (input) => {
  const chars = helpers.getCharacters(input)

  for (let i = 0; i < chars.length; i++) {
    const numUniques = new Set(chars.slice(i, i+4)).size
    if (numUniques === 4) return i + 4
  }
}
