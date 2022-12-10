const helpers = require('../../utils/helpers')

const parseInput = (input) => helpers.getLines(input).map(line => [...line].map(helpers.int))

module.exports.answer2 = (input) => {
  const grid = parseInput(input)

  const scores = []

  for (let treeI = 0; treeI < grid.length; treeI++) {
    scores[treeI] = []
    const line = grid[treeI]
    for (let treeJ = 0; treeJ < line.length; treeJ++) {
      const tree = line[treeJ]

      let score = 1

      // traverse up
      let count = 0
      for (let i = treeI - 1; i >= 0; i--) {
        const otherTree = grid[i][treeJ]
        count++
        if (otherTree >= tree) break
      }

      score *= count

      // traverse down
      count = 0
      for (let i = treeI + 1; i < grid.length; i++) {
        const otherTree = grid[i][treeJ]
        count++
        if (otherTree >= tree) break
      }

      score *= count

      // traverse left
      count = 0
      for (let j = treeJ - 1; j >= 0; j--) {
        const otherTree = grid[treeI][j]
        count++
        if (otherTree >= tree) break
      }

      score *= count

      // traverse right
      count = 0
      for (let j = treeJ + 1; j < line.length; j++) {
        const otherTree = grid[treeI][j]
        count++
        if (otherTree >= tree) break
      }

      score *= count

      scores[treeI][treeJ] = score
    }
  }

  return Math.max(...scores.flatMap(x => x))
}

module.exports.answer1 = (input) => {
  const grid = parseInput(input)

  const seen = []

  grid.forEach((line, i) => {
    seen[i] = []
    // traverse from the left
    let tallest = -1
    line.forEach((tree, j) => {
      seen[i][j] = 0
      if (tree > tallest) {
        seen[i][j] = 1
        tallest = tree
      }
    })

    // traverse from the right
    tallest = -1
    for (let j = line.length - 1; j > 0; j--) {
      if (line[j] > tallest) {
        seen[i][j] = 1
        tallest = line[j]
      }
    }
  })

  for (let i = 0; i < grid[0].length; i++) {
    // traverse from the top
    tallest = -1
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] > tallest) {
        seen[j][i] = 1
        tallest = grid[j][i]
      }
    }

    // traverse from the bottom
    tallest = -1
    for (let j = grid.length - 1; j > 0; j--) {
      if (grid[j][i] > tallest) {
        seen[j][i] = 1
        tallest = grid[j][i]
      }
    }
  }

  const flattened = seen.flatMap(x => x)
  // return flattened
  return flattened.reduce((acc, value) => acc + value, 0)
}
