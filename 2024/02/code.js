const { getLines, parseNumbers } = require('../../utils/helpers')

function isSafe(report) {
  const diffs = []
  for (let i = 1; i < report.length; i++) {
    diffs.push(report[i] - report[i - 1])
  }
  const allPositive = diffs.every((diff) => diff > 0 && diff < 4)
  const allNegative = diffs.every((diff) => diff < 0 && diff > -4)
  return allPositive || allNegative
}

module.exports.answer2 = (input) => {
  const reports = getLines(input)
  return reports.filter((report) => {
    const levels = parseNumbers(report)
    if (isSafe(levels)) return true

    for (let i = 0; i < levels.length; i++) {
      const newLevels = [...levels]
      newLevels.splice(i, 1)
      if (isSafe(newLevels)) return true
    }
    return false
  }).length
}

module.exports.answer1 = (input) => {
  const reports = getLines(input)
  return reports.filter((report) => {
    const levels = parseNumbers(report)
    return isSafe(levels)
  }).length
}
