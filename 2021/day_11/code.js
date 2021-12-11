const fs = require('fs');

let flashes = 0;

class Octopus {
  constructor(energy) {
    this.energy = parseInt(energy, 10);
    this.friends = [];
  }

  addFriend(friend) {
    this.friends.push(friend);
  }

  step() {
    this.energy += 1;
    if (this.energy === 10) {
      flashes += 1;
      this.friends.forEach(f => f.step());
    }
  }

  endStep() {
    if (this.energy > 9) this.energy = 0;
  }

  toString() {
    return this.flashed ? `*${this.energy}*` : this.energy;
  }
}

// pulled from day 9 & added diagonals
const fillGrid = (input) => {
  const grid = input.map(line => line.split('').map(n => new Octopus(n))); 
  for (let i = 0; i < grid.length; i++) {
    const line = grid[i];
    for (let j = 0; j < line.length; j++) {
      const octopus = line[j];
      if (j > 0) octopus.addFriend(line[j-1]);
      if (j < line.length-1) octopus.addFriend(line[j+1]);
      if (i > 0) octopus.addFriend(grid[i-1][j]);
      if (i < grid.length-1) octopus.addFriend(grid[i+1][j]);

      if (j > 0 && i > 0) octopus.addFriend(grid[i-1][j-1]);
      if (j > 0 && i < grid.length-1) octopus.addFriend(grid[i+1][j-1]);
      if (j < line.length-1 && i > 0) octopus.addFriend(grid[i-1][j+1]);
      if (j < line.length-1 && i < grid.length-1) octopus.addFriend(grid[i+1][j+1]);
    }
  }
  return grid;
}

const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i+=10) {
    console.log(grid.slice(i, i+10).map(o => o.toString()).join(''));
  }
  console.log();
}

const answer1 = (input) => {
  const STEP_COUNT = 100;
  const grid = fillGrid(input).flat()
  
  for (let i = 0; i < STEP_COUNT; i++) {
    grid.forEach(o => o.step());
    grid.forEach(o => o.endStep());
  }

  return flashes;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));