const fs = require('fs');

const getMaxY = (steps) => Math.max(...steps.map(s => s.y));

const render = (steps, target) => {
  const { minX, maxX, minY, maxY } = target;

  const overallMaxY = getMaxY(steps);
  for (let i = overallMaxY; i >= minY; i--) {
    let line = '';
    for (let j = 0; j <= maxX; j++) {
      if (i === 0 && j === 0) line += 'S';
      else if (steps.some(s => s.x === j && s.y === i)) line += '#';
      else if (i <= maxY && j >= minX) line += 'T';
      else line += '.';
    }
    console.log(line);
  }
}

const launch = (xVelocity, yVelocity, target) => {
  let x = y = 0;
  const { minX, maxX, minY, maxY } = target;
  const steps = [];
  while (x < maxX && y > minY) {
    steps.push({x, y});
    x += xVelocity;
    y += yVelocity;
    if (xVelocity > 0) xVelocity -= 1;
    else if (xVelocity < 0) xVelocity += 1;
    yVelocity -= 1;

    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      steps.push({x,y});
      return getMaxY(steps);
    }
  }
  return false;
}

const parseInput = (input) => {
  [, minX, maxX, minY, maxY] = input.match(/target area: x=([\d-]+)\.\.([\d-]+), y=([\d-]+)\.\.([\d-]+)/);
  return { minX, maxX, minY, maxY };
}

const answer2 = (input) => {
  const target = parseInput(input);

  let count = 0;
  // These variables are for debugging purposes
  let maxY = 0;
  let minY = Infinity;
  let maxX = 0;
  let minX = Infinity;
  for (let x = 0; x < 202; x++) {
    for (let y = -109; y < 200; y++) {
      const success = launch(x, y, target);
      if (success !== false) {
        count += 1;
        console.log({x, y, maxX, minX, maxY, minY});
        if (y > maxY) maxY = y;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (x < minX) minX = x;
      }
    }
  }
  return count;
}

const answer1 = (input) => {
  const target = parseInput(input);

  // For test input, these situations all work:
  // 6,1 - 6,9
  // 7,0 - 7,9
  // 8,0 - 8,1
  // 9,0

  // For real input:
  // 19,3 - 19,53 && 19,62 - 19,108
  // 20,1 - 20,3
  // 21,0 - 21,1
  // 22,0

  let maxY = 0;
  const x = 19; // figured out through guess & check
  for (let y = 0; y < 10000; y++) { // let's check a buncha options, just to be safe
    const thisMaxY = launch(x, y, target);
    if (thisMaxY > maxY) {
      maxY = thisMaxY;
      console.log({x, y, maxY})
    }
  }
  return maxY;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
console.log(answer2(f));
