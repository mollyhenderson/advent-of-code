const { getLines, parseNumbers } = require('../../utils/helpers')

const parseInput = (input) => {
  const lines = getLines(input)
  const times = parseNumbers(lines[0])
  const distances = parseNumbers(lines[1])
  return times.map((t, i) => ({ time: t, distance: distances[i] }))
}

const getWinWays = (races) => {
  return races.map(({ time, distance }) => {
    let i = 0
    while (i < time) {
      const thisDist = i * (time - i)
      if (thisDist > distance) {
        // we won!
        return time - (2 * i - 1)
      }
      i++
    }
  })
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const races = parseInput(input)
  const winWays = getWinWays(races)
  return winWays.reduce((product, curr) => product * curr, 1)
}
