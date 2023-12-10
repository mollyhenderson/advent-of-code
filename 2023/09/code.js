const { getLines, parseNumbers, sum } = require('../../utils/helpers')

class Sequence {
  constructor(line) {
    this.numbers = parseNumbers(line)
  }

  predictNext() {
    let next = [...this.numbers]
    this.nexts = [next]

    while (next.some((n) => n !== 0)) {
      next = getNextSequence(next)
      this.nexts.push(next)
    }

    this.nexts.at(-1).push(0)

    for (let i = this.nexts.length - 2; i >= 0; i--) {
      const prev = this.nexts[i + 1]
      const curr = this.nexts[i]
      curr.push(prev.at(-1) + curr.at(-1))
    }

    return this.nexts[0].at(-1)
  }
}

const parseInput = (input) => {
  return getLines(input).map((l) => new Sequence(l))
}

const getNextSequence = (seq) => {
  const nextSeq = []
  for (let i = 1; i < seq.length; i++) {
    nextSeq.push(seq[i] - seq[i - 1])
  }
  return nextSeq
}

module.exports.answer2 = (input) => {
  const sequences = parseInput(input)
  sequences.forEach(s => s.numbers.reverse())
  const nexts = sequences.map((s) => s.predictNext())
  return sum(nexts)
}

module.exports.answer1 = (input) => {
  const sequences = parseInput(input)
  const nexts = sequences.map((s) => s.predictNext())
  return sum(nexts)
}
