const { getLines } = require('../../utils/helpers')
const _ = require('lodash')

module.exports.answer2 = (input) => {
  const [r] = input.split('\n\n')

  const ranges = getLines(r)
    .map((rangeString) => rangeString.split('-').map((n) => +n))
    .sort(([a], [b]) => a - b)

  let count = 0

  let lastEnd = 0
  for (const range of ranges) {
    let [start, end] = range
    if (end <= lastEnd) {
      // Complete overlap; we can essentially ignore this range
      continue
    }
    if (start <= lastEnd) {
      // There is overlap; don't over-count
      start = lastEnd + 1
    }
    count += end - start + 1 // The addt'l 1 is bc the range is inclusive
    lastEnd = end
  }
  return count
}

module.exports.answer1 = (input) => {
  const [r, a] = input.split('\n\n')

  const ranges = getLines(r)
  let available = getLines(a).map((n) => +n)
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
