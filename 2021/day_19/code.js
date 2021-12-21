const fs = require('fs');

const REQUIRED_OVERLAPS = 12;

let id = 0;

// const round = (n) => Math.round(n * 100) / 100;

const arraysMatch = (a, b) => a.length === b.length && a.every(x => b.includes(x));

const coordsToString = (x,y,z) => `${x},${y},${z}`;

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

class Transformation {
  // overlaps is a list of tuples [a1 ... aN]
  // where a[0] is a beacon and a[1] is an equivalent beacon
  // in a different coordinate system 
  // (and a[1] is the one we want to transform)
  constructor(overlaps) {
    console.log('Getting transformations');
    console.log(overlaps)
    const correct = overlaps[0][0];
    const toChange = overlaps[0][1];

    // TODO: determine this mapping
    this.xLabel = 'somethingWentWrong';
    this.yLabel = 'somethingWentWrong';
    this.zLabel = 'somethingWentWrong';

    for (const correctDir of ['x', 'y', 'z']) {
      for (const toChangeDir of ['x', 'y', 'z']) {
        const diff = correct[correctDir] - toChange[toChangeDir];
        // console.log({diff, overlaps})
        if (overlaps.every(([a, b]) => b + diff === a)) {
          console.log(`${toChangeDir} should change to ${correctDir}`);
          this[`${toChangeDir}Label`] = correctDir;
        }
      }
    }

    // These aren't right; they depend on rotation
    this[this.xLabel] = correct.x - toChange[this.xLabel];
    this[this.yLabel] = correct.y - toChange[this.yLabel];
    this[this.zLabel] = correct.z - toChange[this.zLabel];
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

  getOverlappingNeighbors(other) {
    // const mine = [this];
    // const theirs = [other];

    // this.neighbors.forEach((n, i) => {
    //   const dist = this.distances[i];
    //   const matchingNeighbor = other.neighbors.find((n, i) => other.distances[i].equals(dist));
    //   if (matchingNeighbor) {
    //     mine.push(n);
    //     theirs.push(matchingNeighbor);
    //   }
    // });
    // return [mine, theirs];

    const matchingNeighbors = this.neighbors.map((n, i) => {
      const dist = this.distances[i];
      const matchingNeighbor = other.neighbors.find((n, i) => other.distances[i].equals(dist));
      if (!matchingNeighbor) return false;
      return [n, matchingNeighbor];
    }).filter(x => x);

    matchingNeighbors.push([this, other]);
    return matchingNeighbors;
  }

  apply(t) {
    this[t.xLabel] = this.x + t.x;
    this[t.yLabel] = this.y + t.y;
    this[t.zLabel] = this.z + t.z;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  toString() {
    return coordsToString(this.x, this.y, this.z);
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

  updateCoordSystem(transformation) {
    this.beacons.forEach(b => b.apply(transformation));
  }

  getRequiredTransformation(other) {
    for (const a of this.beacons) {
      for (const b of other.beacons) {
        const overlaps = a.getOverlappingNeighbors(b);
        if (overlaps.length >= REQUIRED_OVERLAPS) {
          return new Transformation(overlaps);
        }
      }
    }
    return false;
  }

  equals(other) {
    return this.id === other.id;
  }

  // // just for the smol example
  // toString() {
  //   let finalString = '';

  //   const xs = this.beacons.map(b => b.x);
  //   const ys = this.beacons.map(b => b.y);
  //   const minX = Math.min(...xs);
  //   const maxX = Math.max(...xs);
  //   const minY = Math.min(...ys);
  //   const maxY = Math.max(...ys);
  //   for (let i = minY; i <= maxY; i++) {
  //     const line = ['\n'];
  //     for (let j = minX; j <= maxX; j++) {
  //       line.push(this.beacons.some(b => b.x === j && b.y === i) ? 'B' : '.');
  //     }
  //     finalString += line.join('');
  //   }
  //   return finalString;
  // }
}

const standardize = (scanners) => {
  // put all beacons in the coord system of scanner 0
  let standardized = [0];
  let nonStandardized = [...Array(scanners.length).keys()].slice(1);
  const pairsToCheck = scanners.flatMap((_, i) =>
      scanners.map((_, j) => [i, j])).filter(([i,j]) => i !== j);

  while (standardized.length < scanners.length) {
    // check for overlap between a standardized & non-standardized scanner
    const [aIndex, bIndex] = pairsToCheck.shift();
    if (!standardized.includes(aIndex) || !nonStandardized.includes(bIndex)) {
      // not ready for this one just yet
      pairsToCheck.push([aIndex,bIndex]);
      continue;
    }

    const a = scanners[aIndex];
    const b = scanners[bIndex];
    console.log(`Checking scanners ${a.id} and ${b.id}`);
    // check for overlapping detection regions
    const transformation = a.getRequiredTransformation(b);
    if (transformation) {
      // put b in the coord system of scanner 0
      b.updateCoordSystem(transformation);
      
      standardized.push(bIndex);
      nonStandardized = nonStandardized.filter(s => s !== bIndex);
    }
  }
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
  standardize(scanners);

  return new Set(scanners.flatMap(s => s.beacons.map(b => b.toString()))).size
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
