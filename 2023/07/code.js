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

const CardTypes2 = {
  A: 0,
  K: 1,
  Q: 2,
  T: 3,
  9: 4,
  8: 5,
  7: 6,
  6: 7,
  5: 8,
  4: 9,
  3: 10,
  2: 11,
  1: 12,
  J: 13,
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
  constructor(line, part2 = false) {
    const [cards, bid] = line.split(' ')
    this.cards = cards.split('')
    this.bid = int(bid)
    this.handType = part2 ? this.type2() : this.type()
  }

  type2() {
    if (!this.cards.includes('J')) return this.type()

    let highest = HandTypes.HIGH
    Object.keys(CardTypes2).forEach((replacement) => {
      if (replacement === 'J') return

      const cards = this.cards.map((card) => {
        if (card === 'J') return replacement
        return card
      })
      const type = getType(cards)
      // look I know the naming is bad
      if (type < highest) {
        highest = type
      }
    })
    return highest
  }

  type() {
    return getType(this.cards)
  }
}

const getType = (cards) => {
  const frequencies = {}
  cards.forEach((card) => {
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

const parseInput = (input, part2) => {
  const lines = getLines(input)
  return lines.map((l) => new Hand(l, part2))
}

const rankHands = (hands, part2 = false) => {
  hands.sort((a, b) => {
    const typeA = a.handType
    const typeB = b.handType
    if (typeA !== typeB) {
      return typeB - typeA
    }

    let i = 0
    while (i < 5) {
      if (a.cards[i] === b.cards[i]) {
        i += 1
        continue
      }
      if (part2) {
        return CardTypes2[b.cards[i]] - CardTypes2[a.cards[i]]
      } else {
        return CardTypes[b.cards[i]] - CardTypes[a.cards[i]]
      }
    }
  })
}

module.exports.answer2 = (input) => {
  const hands = parseInput(input, true)
  rankHands(hands, true)

  return hands
    .map((h, i) => h.bid * (i + 1))
    .reduce((sum, curr) => sum + curr, 0)
}

module.exports.answer1 = (input) => {
  const hands = parseInput(input)
  rankHands(hands)

  return hands
    .map((h, i) => h.bid * (i + 1))
    .reduce((sum, curr) => sum + curr, 0)
}
