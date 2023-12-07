const { getLines, int } = require('../../utils/helpers')

const CardTypes = {
  A: 0,
  K: 1,
  Q: 2,
  J: 3,
  T: 4,
  9: 5,
  8: 6,
  7: 7,
  6: 8,
  5: 9,
  4: 10,
  3: 11,
  2: 12,
  1: 13,
}

const HandTypes = {
  FIVE: 0,
  FOUR: 1,
  FULL_HOUSE: 2,
  THREE: 3,
  TWO_PAIR: 4,
  ONE_PAIR: 5,
  HIGH: 6,
}

class Hand {
  constructor(line) {
    const [cards, bid] = line.split(' ')
    this.cards = cards.split('')
    this.bid = int(bid)
  }

  type() {
    const frequencies = {}
    this.cards.forEach((card) => {
      frequencies[card] = (frequencies[card] ?? 0) + 1
    })
    const compareFrequency = (a, b) => frequencies[b] - frequencies[a]

    const sorted = Object.keys(frequencies)
    sorted.sort(compareFrequency)

    if (sorted.length === 1) {
      return HandTypes.FIVE
    }
    if (frequencies[sorted[0]] === 4) {
      return HandTypes.FOUR
    }
    if (frequencies[sorted[0]] === 3) {
      if (frequencies[sorted[1]] === 2) {
        return HandTypes.FULL_HOUSE
      } else {
        return HandTypes.THREE
      }
    }
    if (frequencies[sorted[0]] === 2) {
      if (frequencies[sorted[1]] === 2) {
        return HandTypes.TWO_PAIR
      } else {
        return HandTypes.ONE_PAIR
      }
    }
    return HandTypes.HIGH
  }
}

const parseInput = (input) => {
  const lines = getLines(input)
  return lines.map((l) => new Hand(l))
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const hands = parseInput(input)
  hands.sort((a, b) => {
    const typeA = a.type()
    const typeB = b.type()
    if (typeA !== typeB) {
      return typeB - typeA
    }

    let i = 0
    while (i < 5) {
      if (a.cards[i] === b.cards[i]) {
        i += 1
        continue
      }
      return CardTypes[b.cards[i]] - CardTypes[a.cards[i]]
    }
  })

  return hands
    .map((h, i) => h.bid * (i + 1))
    .reduce((sum, curr) => sum + curr, 0)
}
