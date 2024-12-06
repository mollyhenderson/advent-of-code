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
      // Verify that this page can come before the later ones
      const relevantRules = rules.filter((r) => r.second === page)

      for (let rule of relevantRules) {
        if (this.pages.indexOf(rule.first) > i) {
          return false
        }
      }
    }
    return true
  }

  reorder(rules) {
    if (this.isOrdered(rules)) {
      throw new Error(
        'reorder function should only be called on an Update that is not already ordered!'
      )
    }

    const newPages = [...this.pages]
    // Wow TIL you can label a statement!
    // This would be much better as a while loop but hey we're doing all the bad practices today
    outerLoop: for (let i = 0; i < newPages.length; i++) {
      const page = newPages[i]
      // Check if any pages after this one need to move
      const relevantRules = rules.filter((r) => r.second === page)

      for (let rule of relevantRules) {
        const firstIndex = newPages.indexOf(rule.first)
        if (firstIndex > i) {
          // Move the out-of-place element before the current one
          const toMove = newPages[firstIndex]
          newPages.splice(firstIndex, 1)
          newPages.splice(i, 0, toMove)
          i--
          continue outerLoop
        }
      }
    }
    this.pages = newPages
  }

  middle() {
    return this.pages[Math.floor(this.pages.length / 2)]
  }
}

const parseInput = (input) => {
  const lines = getLines(input)

  const mid = lines.indexOf('')
  const rules = lines.slice(0, mid).map((l) => new Rule(l))
  const updates = lines.slice(mid + 1).map((l) => new Update(l))

  return { rules, updates }
}

module.exports.answer2 = (input) => {
  const { rules, updates } = parseInput(input)

  return updates
    .filter((update) => !update.isOrdered(rules))
    .map((update) => {
      update.reorder(rules)
      return update
    })
    .reduce((sum, curr) => (sum += parseInt(curr.middle())), 0)
}

module.exports.answer1 = (input) => {
  const { rules, updates } = parseInput(input)

  return updates
    .filter((update) => update.isOrdered(rules))
    .reduce((sum, curr) => (sum += parseInt(curr.middle())), 0)
}
