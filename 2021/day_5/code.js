const fs = require('fs');

const orderVals = (y1, y2) => {
  if (y1 > y2) return [y2, y1];
  return [y1, y2];
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coverage = 0;
  }

  addCoverage() {
    this.coverage += 1;
  }

  toString() {
    return this.coverage || '.';
  }
}

class Map {
  constructor() {
    this.map = [];
  }

  markLine(x1, y1, x2, y2) {
    if (x1 === x2) {
      const x = x1;
      // vertical
      [y1, y2] = orderVals(y1, y2);
      for (let i = y1; i <= y2; i++) {
        const arr = this.map[i] ?? [];
        if (!arr[x]) {
          arr[x] = new Point(x, i);
        }
        arr[x].addCoverage();
        this.map[i] = arr;
      }
    }
    else if (y1 === y2) {
      const y = y1;
      // horizontal
      [x1, x2] = orderVals(x1, x2);
      const arr = this.map[y] ?? [];
      for (let i = x1; i <= x2; i++) {
        if (!arr[i]) {
          arr[i] = new Point(i, y);
        }
        arr[i].addCoverage();
      }
      this.map[y] = arr;
    }
  }

  getOverlaps() {
    return this.map
    .flat()
    .filter(point => 
      point?.coverage > 1)
    .length;
  }

  toString() {
    return this.map
    .map(row => row.join(' '))
    .join('\n');
  }
}

const parseLines = (input) => {
  return input.map(line => {
    return line.split(/[,\s->]+/g).map(x => parseInt(x, 10));
  });
}

const answer1 = (input) => {
  const lines = parseLines(input);

  const map = new Map();
  lines.forEach(line => map.markLine(...line));

  // console.log(map.toString());
  return map.getOverlaps();
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
