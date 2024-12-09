const { isEven, times } = require('../../utils/helpers')

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

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
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
