const { getLines, int, times, sum } = require('../../utils/helpers')

class Record {
  constructor(line) {
    const [conditions, sizes] = line.split(' ')
    this.conditions = conditions
    this.sizes = sizes.split(',').map(int)
  }

  static create(conditions, sizes) {
    return new Record(conditions, sizes)
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  return lines.map((l) => new Record(l))
}

// Assumes this expression is only ?'s and #'s
// const wouldFit = (condition, sizes) => {
//   const sizeNeeded = sum(sizes) + sizes.length - 1
//   return condition.length >= sizeNeeded
// }

// const getIndividualCombos = (chunk, sizes) => {
//   return [sizes]
// }

// const getCombos = (chunks, sizes) => {
//   console.log({ chunks, sizes })

//   if (chunks.length === 1) {
//     const combos = getIndividualCombos(chunks[0], sizes)
//     return combos.length ? combos : false
//   }
//   if (chunks.length < 1) {
//     throw new Error('Zero chunks', { chunks, sizes })
//   }

//   const combos = []
//   for (let i = 0; i < chunks.length - 1; i++) {
//     const leftChunks = chunks.slice(0, i + 1)
//     const rightChunks = chunks.slice(i)

//     const leftCombos = getCombos(leftChunks, sizes)
//     console.log({ leftCombos })
//     if (!leftCombos) continue
//     leftCombos.forEach((leftCombo) => {
//       const rightCombos = getCombos(rightChunks, sizes.slice(leftCombo.length))
//       console.log({ leftCombos, rightCombos })
//       if (!rightCombos) return
//       combos.push(rightCombos.map((r) => leftCombo.concat(r)))
//     })
//   }
//   return combos
// }

// const chunkRecord = (record) => {
//   console.log(record)
//   const chunks = record.conditions.split('.').filter((x) => x)
//   if (chunks.length === 1) {
//     // we've reached the smallest chunk
//     return false
//   }

//   const sizes = record.sizes
//   const combos = getCombos(chunks, sizes)

//   console.log(combos)
// }

const factorialMemo = []
const factorial = (n) => {
  if (n == 0 || n == 1) return 1
  if (factorialMemo[n] > 0) return factorialMemo[n]
  return (factorialMemo[n] = factorial(n - 1) * n)
}

// https://www.calculator.net/permutation-and-combination-calculator.html
const combinations = (n, r) => {
  return factorial(n) / (factorial(r) * factorial(n - r))
}

const isValid = ({ conditions, sizes }) => {
  const example = sizes
    .map((s) => {
      const str = times(s, () => '#')
      str.push('.')
      return str.join('')
    })
    .join('')
  console.log('!!!!', { conditions, example: example.slice(0, -1) })
  return conditions === example.slice(0, -1)
}

const arrangements = ({ conditions, sizes }) => {
  conditions = conditions.replace(/\.+/g, '.')
  conditions = conditions.replace(/^\.*|\.*$/g, '')
  console.log({ conditions, sizes })

  const valid = conditions.length >= sum(sizes) + sizes.length - 1
  if (!valid) {
    console.log('Invalid: 0\n')
    return 0
  }

  const allKnown = !conditions.split('').some((c) => c === '?')
  const firstKnown = conditions.split('').findIndex((c) => c !== '?')
  if (allKnown) {
    const valid = isValid({ conditions, sizes })
    console.log(`All known: ${valid}\n`)
    return Number(valid)
  }
  if (firstKnown === -1) {
    // this is all unknown
    const lengthHashElements = sum(sizes) + sizes.length
    const numDotElements = conditions.length - lengthHashElements + 1

    const combos = combinations(sizes.length + numDotElements, numDotElements)
    console.log(`All unknown: ${combos}\n`)
    return combos
  }

  // let count = 0

  if (conditions[firstKnown] === '#') {
    // console.log('} Handling a "#"')
    // if (firstKnown === 0) {
    //   return arrangements({
    //     conditions: conditions.slice(firstKnown + sizes[0]),
    //     sizes: sizes.slice(1),
    //   })
    // }

    let count = 0
    // loop through sizes
    // loop through each index of each size
    sizes.forEach((s, sizeIndex) => {
      for (let i = firstKnown + s; i > 0; i--) {
        // if (i > 0 && firstKnown - i < 0) break
        // we'll add extra dots of padding later
        const leftIndex = i
        const rightIndex = leftIndex + s

        // this should be a dot
        if (conditions[rightIndex + 1] === '#') {
          console.log('CONTINUING bc conditions[rightIndex + 1] === #', {
            conditions,
            rightIndex,
          })
          continue
        }
        for (let j = sizeIndex; j < rightIndex; j++) {
          // this should be a #
          if (conditions[j] === '.') {
            console.log('SKIPPING bc conditions[j] === .', { conditions, j })
            continue
          }
        }

        console.log('\tLEFT {')
        const left = arrangements({
          conditions: conditions.slice(0, leftIndex),
          sizes: sizes.slice(0, sizeIndex),
        })
        if (left === 0) continue

        console.log('\t} RIGHT {')
        const right = arrangements({
          conditions: conditions.slice(rightIndex),
          sizes: sizes.slice(sizeIndex + 1),
        })

        console.log({ left, right })

        count += left * right
      }
    })
    return count
  }
  let count = 0
  console.log('} Handling a "."')
  sizes.forEach((s, sizeIndex) => {
    console.log('\tLEFT {')
    const left = arrangements({
      conditions: conditions.slice(0, firstKnown),
      sizes: sizes.slice(0, sizeIndex),
    })
    console.log('\t} RIGHT {')
    const right = arrangements({
      conditions: conditions.slice(firstKnown + 1),
      sizes: sizes.slice(sizeIndex),
    })
    count += left * right
  })
  return count

  console.log(`End of function: ${count}\n`, { conditions, sizes })
  return count
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const records = parseInput(input)
  return records.map(arrangements)
}
