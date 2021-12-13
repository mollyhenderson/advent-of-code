const fs = require('fs');

const DIRECTIONS = {
  UP: 'UP',
  LEFT: 'LEFT',
} 

class Point {
  constructor(x, y) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

class Fold {
  constructor(instruction) {
    const [,axis, value] = instruction.match(/.*([xy])=(\d+)/);
    this.axis = axis;
    this.value = value;
    this.direction = axis === 'x' ? DIRECTIONS.LEFT : DIRECTIONS.UP;
  }

  perform(points) {
    switch (this.direction) {
      case DIRECTIONS.UP:
        { // apparently cases don't get their own scopes,
          // so this is a weird workaround so I can use the same variable names
          const allGood = points.filter(p => p.y < this.value);
          const toMove = points.filter(p => p.y > this.value);
          const moved = toMove.map(p => new Point(p.x, this.value-(p.y-this.value)));
          return allGood.concat(moved);
        }
      case DIRECTIONS.LEFT:
        {
          const allGood = points.filter(p => p.x < this.value);
          const toMove = points.filter(p => p.x > this.value);
          const moved = toMove.map(p => new Point(this.value-(p.x-this.value), p.y));
          return allGood.concat(moved);
        }
    }
  }
}

const parseInput = (input) => {
  const midLine = input.findIndex(l => !l);
  const points = input.slice(0, midLine);
  const folds = input.slice(midLine+1);

  return {
    points: points.map(p => new Point(...p.split(','))),
    folds: folds.map(f => new Fold(f)),
  }
}

const draw = (points) => {
  const maxX = Math.max(...points.map(p => p.x));
  const maxY = Math.max(...points.map(p => p.y));

  for (let i = 0; i <= maxY; i++) {
    const line = [];
    for (let j = 0; j <= maxX; j++) {
      const char = points.find(p => p.x === j && p.y === i) ? '#' : '.';
      line.push(char);
    }
    console.log(line.join(''));
  }
}

const answer2 = (input) => {
  let { points, folds } = parseInput(input);
  folds.forEach(f => points = f.perform(points));
  return draw(points);
}

const answer1 = (input) => {
  const { points, folds } = parseInput(input);
  const newPoints = folds[0].perform(points);
  return new Set(newPoints.map(p => p.toString())).size;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));