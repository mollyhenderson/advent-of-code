const { Map } = require('../../utils/helpers')

const traverse = (s, map) => {
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

// DFS - doesn't work bc some paths converge
// const traverse = (start, map, splitCount = 0) => {
//   const next = map.at(start.x, start.y + 1)
//   console.log(start, splitCount, next)
//   if (!next) return splitCount // base case

//   if (next.char === '^') {
//     const left = map.at(next.x - 1, next.y)
//     const right = map.at(next.x + 1, next.y)
//     const leftSplits = traverse(left, map)
//     const rightSplits = traverse(right, map)
//     console.log('Returning from split: ', {
//       original: next,
//       leftSplits,
//       rightSplits,
//     })
//     return 1 + splitCount + leftSplits + rightSplits
//   }
//   return traverse(next, map, splitCount)
// }

module.exports.answer2 = (input) => {
  const map = new Map(input)
  const start = map.nodes().find((n) => n.char === 'S')
  return traverse(start, map)
}

module.exports.answer1 = (input) => {
  const map = new Map(input)
  const start = map.nodes().find((n) => n.char === 'S')
  return traverse(start, map)
}
