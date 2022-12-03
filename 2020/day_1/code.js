const fs = require('fs');

function answer1(input) {
  for (let i of input) {
    const theOtherOne = input.find(j => i+j === 2020);
    if (theOtherOne) {
      return i * theOtherOne;
    }
  }
}

function answer2(input) {
  for (let i of input) {
    for (let j of input) {
      for (let k of input) {
        if (i + j + k === 2020) {
          return i * j * k;
        }
      }
    }
  }
}

export function readInput(filename) {
  const input = fs.readFileSync(filename, { encoding: 'utf8' });
  return input.split('\n');
}

export function readInputAsInts(filename) {
  return readInput(filename).map(i => parseInt(i));
}

const input = readInputAsInts('input.txt');

console.log(answer2(input));