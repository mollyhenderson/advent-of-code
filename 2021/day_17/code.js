const fs = require('fs');

const render = (steps, target) => {
  const { minX, maxX, minY, maxY } = target;

  const overallMaxY = Math.max(...steps.map(s => s.y));
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
    render(steps, target);
    return Math.max(...steps.map(s => s.y));
  }
  return false;
}

const parseInput = (input) => {
  [, minX, maxX, minY, maxY] = input.match(/target area: x=([\d-]+)\.\.([\d-]+), y=([\d-]+)\.\.([\d-]+)/);
  return { minX, maxX, minY, maxY };
}

const answer1 = (input) => {
  const target = parseInput(input);
  // TODO: find x,y such that maxY is maximized
  // binary search that mofo?

  // For test input, these situations all work:
  // 6,1 - 6,9
  // 7,0 - 7,9
  // 8,0 - 8,1
  // 9,0

  let maxY = 0;
  for (let i = 6; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      console.log({x: i, y: j});
      maxY = Math.max(maxY, launch(i, j, target));
    }
  }
  return maxY;
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
console.log(answer1(f));
