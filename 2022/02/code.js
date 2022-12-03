const helpers = require('../../utils/helpers')

const secondTypeOfResultsMap = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
}

module.exports.answer2 = (input) => {
  const lines = helpers.getLines(input)
  return lines.reduce((sum, line) => {
    const [theirs, mine] = line.split(' ')
    return sum + secondTypeOfResultsMap[theirs][mine]
  }, 0)
}

const resultsMap = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
}

// I'm not super proud of this approach, but I got it right the first time I 
// ran it which is maybe the first time that has happened in the history 
// of programming
// 
// Turns out it also made part 2 super simple, just had to draw another logic map
module.exports.answer1 = (input) => {
  const lines = helpers.getLines(input)
  return lines.reduce((sum, line) => {
    const [theirs, mine] = line.split(' ')
    return sum + resultsMap[theirs][mine]
  }, 0)
}
