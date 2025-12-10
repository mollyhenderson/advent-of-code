const { Map } = require('../../utils/helpers')

const traverseBFS = (s, map) => {
  let splitCount = 0

  const starts = new Set([s])
  while (starts.size) {
    const start = starts.values().next().value
    starts.delete(start)
    const next = map.at(start.x, start.y + 1)

    if (!next) continue

    if (next.char === '^') {
      splitCount++
      starts.add(map.at(next.x - 1, next.y))
      starts.add(map.at(next.x + 1, next.y))
    } else {
      starts.add(next)
    }
  }
  return splitCount
}

const traverseDFS = (start, map, splitCount = 0) => {
  const next = map.at(start.x, start.y + 1)
  if (!next) return splitCount // base case

  // We memoize results by changing the node's char, if we've already traversed
  // it and know how many timelines are possible starting from this node. Would
  // it be better to store that as a different property? Certainly! Was I too
  // lazy to do that? Obviously.
  if (Number.isInteger(next.char)) {
    return next.char
  }

  if (next.char === '^') {
    const left = map.at(next.x - 1, next.y)
    const right = map.at(next.x + 1, next.y)
    const leftSplits = traverseDFS(left, map)
    const rightSplits = traverseDFS(right, map)
    next.char = 1 + splitCount + leftSplits + rightSplits
    return next.char
  }
  return traverseDFS(next, map, splitCount)
}

module.exports.answer2 = (input) => {
  const map = new Map(input)
  const start = map.nodes().find((n) => n.char === 'S')
  return traverseDFS(start, map, 1)
}

module.exports.answer1 = (input) => {
  const map = new Map(input)
  const start = map.nodes().find((n) => n.char === 'S')
  return traverseBFS(start, map)
}
