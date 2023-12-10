const { getLines, getCharacters } = require('../../utils/helpers')

class Node {
  left = false
  right = false
  up = false
  down = false
  isLoop = false
  isFill = false
  isCorner = false

  constructor(char, x, y) {
    this.char = char
    this.x = x
    this.y = y
    switch (char) {
      case '.':
      case 'S':
        return
      case '|':
        this.up = true
        this.down = true
        break
      case '-':
        this.left = true
        this.right = true
        break
      case 'L':
        this.up = true
        this.right = true
        this.isCorner = true
        break
      case 'J':
        this.up = true
        this.left = true
        this.isCorner = true
        break
      case '7':
        this.down = true
        this.left = true
        this.isCorner = true
        break
      case 'F':
        this.down = true
        this.right = true
        this.isCorner = true
        break
      default:
        throw new Error('Char was not handled:', char)
    }
  }

  dirs() {
    return {
      down: this.down,
      left: this.left,
      up: this.up,
      right: this.right,
    }
  }

  toString() {
    return this.isLoop ? this.char : this.isFill ? 'I' : '.'
    // return this.isLoop ? this.num.toString().at(-1) : this.isFill ? 'I' : '.'
  }
}

class Map {
  constructor(input) {
    const lines = getLines(input)
    this.map = lines.map((l, i) =>
      getCharacters(l).map((c, j) => {
        if (c === 'S') {
          this.startX = j
          this.startY = i
        }
        return new Node(c, j, i)
      })
    )
  }

  at(x, y) {
    return this.map[y][x]
  }

  toString() {
    return this.map.map((x) => x.join('')).join('\n')
  }
}

const identifyS = (map) => {
  const x = map.startX
  const y = map.startY
  const s = map.map[y][x]

  const up = map.map[y - 1]?.[x]?.down
  const down = map.map[y + 1]?.[x]?.up
  const left = map.map[y][x - 1]?.right
  const right = map.map[y][x + 1]?.left

  s.up = !!up
  s.down = !!down
  s.left = !!left
  s.right = !!right

  if (s.up && s.down) {}
  else if (s.left && s.right) {}
  else {
    s.isCorner = true
  }
}

const parseInput = (input) => {
  const map = new Map(input)
  identifyS(map)
  return map
}

const getNextDir = (node, prevDir) => {
  if (node.up && prevDir !== 'down') return 'up'
  if (node.right && prevDir !== 'left') return 'right'
  if (node.down && prevDir !== 'up') return 'down'
  if (node.left && prevDir !== 'right') return 'left'
}

getNextLocation = ({ x, y, dir }) => {
  switch (dir) {
    case 'up':
      y--
      break
    case 'right':
      x++
      break
    case 'down':
      y++
      break
    case 'left':
      x--
      break
  }
  return { x, y }
}

const getNodeInDirection = (dir, currNode, map) => {
  const startX = currNode.x
  const startY = currNode.y
  const { x, y } = getNextLocation({ x: startX, y: startY, dir })
  return map.at(x, y)
}

const changeFillDir = (dir, node) => {
  const allDirs = Object.entries(node.dirs())
  if (node[dir]) {
    // concave
    // choose the other yes dir
    return allDirs.find(([thisDir, x]) => thisDir !== dir && x)[0]
  } else {
    // convex
    // choose the other non-dir
    return allDirs.find(([thisDir, x]) => thisDir !== dir && !x)[0]
  }
}

const getLoop = (map) => {
  let x = map.startX
  let y = map.startY

  const loop = []
  let node
  let dir
  do {
    node = map.map[y][x]
    node.isLoop = true
    loop.push(node)

    dir = getNextDir(node, dir)
    ;({ x, y } = getNextLocation({ x, y, dir }))
  } while (y !== map.startY || x !== map.startX)

  return loop
}

const getStartingFillNodes = (loop, map) => {
  const unvisitedLoop = [...loop]
  const res = []

  // the top left will always be an F pipe; search the area below & to the right
  const minY = Math.min(...unvisitedLoop.map((n) => n.y))
  const minX = Math.min(
    ...unvisitedLoop.filter((n) => n.y === minY).map((n) => n.x)
  )
  let node = map.at(minX, minY)
  const removeIndex = unvisitedLoop.findIndex((n) => n === node)
  unvisitedLoop.splice(removeIndex, 1)

  let fillDir = 'right'
  let dir

  const maybeAddNode = (node) => {
    if (!node.isLoop) {
      res.push(node)
    }
  }

  let num = 1

  while (unvisitedLoop.length) {
    node.num = num++

    // Check for fillNode in dir
    const fillNode = getNodeInDirection(fillDir, node, map)
    maybeAddNode(fillNode)

    // Update dir if needed
    if (node.isCorner) {
      // we're changing direction
      fillDir = changeFillDir(fillDir, node)
      // Check for fillNodes in corner & newDir
      const cornerNode = getNodeInDirection(fillDir, fillNode, map)
      const nextFillNode = getNodeInDirection(fillDir, node, map)
      maybeAddNode(cornerNode)
      maybeAddNode(nextFillNode)
    }

    // get next node
    dir = getNextDir(node, dir)
    node = getNodeInDirection(dir, node, map)
    const removeIndex = unvisitedLoop.findIndex((n) => n === node)
    unvisitedLoop.splice(removeIndex, 1)
  }
  node.num = num

  return [...new Set(res)]
}

const getArea = (loop, map) => {
  const nodes = getStartingFillNodes(loop, map)
  nodes.forEach((n) => (n.isFill = true))
  const untraversed = [...nodes]

  while (untraversed.length) {
    const next = untraversed.pop()
    const x = next.x
    const y = next.y
    // check each direction; find any nodes not in loop or nodes
    const indices = [
      { x, y: y + 1 },
      { x, y: y - 1 },
      { x: x + 1, y },
      { x: x - 1, y },
    ]
    const nodesToCheck = indices
      .map(({ x, y }) => map.at(x, y))
      .filter((n) => n && !n.isLoop && !n.isFill)

    nodesToCheck.forEach((n) => (n.isFill = true))
    nodes.push(...nodesToCheck)
    untraversed.push(...nodesToCheck)
  }

  return nodes.length
}

module.exports.answer2 = (input) => {
  const map = parseInput(input)
  const loop = getLoop(map)
  const area = getArea(loop, map)
  console.log(`${map}\n`)
  return area
}

module.exports.answer1 = (input) => {
  const map = parseInput(input)
  const loop = getLoop(map)
  return loop.length / 2
}
