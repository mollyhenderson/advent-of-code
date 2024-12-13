const { isEven, times } = require('../../utils/helpers')

class Block {
  constructor(num, isFreeSpace, id) {
    this.num = parseInt(num)
    this.isFreeSpace = isFreeSpace
    if (!isFreeSpace) this.id = id
  }

  toString() {
    const char = this.isFreeSpace ? '.' : this.id
    return times(this.num, () => char).join('')
  }
}

const parseInput = (input) => {
  let arr = []
  let id = 0
  for (let i = 0; i < input.length; i++) {
    const num = parseInt(input[i])
    if (isEven(i)) {
      arr.push(...times(num, () => id))
      id++
    } else {
      arr.push(...times(num, () => null))
    }
  }
  return arr
}

const blocksToString = (blocks) => blocks.map((b) => b.toString()).join('')

module.exports.answer2 = (input) => {
  const blocks = input
    .split('')
    .map((n, i) => new Block(n, i % 2 !== 0, Math.floor(i / 2)))

  console.log(blocksToString(blocks))

  const newBlocks = []
  let prevI = blocks.length - 1
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (i === prevI) {
      console.log('!!!', i)
    }
    prevI = i
    const block = blocks[i]
    // console.log({
    //   block: block.toString(),
    //   blocks: blocksToString(blocks),
    //   newBlocks: blocksToString(newBlocks),
    // })
    if (block.isFreeSpace) {
      newBlocks.unshift(block)
      continue
    }

    let j = 0
    while (j < i) {
      const trialBlock = blocks[j]
      if (trialBlock.isFreeSpace && trialBlock.num >= block.num) {
        blocks[j] = block
        newBlocks.unshift(new Block(block.num, true))

        if (trialBlock.num > block.num) {
          trialBlock.num = trialBlock.num - block.num
          blocks.splice(j + 1, 0, trialBlock)
          i++
        }
        break
      }
      j++
    }
    if (j === i) {
      newBlocks.unshift(block)
    }
  }

  let next = newBlocks.at(-1)
  while (next.isFreeSpace) {
    newBlocks.pop()
    next = newBlocks.at(-1)
  }

  // console.log(blocksToString(newBlocks))

  const arr = blocksToString(newBlocks).split('')

  // console.log(newBlocks.slice(-10))

  return blocksToString(newBlocks)
    .split('')
    .reduce((sum, n, i) => {
      if (n == '.') return sum
      return sum + parseInt(n) * i
    }, 0)
  // 86209591055: too low
}

module.exports.answer1 = (input) => {
  const arr = parseInput(input)
  const newArr = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      // console.log(arr[i])
      newArr.push(arr[i])
    } else {
      let nextElement = arr.pop()
      while (nextElement === null) {
        nextElement = arr.pop()
      }
      // This was a sneaky bug
      if (arr.length < i) break
      // console.log('.', nextElement)
      newArr.push(nextElement)
    }
  }

  return newArr.reduce((sum, n, i) => sum + n * i, 0)
}
