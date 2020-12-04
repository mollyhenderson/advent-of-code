const { readInput } = require('../../utils');

function answer1(inputs) {
  let i = -3;
  return inputs.reduce((sum, row) => {
    i += 3;
    if (i > row.length - 1) {
      i = i - row.length;
    }
    return (row[i] === '#') ? sum + 1 : sum;
  }, 0);
}

function answer2(inputs) {
  
}

console.log(answer1(readInput('input.txt')));