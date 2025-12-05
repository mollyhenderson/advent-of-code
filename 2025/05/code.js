const { getLines } = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const [r, a] = input.split('\n\n')

  const ranges = getLines(r)
  let available = getLines(a).map(n => +n)
  let count = 0

  for (const range of ranges) {
    console.log('Parsing range:', range)
    const [start, end] = range.split('-')
    for (let i = start; i <= end;i ++) {
      if (available.includes(i)) {
        available = available.filter(a => a !== i)
        count++
      }
    }
  }
  return count
}
