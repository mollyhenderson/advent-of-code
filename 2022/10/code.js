const helpers = require('../../utils/helpers')

const parseInput = (input) => {
  const lines = helpers.getLines(input)
  return lines.map(line => {
    const instruction = line.slice(0,4)
    const value = helpers.int(line.slice(5)) || 0

    return [instruction, value]
  })
}

const tick = (i, j) => {
  if (j === 39) {
    i++
    j = 0
  } else {
    j++
  }
  return { i, j }
}

// Future employers, please don't judge me based on this code
module.exports.answer2 = (input) => {
  const program = parseInput(input)
  
  const output = []
  for (let i = 0; i < 6; i++) {
    output.push([])
    for (let j = 0; j < 40; j++) {
      output[i][j] = '.'
    }
  }

  let x = 1
  let i = 0
  let j = 0
  for (const line of program) {
    const [instruction, value] = line

    switch (instruction) {
      case 'noop': {
        if (x-1 <= j && j <= x+1) {
          output[i][j] = '#'
        }
        ({ i, j } = tick(i, j))
        break
      }
      case 'addx': {
        if (x-1 <= j && j <= x+1) {
          output[i][j] = '#'
        }

        ({ i, j } = tick(i, j))

        if (x-1 <= j && j <= x+1) {
          output[i][j] = '#'
        }

        ({ i, j } = tick(i, j))
        x += value
        break
      }
    }
  }

  return output.map(l => l.join('')).join('\n')
}

module.exports.answer1 = (input) => {
  const program = parseInput(input)

  let x = 1
  let cycle = 0
  let nextInterestingCycle = 20
  const interestingSignalStrengths = []
  for (const line of program) {
    const [instruction, value] = line

    switch (instruction) {
      case 'noop': {
        cycle++
        break
      }
      case 'addx': {
        cycle += 2
        x += value
        break
      }
    }

    if (cycle >= nextInterestingCycle) {
      // we already performed the instruction; un-perform it
      interestingSignalStrengths.push((x - value) * nextInterestingCycle)
      nextInterestingCycle += 40
    }
  }
  console.log(interestingSignalStrengths)

  return interestingSignalStrengths.reduce((sum, value) =>  sum + value, 0)
}
