const fs = require('fs');

const openingChars = ['(', '[', '{', '<'];
const closingChars = [')', ']', '}', '>'];

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const answer2 = (input) => {
  const scores = [];
  input.forEach(line => {
    let score = 0;
    let q = [];
    for (const c of line.split('')) {
      if (openingChars.includes(c)) {
        q.push(c);
      } else {
        const lastOpening = q.pop();
        if (openingChars.indexOf(lastOpening) !== closingChars.indexOf(c)) {
          // corrupt line; skip
          return;
        }
      }
    }
    // update score for each leftover char
    q.reverse().forEach(c => {
      score *= 5;
      score += openingChars.indexOf(c) + 1;
    });
    scores.push(score);
  });
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
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
console.log(answer2(input));
