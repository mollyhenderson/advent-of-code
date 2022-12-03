const { readInput } = require('../day_1/code');

function answer1(inputs, down, right) {
  const arr = inputs.filter((_, index) => index % down === 0);
  let i = -1 * right;
  return arr.reduce((sum, row) => {
    i += right;
    if (i > row.length - 1) {
      i = i - row.length;
    }
    return (row[i] === '#') ? sum + 1 : sum;
  }, 0);
}

function answer2(inputs) {
  let prod = 1;
  const cases = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ];
  for (let [right, down] of cases) {
    const out = answer1(inputs, down, right);
    prod *= out;
  }
  return prod;
}

console.log(answer2(readInput('input.txt')));