const fs = require('fs');

const openingChars = ['(', '[', '{', '<'];
const closingChars = [')', ']', '}', '>'];

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const answer1 = (input) => {
  let score = 0;
  const q = [];
  input.forEach(line => {
    line.split('').forEach(c => {
      if (openingChars.includes(c)) {
        q.push(c);
      } else {
        const lastOpening = q.pop();
        if (openingChars.indexOf(lastOpening) !== closingChars.indexOf(c)) {
          // got our corrupt char!
          score += scoreMap[c];
        }
      }
    });
  });
  return score;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
