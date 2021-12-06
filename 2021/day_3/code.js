const fs = require('fs');

const answer1 = (input) => {
  const total = input.length;
  const onesCounts = input[0].split('').map((_, i) => {
    return input.reduce((acc, d) => {
      return acc + parseInt(d[i]);
    }, 0);
  });

  const gamma = parseInt(onesCounts.map(count => {
    return +(count > total / 2);
  }).join(''), 2);

  const epsilon = parseInt(onesCounts.map(count => {
    return +(count <= total / 2);
  }).join(''), 2);

  return { gamma, epsilon, answer: gamma * epsilon };
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
