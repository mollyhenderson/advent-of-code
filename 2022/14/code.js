const helpers = require('../../utils/helpers')

const print = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i]
    console.log(line.join(''))
  }
}

const getRocks = (input) => {
  const lines = helpers.getLines(input)

  const rocks = []
  for (let line of lines) {
    const coords = []

    let nextSpace = line.indexOf(' ')
    while (nextSpace !== -1) {
      const [x, y] = line.slice(0, nextSpace).split(',')
      line = line.slice(nextSpace + 4)
      coords.push([helpers.int(x), helpers.int(y)])
      nextSpace = line.indexOf(' ')
    }
    coords.push(line.split(',').map(n => helpers.int(n)))
    rocks.push(coords)
  }
  return rocks
}

const getGrid = (puzzle) => {


  return grid
}

const parseInput2 = (input) => {
  return parseInput(input, 2)
}

const parseInput = (input, puzzle = 1) => {
  const rocks = getRocks(input)

  const allX = rocks.flatMap(x => x).map(([x,]) => x)
  const allY = rocks.flatMap(x => x).map(([,y]) => y)

  const minY = 0
  const maxY = Math.max(...allY)
  const minX = Math.min(500-maxY, ...allX)
  const maxX = Math.max(500+maxY, ...allX)

  let grid
  let xOffset
  if (puzzle === 1) {
    xOffset = minX
    grid = helpers.times(maxY + 1, () => 
    helpers.times(maxX - minX + 1, () => 
      '.'))
  } else {
    // These numbers are ridiculous and not necessary
    // But it _works_
    xOffset = minX - Math.ceil((maxY - minY) / 2)
    const xLength = (maxX - minX + 1) + (maxY - minY * 3 + 2)
    grid = helpers.times(maxY + 2, () =>
    helpers.times(xLength, () => 
      '.'))
    
    grid[grid.length] = helpers.times(xLength, () => '#')
  }
  
  for (const rock of rocks) {
    for (let i = 0; i < rock.length - 1; i++) {
      // this represents a straight line btwn coords
      let [startX, startY] = rock[i]
      let [endX, endY] = rock[i+1]

      // whoa this is...janky?
      while (startX > endX) {
        grid[startY][startX-xOffset] = '#'
        startX--
      }
      while (startX < endX) {
        grid[startY][startX-xOffset] = '#'
        startX++
      }
      while (startY > endY) {
        grid[startY][startX-xOffset] = '#'
        startY--
      }
      while (startY < endY) {
        grid[startY][startX-xOffset] = '#'
        startY++
      }
      grid[endY][endX-xOffset] = '#'
    }
  }

  return { grid, xOffset }
}

const fall = (grid, x, y) => {
  while (grid[y+1]?.[x] === '.') {
    y++
  }

  if (!grid[y+1]) return false
  if (!grid[y+1][x-1]) return false

  if (grid[y+1][x-1] === '.') return fall(grid, x-1, y+1)
  else if (grid[y+1][x+1] === '.') return fall(grid, x+1, y+1)

  return [x, y]
}

const dropSandUnit = (grid, from) => {
  const [x, y] = from
  return fall(grid, x, y)
}

const fallSand = (grid, from) => {
  let count = 0

  while (true) {
    const res = dropSandUnit(grid, from)
    if (!res) break

    const [x, y] = res
    grid[y][x] = 'o'
    count++
    if (res[0] === from[0] && res[1] === from[1]) break
  }

  print(grid)
  
  return count
}

module.exports.answer2 = (input) => {
  const {grid, xOffset} = parseInput2(input)
  print(grid)
  return fallSand(grid, [500-xOffset, 0])
}

module.exports.answer1 = (input) => {
  const {grid, xOffset} = parseInput(input)
  print(grid)
  return fallSand(grid, [500-xOffset, 0])
}
