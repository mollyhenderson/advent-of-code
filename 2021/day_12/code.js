const fs = require('fs');

class Path {
  constructor(...path) {
    this.path = path;
  }

  get(cave) {
    return this.path.find(c => c.equals(cave));
  }

  at(index) {
    return index > 0 ? this.path[index] : this.path[this.path.length + index];
  }

  add(caveToAdd) {
    const existingCave = this.get(caveToAdd);
    // invalid add
    if (existingCave && existingCave.small) return false;
    this.path.push(existingCave ?? caveToAdd);
    return this;
  }

  newPathWith(cave) {
    const clone = new Path(...this.path);
    return clone.add(cave);
  }
}

class Path2 {
  constructor(canVisitTwice, ...path) {
    this.path = path;
    this.canVisitTwice = canVisitTwice;
  }

  get(cave) {
    return this.path.find(c => c.equals(cave));
  }

  at(index) {
    return index > 0 ? this.path[index] : this.path[this.path.length + index];
  }

  add(caveToAdd) {
    const existingCave = this.get(caveToAdd);
    if (existingCave) {
      if (existingCave.small && this.canVisitTwice !== existingCave.name) return false;
      if (this.canVisitTwice === existingCave.name && (this.path.filter(c => c.equals(existingCave)).length > 1)) return false;
    }
    this.path.push(existingCave ?? caveToAdd);
    return this;
  }

  newPathWith(cave) {
    const clone = new Path2(this.canVisitTwice, ...this.path);
    return clone.add(cave);
  }

  toString() {
    return this.path.map(c => c.name).join(',');
  }
}

class Cave {
  constructor(name) {
    this.name = name;
    this.small = this.name.toLowerCase() === this.name;
    this.connections = [];
  }

  addConnection(cave) {
    this.connections.push(cave);
  }

  equals(other) {
    return this.name === other.name;
  } 
}

class CaveList {
  constructor(...caves) {
    this.caves = caves;
  }

  getOrAdd(name) {
    let cave = this.caves.find(c => c.name === name);
    if (!cave) {
      cave = new Cave(name);
      this.caves.push(cave);
    }
    return cave;
  }

  smallCaves() {
    return this.caves.filter(c => c.small && c.name !== 'start' && c.name !== 'end');
  }
}

const fillCaves = (input) => {
  const caves = new CaveList();
  input.forEach(path => {
     const [name1, name2] = path.split('-');
     const cave1 = caves.getOrAdd(name1);
     const cave2 = caves.getOrAdd(name2);
     cave1.addConnection(cave2);
     cave2.addConnection(cave1);
  });
  return caves;
}

const traverse = (partialPaths) => {
  const paths = [];
  while(partialPaths.length > 0) {
    const path = partialPaths.pop();
    const next = path.at(-1);
    if (next.name === 'end') {
      paths.push(path);
    } 
    else {
      partialPaths = partialPaths.concat(
        next.connections.map(c => path.newPathWith(c))
        .filter(x => x));
    }
  }
  return paths;
}

const answer2 = (input) => {
  const caves = fillCaves(input);

  const start = caves.getOrAdd('start');
  const smallCaves = caves.smallCaves();
  let partialPaths = start.connections.map(c => {
    return smallCaves.map(canVisitTwice => 
      new Path2(canVisitTwice.name, start, c));
  }).flat();

  const paths = traverse(partialPaths);
  const pathStrings = paths.map(p => p.toString());
  return (new Set(pathStrings)).size;
}

const answer1 = (input) => {
  const caves = fillCaves(input);

  const start = caves.getOrAdd('start');
  let partialPaths = start.connections.map(c => new Path(start, c));
  const paths = traverse(partialPaths);
  return paths.length;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));