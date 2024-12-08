const { Map, Node } = require('../../utils/helpers')

class NewNode extends Node {
  toString() {
    return 'new'
  }
}

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  const map = new Map(input)
  return map.toString()

  // Plan:
  // group the antennae
  // for each pair:
  //   find distance between them
  //   mark each antinode
  // sum all the nodes
}
