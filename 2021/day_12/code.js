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

const answer1 = (input) => {
  const caves = fillCaves(input);

  const start = caves.getOrAdd('start');
  const end = caves.getOrAdd('end');

  const paths = [];
  let partialPaths = start.connections.map(c => new Path(start, c));
  while(partialPaths.length > 0) {
    const path = partialPaths.pop();
    const next = path.at(-1);
    if (next.equals(end)) {
      paths.push(path);
    } 
    else {
      partialPaths = partialPaths.concat(
        next.connections.map(c => path.newPathWith(c))
        .filter(x => x));
    }
  }
  return paths.length;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));