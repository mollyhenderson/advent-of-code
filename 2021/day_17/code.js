const fs = require('fs');

const render = (x, y, target) => {
  const { minX, maxX, minY, maxY } = target;
  for (let i = Math.max(0, y); i >= minY; i--) {
    let line = '';
    for (let j = 0; j <= maxX; j++) {
      if (i === 0 && j === 0) line += 'S';
      else if (i === y && j === x) line += '#';
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
    x += xVelocity;
    y += yVelocity;
    if (xVelocity > 0) xVelocity -= 1;
    else if (xVelocity < 0) xVelocity += 1;
    yVelocity -= 1;
    // render(x, y, target);
    steps.push({x, y});
  }
  if (x >= minX && x <= maxX && y >= minY && y <= maxY) return Math.max(...steps.map(s => s.y));
  return false;
}

const parseInput = (input) => {
  [, minX, maxX, minY, maxY] = input.match(/target area: x=([\d-]+)\.\.([\d-]+), y=([\d-]+)\.\.([\d-]+)/);
  return { minX, maxX, minY, maxY };
}

const answer1 = (input) => {
  const target = parseInput(input);
  // TODO: find x,y such that maxY is maximized
  let x = 7;
  let y = 2;
  const maxY = launch(x, y, target);
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
// const input = f.split('\n');
console.log(answer1(f));