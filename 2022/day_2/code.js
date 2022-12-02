const fs = require('fs');

const secondTypeOfResultsMap = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  },
}

const answer2 = (input) => {
  return input.reduce((sum, line) => {
    const [theirs, mine] = line.split(' ')
    return sum + secondTypeOfResultsMap[theirs][mine]
  }, 0)
}

const resultsMap = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  },
}

// I'm not super proud of this approach, but I got it right the first time I 
// ran it which is maybe the first time that has happened in the history 
// of programming
// 
// Turns out it also made part 2 super simple, just had to draw another logic map
const answer1 = (input) => {
  return input.reduce((sum, line) => {
    const [theirs, mine] = line.split(' ')
    return sum + resultsMap[theirs][mine]
  }, 0)
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
