const fs = require('fs');

function answer1(input) {
  return input.reduce((acc, n) => {
    return acc + Math.floor(parseInt(n) / 3) - 2;
  }, 0);
}

function readInput(filename) {
  const input = fs.readFileSync(filename, { encoding: 'utf8' });
  return input.split('\r\n');
}

const input = readInput('2019/day_1/input.txt');

console.log(answer1(input));

