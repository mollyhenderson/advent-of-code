const { getLines } = require('../../utils/helpers')
const _ = require('lodash')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const [r, a] = input.split('\n\n')

  const ranges = getLines(r)
  let available = getLines(a).map(n => +n)
  const freshIngredients = []

  for (const range of ranges) {
    const [start, end] = range.split('-')
    for (const ingredient of available) {
      if (ingredient >= start && ingredient <= end) {
        freshIngredients.push(ingredient)
      }
    }
  }
  return _.uniq(freshIngredients).length
}
