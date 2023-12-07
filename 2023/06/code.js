const { getLines, parseNumbers, int } = require('../../utils/helpers')

const parseInput = (input) => {
  const lines = getLines(input)
  const times = parseNumbers(lines[0])
  const distances = parseNumbers(lines[1])
  return times.map((t, i) => ({ time: t, distance: distances[i] }))
}

const parseInput2 = (input) => {
  const lines = getLines(input)
  const time = lines[0].replace(/Time:|\s/g, '')
  const distance = lines[1].replace(/Distance:|\s/g, '')
  return { time: int(time), distance: int(distance) }
}

const getWinWay = ({ time, distance }) => {
  let i = 0
  while (i < time) {
    const thisDist = i * (time - i)
    if (thisDist > distance) {
      // we won!
      return time - (2 * i - 1)
    }
    i++
  }
}

module.exports.answer2 = (input) => {
  return getWinWay(parseInput2(input))
}

module.exports.answer1 = (input) => {
  const races = parseInput(input)
  const winWays = races.map(getWinWay)
  return winWays.reduce((product, curr) => product * curr, 1)
}
