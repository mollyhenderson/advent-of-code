const { getLines, int } = require('../../utils/helpers')

class MapRange {
  constructor(line) {
    const [destStart, sourceStart, len] = line.split(' ').map(int)
    this.destStart = destStart
    this.sourceStart = sourceStart
    this.len = len
  }
}

class CategoryMap {
  constructor(line) {
    const lines = getLines(line)
    this.ranges = lines.map((l) => new MapRange(l))
  }

  lookup(n) {
    for (let i = 0; i < this.ranges.length; i++) {
      // check if n is in this range
      const range = this.ranges[i]
      if (n >= range.sourceStart && n < range.sourceStart + range.len) {
        // yay
        const diff = n - range.sourceStart
        return range.destStart + diff
      }
    }
    return n
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  const seeds = lines[0].match(/\d+/g).map(int)

  const mapLines = lines
    .slice(3)
    .join('\n')
    .split(/\n\n[-:a-z ]+\n/)

  const maps = mapLines.map((l) => new CategoryMap(l))
  return { seeds, maps }
}

const completeMapping = (startingValue, maps) => {
  return maps.reduce((value, map) => {
    return map.lookup(value)
  }, startingValue)
}

const parseSeedData = (data) => {
  const seeds = []
  for (let i = 0; i < data.length; i += 2) {
    const start = data[i]
    const num = data[i + 1]
    for (let j = 0; j < num; j++) {
      seeds.push(start + j)
    }
  }
  return seeds
}

module.exports.answer2 = (input) => {
  const { seeds: seedData, maps } = parseInput(input)
  const seeds = parseSeedData(seedData)
  const locations = seeds.map((seed) => completeMapping(seed, maps))
  return Math.min(...locations)
}

module.exports.answer1 = (input) => {
  const { seeds, maps } = parseInput(input)
  const locations = seeds.map((seed) => completeMapping(seed, maps))
  return Math.min(...locations)
}
