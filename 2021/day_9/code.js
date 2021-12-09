const fs = require('fs');

// Assign an id for debugging purposes
let id = 0;

class Location {
  constructor(height) {
    this.height = parseInt(height, 10);
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
    this.id = id++;
  }

  adjacents() {
    return [this.up, this.down, this.left, this.right].filter(x => x);
  }

  isLowPoint() {
    return this.adjacents()
      .every(a => this.height < a.height);
  }

  toString() {
    return this.isLowPoint() ? 
      `*${this.height}* (${this.up}, ${this.down}, ${this.left}, ${this.right})` :
      this.height;
  }
}

const growBasin = (point, basin=[], visited=[]) => {
  visited.push(point);
  if (point.height === 9) {
    return [basin, visited];
  }
  basin.push(point);
  for (a of point.adjacents()) {
    if (!visited.includes(a)) {
      ([basin, visited] = growBasin(a, basin, visited));
    }
  }
  return [basin, visited];
}

const answer2 = (input) => {
  const graph = fillGraph(input);
  const lowPoints = graph.flat().filter(l => l.isLowPoint());
  const basins = lowPoints.map(point => growBasin(point)[0]);

  const sorted = basins.sort((b1, b2) => b2.length - b1.length).map(b => b.length);
  return sorted[0] * sorted[1] * sorted[2];
}

const fillGraph = (input) => {
  const graph = input.map(line => line.split('').map(n => new Location(n))); 
  for (let i = 0; i < graph.length; i++) {
    const line = graph[i];
    for (let j = 0; j < line.length; j++) {
      const location = line[j];
      if (j > 0) location.left = line[j-1];
      if (j < line.length-1) location.right = line[j+1];
      if (i > 0) location.up = graph[i-1][j];
      if (i < graph.length-1) location.down = graph[i+1][j];
    }
  }
  return graph;
}

const answer1 = (input) => {
  return fillGraph(input)
    .flat()
    .filter(l => l.isLowPoint())
    .reduce((sum, location) => sum + 1 + location.height, 0);
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
