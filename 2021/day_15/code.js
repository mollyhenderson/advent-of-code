const fs = require('fs');
const PriorityQueue = require('./pq');

let id = 0;

class Location {
  constructor(risk) {
    this.risk = parseInt(risk, 10);
    this.adjacents = [];
    this.id = id++;
  }

  addAdjacent(location) {
    this.adjacents.push(location);
  }

  getMinAdjacent() {
    let min = Infinity;
    let index = -1;
    this.adjacents.forEach((a, i) => {
      if (a.risk < min) {
        min = a.risk;
        index = i;
      }
    });
    return this.adjacents[index];
  }

  equals(other) {
    return other.id === this.id;
  }
}

class Path {
  constructor(risk, ...path) {
    this.path = path;
    this._risk = risk;
  }

  last() {
    return this.path[this.path.length-1];
  }

  add(nextLocation) {
    this.path.push(nextLocation);
    this._risk += nextLocation.risk;
    return this;
  }

  contains(location) {
    return this.path.some(l => l.id === location.id);
  }

  newPathWith(location) {
    const clone = new Path(this._risk, ...this.path);
    return clone.add(location);
  }

  risk() {
    return this._risk;
  }
}

// Frankenstein of days 9 & 12
const fillGraph = (input) => {
  const graph = input.map(line => line.split('').map(n => new Location(n))); 
  for (let i = 0; i < graph.length; i++) {
    const line = graph[i];
    for (let j = 0; j < line.length; j++) {
      const location = line[j];
      // if (j > 0) location.addAdjacent(line[j-1]);
      if (j < line.length-1) location.addAdjacent(line[j+1]);
      // if (i > 0) location.addAdjacent(graph[i-1][j]);
      if (i < graph.length-1) location.addAdjacent(graph[i+1][j]);
    }
  }
  return graph;
}

const traverse = (partialPaths, end) => {
  while(!partialPaths.isEmpty()) {
    const path = partialPaths.pop();
    const next = path.last();
    if (next.equals(end)) {
      // success!
      return path;
    } 
    else {
      const nextLocations = next.adjacents.filter(a => !path.contains(a));
      if (nextLocations.includes(end)) return path.add(end);
      partialPaths.push(...nextLocations.map(a => path.newPathWith(a)));
    }
  }
  return 'ohno';
}

const answer1 = (input) => {
  const graph = fillGraph(input).flat();

  const start = graph[0];
  const end = graph[graph.length-1];

  const pq = new PriorityQueue((a, b) => a.risk() < b.risk());
  pq.push(...start.adjacents.map(c => new Path(c.risk, start, c)));

  const path = traverse(pq, end);

  return path.risk();

}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
