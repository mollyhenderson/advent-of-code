const { getLines } = require('../../utils/helpers')

const parseInput = (input) => {
  const ranges = input.split(',')
  return ranges.map((range) => {
    const [start, end] = range.split('-')
    return [+start, +end]
  })
}

module.exports.answer2 = (input) => {
  const ranges = parseInput(input)

  const badIds = []
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const match = `${i}`.match(/^(\d+)(\1)+$/)
      if (match) {
        badIds.push(i)
      }
    }
  }

  return badIds.reduce((sum, curr) => (sum += curr), 0)
}

module.exports.answer1 = (input) => {
  const ranges = parseInput(input)

  const badIds = []
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      const match = `${i}`.match(/^(\d+)(\1)$/)
      if (match) {
        badIds.push(i)
      }
    }
  }

  return badIds.reduce((sum, curr) => (sum += curr), 0)
}
