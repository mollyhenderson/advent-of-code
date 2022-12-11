const helpers = require('../../utils/helpers')

const parseInput = (input) => {
  lines = helpers.getLines(input)

  return lines.map(line => {
    const direction = line.slice(0,1)
    const count = helpers.int(line.slice(2))

    return [direction, count]
  })
}

const getBoundaries = (instructions) => {
  let x = 0
  let y = 0
  let minX = 0
  let minY = 0
  let maxX = -Infinity 
  let maxY = -Infinity
  for (const instruction of instructions) {
    const [direction, count] = instruction

    switch(direction) {
      case 'L': {
        x -= count
        minX = Math.min(minX, x)
        break
      }
      case 'R': {
        x += count
        maxX = Math.max(maxX, x)
        break
      }
      case 'D': {
        y -= count
        minY = Math.min(minY, y)
        break
      }
      case 'U': {
        y += count
        maxY = Math.max(maxY, y)
        break
      }
    }
  }
  return { minX, maxX, minY, maxY }
}

const maybeMoveTail = (headX, headY, tailX, tailY) => {
  if (headX > tailX + 1) {
    tailX++
    headY > tailY ? tailY++ : headY < tailY ? tailY-- : ''
  }
  if (headX < tailX - 1) {
    tailX--
    headY > tailY ? tailY++ : headY < tailY ? tailY-- : ''
  }
  if (headY > tailY + 1) {
    tailY++
    headX > tailX ? tailX++ : headX < tailX ? tailX-- :  ''
  }
  if (headY < tailY - 1) {
    tailY--
    headX > tailX ? tailX++ : headX < tailX ? tailX-- :  ''
  }
  return { tailX, tailY }
}

const moveRope = (rope) => {
  for (let i = 1; i < rope.length; i++) {
    const { tailX, tailY } = maybeMoveTail(rope[i-1][0], rope[i-1][1], rope[i][0], rope[i][1])
    rope[i][0] = tailX
    rope[i][1] = tailY
  }
  return rope
}

const print = (grid) => {
  for (let i = grid.length - 1; i >= 0; i--) {
    const line = grid[i]
    console.log(line.join(''))
  }
}

const printRope = (grid, headX, headY, tailX, tailY) => {
  const newGrid = []
  for (let i = grid.length - 1; i >= 0; i--) {
    const line = grid[i]
    const newLine = line.map(x => '.')
    newGrid.push(newLine)
  }

  newGrid[headY][headX] = 'H'
  newGrid[tailY][tailX] = 'T'
  print(newGrid)
  console.log('\n')
}

const printLongRope = (grid, rope) => {
  return

  const newGrid = []
  for (let i = grid.length - 1; i >= 0; i--) {
    const line = grid[i]
    const newLine = line.map(x => '.')
    newGrid.push(newLine)
  }

  rope.forEach((knot, num) => {
    const [x, y] =  knot
    newGrid[y][x] = num
  })

  print(newGrid)
  console.log('\n')
}

module.exports.answer2 = (input) => {
  const instructions = parseInput(input)
  const { minX, maxX, minY, maxY } = getBoundaries(instructions)

  const line = helpers.times(maxX - minX + 1, i => 0)
  const grid = helpers.times(maxY - minY + 1, i => [...line])

  const rope = helpers.times(10, i => [minX * -1, minY * -1])

  let tail = rope[rope.length-1]
  grid[tail[1]][tail[0]] = 1
  for (const instruction of instructions) {
    const [direction, count] = instruction

    switch(direction) {
      case 'L':
        helpers.times(count, i => {
          rope[0][0]--
          moveRope(rope)
          let tail = rope[rope.length-1]
          grid[tail[1]][tail[0]] = 1
        })
        printLongRope(grid, rope);
        break
      case 'R':
        helpers.times(count, i => {
          rope[0][0]++
          moveRope(rope)
          let tail = rope[rope.length-1]
          grid[tail[1]][tail[0]] = 1
        })
        printLongRope(grid, rope);
        break
      case 'D':
        helpers.times(count, i => {
          rope[0][1]--
          moveRope(rope)
          let tail = rope[rope.length-1]
          grid[tail[1]][tail[0]] = 1
        })
        printLongRope(grid, rope);
        break
      case 'U':
        helpers.times(count, i => {
          rope[0][1]++
          moveRope(rope)
          let tail = rope[rope.length-1]
          grid[tail[1]][tail[0]] = 1
        })
        printLongRope(grid, rope);
        break
    }
  }
  print(grid)
  return grid.flatMap(x => x).reduce((sum, value) => sum + value, 0)
}

module.exports.answer1 = (input) => {
  const instructions = parseInput(input)
  const { minX, maxX, minY, maxY } = getBoundaries(instructions)

  const line = helpers.times(maxX - minX + 1, i => 0)
  const grid = helpers.times(maxY - minY + 1, i => [...line])

  let tailX = minX * -1
  let tailY = minY * -1
  let headX = minX * -1
  let headY = minY * -1
  grid[tailY][tailX] = 1
  for (const instruction of instructions) {
    const [direction, count] = instruction

    switch(direction) {
      case 'L':
        helpers.times(count, i => {
          headX--
          // printRope(grid, headX, headY, tailX, tailY);
          ({tailX, tailY } = maybeMoveTail(headX, headY, tailX, tailY))
          grid[tailY][tailX] = 1
        })
        break
      case 'R':
        helpers.times(count, i => {
          headX++
          // printRope(grid, headX, headY, tailX, tailY);
          ({tailX, tailY } = maybeMoveTail(headX, headY, tailX, tailY))
          grid[tailY][tailX] = 1
        })
        break
      case 'D':
        helpers.times(count, i => {
          headY--
          // printRope(grid, headX, headY, tailX, tailY);
          ({tailX, tailY } = maybeMoveTail(headX, headY, tailX, tailY))
          grid[tailY][tailX] = 1
        })
        break
      case 'U':
        helpers.times(count, i => {
          headY++
          // printRope(grid, headX, headY, tailX, tailY);
          ({tailX, tailY } = maybeMoveTail(headX, headY, tailX, tailY))
          grid[tailY][tailX] = 1
        })
        break
    }
  }
  // print(grid)
  return grid.flatMap(x => x).reduce((sum, value) => sum + value, 0)
}
