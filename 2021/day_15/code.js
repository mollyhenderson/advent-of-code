const fs = require('fs');
const PriorityQueue = require('./pq');

let id = 0;

class Location {
  constructor(risk) {
    this.risk = parseInt(risk, 10);
    this.adjacents = [];
    this.id = id++;

    this.isEnd = false;

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

      if (i === graph.length-1 || j === line.length-1) location.isEnd = true;
    }
  }
  return graph;
}

const buildNewInput = (input) => {
  const newInput = [];

  for (let i = 0; i < 5; i++) {
    input.forEach((line) => {
      let newLine = '';
      for (let j = 0; j < 5; j++) {
        const incremented = line.split('').map(c => {
          const num = parseInt(c, 10);
          let newNum = num + i + j;
          if (newNum > 9) newNum = newNum - 9;
          newLine += newNum;
        });
      }
      newInput.push(newLine);
    });
  }

  return newInput;
}

const traverse = (locations, end) => {
  while(locations.length) {
    let index = -1;
    let minDist = Infinity;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].dist < minDist) {
        index = i;
        minDist = locations[i].dist;
      }
    }
    const [location] = locations.splice(index, 1);
    location.visited = true;
    if (location.isEnd) {
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

const answer2 = (input) => {
  // maybe do this until we reach the end?
  return answer1(input);
  // return answer1(buildNewInput(input));
}

const answer1 = (input) => {
  const graph = fillGraph(input).flat();

  const start = graph[0];
  const end = graph[graph.length-1];

  start.dist = 0;

  const lastInPath = traverse(graph, end);
  console.log(lastInPath);
  return lastInPath.dist;
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
