const { getLines, times } = require('../../utils/helpers')

const parseInput = (input) => {
  return getLines(input).map((line) => {
    const [springs, groups] = line.split(' ')
    return {
      springs: springs.split(''),
      groups: groups.split(',').map((n) => parseInt(n)),
    }
  })
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

const segmentR = (numChars, numPositions, options = []) => {
  // Base case
  if (numChars === 0) {
    return options
  }

  for (let i = 0; i < numPositions; i++) {
    const positions = times(numPositions, () => '')
    positions[i] += '.'

    // TODO: maybe we should be recursing here
    options.push(positions)
  }
  return segmentR(numChars - 1, numPositions, options)
}

module.exports.answer1 = (input) => {
  const lines = parseInput(input)

  for (const line of lines) {
    const { groups, springs } = line
    const segments = []
    for (let i = 0; i < groups.length - 1; i++) {
      segments.push(`${times(groups[i], () => '#').join('')}.`)
    }
    segments.push(times(groups.at(-1), () => '#').join(''))
    console.log(segments)

    // * generate list of possible combos of the segments (ignoring springs for now)
    const length = springs.length
    const remainingLength = length - segments.join('').length

    const numPossiblePositions = segments.length + 1
    console.log({ length, remainingLength })
    //   * arrange the remaining spaces throughout
    const allOptions = []

    const options = segmentR(remainingLength, numPossiblePositions)
    console.log(options)

    //   for (let i = 0; i < )

    //   for (let i = 0; i < remainingLength; i++) {
    //     const positions = Array(numPossiblePositions)
    //     // place this space in each of the possible positions
    //     for (let j = 0; j < numPossiblePositions; j++) {
    //       // I have 3 (segments.length) pointers
    //       // that each move through the list
    //       // and each move through the list creates a new option

    //     }
    //   }
  }

  // Idea:

  // * overlay the actual spring data & filter for ones that are possible
}
