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
  while (x < maxX && y > maxY) {
    steps.push({x, y});
    x += xVelocity;
    y += yVelocity;
    if (xVelocity > 0) xVelocity -= 1;
    else if (xVelocity < 0) xVelocity += 1;
    yVelocity -= 1;
  }
  if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
    steps.push({x,y});
    // render(steps, target);
    console.log('✓');
    return getMaxY(steps);
  }
  // render(steps, target);
  return false;
}

const parseInput = (input) => {
  [, minX, maxX, minY, maxY] = input.match(/target area: x=([\d-]+)\.\.([\d-]+), y=([\d-]+)\.\.([\d-]+)/);
  return { minX, maxX, minY, maxY };
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
  for (let x = 19; x < 20; x++) {
    for (let y = 0; y < 10000; y++) {
      const thisMaxY = launch(x, y, target);
      if (thisMaxY > maxY) {
        maxY = thisMaxY;
        console.log({x, y, maxY})
      }
    }
  }
  return maxY;

  // // TEST
  // let maxY = 0;
  // for (let x = 6; x < 10; x++) {
  //   for (let y = 0; y < 10; y++) {
  //     console.log({x, y});
  //     maxY = Math.max(maxY, launch(x, y, target));
  //     console.log(maxY);
  //   }
  // }
  // return maxY;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
console.log(answer1(f));
