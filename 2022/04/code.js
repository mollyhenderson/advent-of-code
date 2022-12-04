const helpers = require('../../utils/helpers')

const fullyContains = (start1, end1, start2, end2) => {
  if (start1 === start2 || end1 === end2) return true
  if (start1 < start2) {
    return end1 >= end2
  }
  return end1 <= end2
}

const partiallyContains = (start1, end1, start2, end2) => {
  if (start1 === start2 || end1 === end2) return true
  if (start1 < start2) {
    return start2 <= end1
  }
  return start1 <= end2
}

const parseLine = (line) => {
  const [section1, section2] = line.split(',')
  const [start1, end1] = section1.split('-')
  const [start2, end2] = section2.split('-')

  return [helpers.int(start1), helpers.int(end1), helpers.int(start2), helpers.int(end2)]
}

module.exports.answer2 = (input) => {
  const lines = helpers.getLines(input)
  const matches = lines.filter(line => {
    const [start1, end1, start2, end2] = parseLine(line)
    return partiallyContains(start1, end1, start2, end2)
  })
  return matches.length
}

module.exports.answer1 = (input) => {
  const lines = helpers.getLines(input)
  const matches = lines.filter(line => {
    const [start1, end1, start2, end2] = parseLine(line)
    return fullyContains(start1, end1, start2, end2)
  })
  return matches.length
}
