const fs = require('fs');

const REQUIRED_OVERLAPS = 12;

let id = 0;

const round = (n) => Math.round(n * 100) / 100;

const arraysMatch = (a, b) => a.length === b.length && a.every(x => b.includes(x));

class Distance {
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(other) {
    return arraysMatch([this.x, this.y, this.z], [other.x, other.y, other.z]);
  }
}

class Beacon {
  constructor(x,y,z=0) {
    this.x = parseInt(x, 10);
    this.y = parseInt(y, 10);
    this.z = parseInt(z, 10);
    this.neighbors = [];
    this.distances = [];
  }

  addNeighbor(n) {
    const x = Math.abs(this.x - n.x);
    const y = Math.abs(this.y - n.y);
    const z = Math.abs(this.z - n.z);
  
    this.neighbors.push(n);
    this.distances.push(new Distance(x,y,z));
  }

  hasXOverlappingNeighbors(other) {
    // if this & other have 12 matching neighbor distances,
    // we can assume they represent the same beacon
    const matchingNeighbors = this.neighbors.filter((_, i) => {
      const dist = this.distances[i];
      return other.distances.some(d => d.equals(dist));
    });
    return matchingNeighbors.length >= REQUIRED_OVERLAPS-1;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }
}

class Scanner {
  constructor() {
    this.id = id++;
    this.beacons = [];
  }

  updateNeighbors() {
    // add each beacon as a neighbor of each other beacon
    for (let i = 0; i < this.beacons.length; i++) {
      for (let j = i+1; j < this.beacons.length; j++) {
        this.beacons[i].addNeighbor(this.beacons[j]);
        this.beacons[j].addNeighbor(this.beacons[i]);
      }
    }
  }

  addBeacon(x,y,z) {
    this.beacons.push(new Beacon(x,y,z));
  }

  overlaps(other) {
    for (const a of this.beacons) {
      for (const b of other.beacons) {
        if (a.hasXOverlappingNeighbors(b)) return true;
      }
    }
    return false;
  }

  equals(other) {
    return this.id === other.id;
  }

  // just for the smol example
  toString() {
    let finalString = '';

    const xs = this.beacons.map(b => b.x);
    const ys = this.beacons.map(b => b.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    for (let i = minY; i <= maxY; i++) {
      const line = ['\n'];
      for (let j = minX; j <= maxX; j++) {
        line.push(this.beacons.some(b => b.x === j && b.y === i) ? 'B' : '.');
      }
      finalString += line.join('');
    }
    return finalString;
  }
}

const findPairs = (scanners) => {
  const pairs = [];
  for (let i = 0; i < scanners.length; i++) {
    const a = scanners[i];
    for (let j = i+1; j < scanners.length; j++) {
      const b = scanners[j];
      console.log(`Checking scanners ${a.id} and ${b.id}`);
      // check for overlapping detection regions
      if (a.overlaps(b)) {
        // found a pair
        console.log('✓');
        pairs.push([a,b]);
      } else {
        console.log('x');
      }
    }
  }
  return pairs;
}

const parseInput = (input) => {
  let scanners = [];
  let scanner;
  for (const line of input) {
    if (!line.length) {
      scanners.push(scanner);
      continue;
    };
    if (/--- scanner \d ---/.test(line)) {
      scanner = new Scanner();
      continue;
    }
    const [,x,y,z] = line.match(/([-\d]+),([-\d]+),([-\d]+)/);
    scanner.addBeacon(x,y,z);
  }
  scanners.push(scanner);
  return scanners;
}

const answer1 = (input) => {
  const scanners = parseInput(input);
  scanners.forEach(s => s.updateNeighbors());
  
  const pairs = findPairs(scanners);
  return pairs;
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
