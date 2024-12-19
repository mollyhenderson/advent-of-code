const { getLines } = require('../../utils/helpers')

const parseInput = (input) => {
  const lines = getLines(input)
  const towels = lines[0].split(', ')
  const designs = lines.slice(2)

  return { towels, designs }
}

const memo = {}
const recurse = (design, towels) => {
  if (!design.length) {
    return 1
  }
  if (memo[design] !== undefined) {
    return memo[design]
  }

  const options = towels.filter((towel) => {
    if (design.startsWith(towel)) {
      return recurse(design.slice(towel.length), towels)
    }
  })

  memo[design] = options.length
  return options.length
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const { towels, designs } = parseInput(input)

  const options = designs.filter((design) => {
    return recurse(design, towels)
  })
  return options.length
}
