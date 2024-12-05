const { getLines } = require('../../utils/helpers')

class Rule {
  constructor(line) {
    const [first, second] = line.split('|')
    this.first = first
    this.second = second
  }
}

class Update {
  constructor(line) {
    this.pages = line.split(',')
  }

  isOrdered(rules) {
    for (let i = 0; i < this.pages.length; i++) {
      const page = this.pages[i]
      // verify that the pages before this page are allowed
      const relevantRules = rules.filter((r) => r.second === page)

      for (let rule of relevantRules) {
        if (this.pages.indexOf(rule.first) > i) {
          return false
        }
      }
    }
    return true
  }

  middle() {
    return this.pages[Math.floor(this.pages.length / 2)]
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const lines = getLines(input)

  const mid = lines.indexOf('')
  const rules = lines.slice(0, mid).map((l) => new Rule(l))
  const updates = lines.slice(mid + 1).map((l) => new Update(l))

  return updates
    .filter((update) => update.isOrdered(rules))
    .reduce((sum, curr) => (sum += parseInt(curr.middle())), 0)
}
