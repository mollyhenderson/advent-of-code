const fs = require('fs');

const answer2 = (input) => {
  const positions = input.sort((x, y) => x - y);

  let cheapest = null;
  for (let i = positions[0]; i < positions[positions.length-1]; i++) {
    // simulate this move
    const cost = positions.reduce((acc, val) => {
      const delta = Math.abs(val - i);
      // (n(n + 1)) / 2, where n = delta - 1
      return acc + ((delta ** 2) - ((delta * (delta - 1)) / 2));
    }, 0);

    if (!cheapest || cost < cheapest) {
      cheapest = cost;
    }
  }
  return cheapest;
}

const answer1 = (input) => {
  const positions = input.sort((x, y) => x - y);

  let cheapest = null;
  for (let i = positions[0]; i < positions[positions.length-1]; i++) {
    // simulate this move
    const cost = positions.reduce((acc, val) => {
      const delta = Math.abs(val - i);
      return acc + delta;
    }, 0);

    if (!cheapest || cost < cheapest) {
      cheapest = cost;
    }
  }
  return cheapest;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split(',');
console.log(answer2(input));
