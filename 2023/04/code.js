const { getLines, int } = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  
}

module.exports.answer1 = (input) => {
  const lines = getLines(input)

  let total = 0
  lines.map((l) => {
    const [winningSide, mySide] = l.replace(/Card\s+\d+:/, '').split('|')

    // Fun fact, had several issues here with my regex (whaaaat? nooooo...)
    // Honestly I was gonna write them out as a lil retro but I don't remember
    // them all and I've lost steam
    const winningNumbers = winningSide.match(/(\d+)\s*/g).map(int)
    const myNumbers = mySide.match(/(\d+)\s*/g).map(int)

    const wins = myNumbers.filter((n) => winningNumbers.includes(n))

    if (wins.length) {
      const points = 2 ** (wins.length - 1)
      total += points
    }
  })
  return total
}
