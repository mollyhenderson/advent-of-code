const { getLines, int } = require('../../utils/helpers')

const countWins = (line) => {
  const [winningSide, mySide] = line.replace(/Card\s+\d+:/, '').split('|')

  // Fun fact, had several issues here with my regex (whaaaat? nooooo...)
  // Honestly I was gonna write them out as a lil retro but I don't remember
  // them all and I've lost steam
  const winningNumbers = winningSide.match(/(\d+)\s*/g).map(int)
  const myNumbers = mySide.match(/(\d+)\s*/g).map(int)

  return myNumbers.filter((n) => winningNumbers.includes(n)).length
}

module.exports.answer2 = (input) => {
  const lines = getLines(input)
  const winArr = lines.map(countWins)

  const winData = winArr.map((w) => ({ wins: w, count: 1 }))
  winData.forEach(({ wins, count }, i) => {
    for (let j = i; j < i + wins; j++) {
      winData[j + 1].count = winData[j + 1].count + count
    }
  })
  return winData.reduce((sum, { count }) => sum + count, 0)
}

module.exports.answer1 = (input) => {
  const lines = getLines(input)

  let total = 0
  lines.map((l) => {
    const wins = countWins(l)
    if (wins) {
      const points = 2 ** (wins - 1)
      total += points
    }
  })
  return total
}
