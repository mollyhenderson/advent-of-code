const fs = require('fs');

function calcFuel(n) {
  return Math.max(0, Math.floor(parseInt(n) / 3) - 2);
}

function calcFuelRecursive(n) {
  let sum = 0;
  while(n > 0) {
    n = calcFuel(n);
    sum += n;
  }
  return sum;
}

function answer1(input) {
  return input.reduce((acc, n) => {
    return acc + calcFuel(n);
  }, 0);
}

function answer2(input) {
  return input.reduce((acc, n) => {
    return acc + calcFuelRecursive(n);
  }, 0);
}

function readInput(filename) {
  const input = fs.readFileSync(filename, { encoding: 'utf8' });
  return input.split('\r\n');
}

const input = readInput('input.txt');

console.log(answer2(input));