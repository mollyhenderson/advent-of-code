const helpers = require('../../utils/helpers')

const parseInput = (input) => {
  const lines = helpers.getLines(input)
  const output = []
  for (let i = 0; i < lines.length; i+=3) {
    output.push([JSON.parse(lines[i]), JSON.parse(lines[i+1])])
  }
  return output
}

const parseInput2 = (input) => {
  const lines = helpers.getLines(input).filter(x => x)
  return lines.map(l => JSON.parse(l))
}

const comparePair = (left, right) => {
  const leftIsArray = Array.isArray(left)
  const rightIsArray = Array.isArray(right)

  if (!leftIsArray && !rightIsArray) {
    // both numbers
    if (left < right) {
      return true
    } 
    if (left > right) {
      return false
    }
  }
  
  if (leftIsArray && rightIsArray) {
    // both arrays

    // who decided on this wild version of a for loop
    let i = 0
    while (i < left.length) {
      if (right[i] === undefined) return false
      const res = comparePair(left[i], right[i])
      if (res != undefined) return res
      i++
    }
    // now...
    if (left.length < right.length) return true
  }

  // one array, one integer
  else if (leftIsArray) return comparePair(left, [right])
  else if (rightIsArray) return comparePair([left], right)

  // this is either:
  // * 2 equal integers
  // * 2 equal lists
  return undefined
}

const getCorrectIndices = (packetPairs) => {
  const indices = []
  packetPairs.forEach((pair, i) => {
    const isInOrder = comparePair(...pair)
    if (isInOrder) indices.push(i)
  })
  // The puzzle wants zero-indexed :eyeroll:
  return indices.map(i => i+1)
}

module.exports.answer2 = (input) => {
  const packets = parseInput2(input)
  const divider1 = [[2]]
  const divider2 = [[6]]
  packets.push(divider1, divider2)
  packets.sort((a, b) => {
    const res = comparePair(a, b)
    return res === true ? -1 : 
           res === false ? 1 : 
           0
  })
  return (packets.findIndex((x) => x === divider1) + 1) * 
         (packets.findIndex((x) => x === divider2) + 1)
}

module.exports.answer1 = (input) => {
  const packetPairs = parseInput(input)
  return getCorrectIndices(packetPairs).reduce((sum, value) => sum + value, 0)
}
