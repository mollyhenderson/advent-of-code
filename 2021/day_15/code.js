const fs = require('fs');
const PriorityQueue = require('./pq');

let id = 0;

class Location {
  constructor(risk) {
    this.risk = parseInt(risk, 10);
    this.adjacents = [];
    this.id = id++;

    this.visited = false;
    this.prev = null;
    this.dist = Infinity;
  }

  addAdjacent(location) {
    this.adjacents.push(location);
  }

  equals(other) {
    return other.id === this.id;
  }
}

// Frankenstein of days 9 & 12
const fillGraph = (input) => {
  const graph = input.map(line => line.split('').map(n => new Location(n))); 
  for (let i = 0; i < graph.length; i++) {
    const line = graph[i];
    for (let j = 0; j < line.length; j++) {
      const location = line[j];
      if (j > 0) location.addAdjacent(line[j-1]);
      if (j < line.length-1) location.addAdjacent(line[j+1]);
      if (i > 0) location.addAdjacent(graph[i-1][j]);
      if (i < graph.length-1) location.addAdjacent(graph[i+1][j]);
    }
  }
  return graph;
}

const traverse = (locations, end) => {
  while(locations.length) {
    const location = locations.sort((a, b) => a.dist - b.dist).shift();
    // console.log(locations.map(l => l.dist).join(','));
    location.visited = true;
    if (location.equals(end)) {
      // success!
      return location;
    }
    else {
      const nextLocations = location.adjacents.filter(a => !a.visited);
      nextLocations.forEach(l => {
        const alt = location.dist + l.risk;
        if (alt < l.dist) {
          l.dist = alt;
          l.prev = location;
        }
      });
    }
  }
  return 'ohno';
}

const answer1 = (input) => {
  const graph = fillGraph(input).flat();

  const start = graph[0];
  const end = graph[graph.length-1];

  start.dist = 0;

  const lastInPath = traverse(graph, end);

  return lastInPath.dist;

}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
