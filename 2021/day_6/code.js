const fs = require('fs');

class Lanternfish {
  constructor(initialVal) {
    this.timer = initialVal ?? 8;
  }

  newDay() {
    this.timer -= 1;
    if (this.timer < 0) {
      this.timer = 6;
      return new Lanternfish();
    }
  }
}

const calculateImpact = (timer, days) => {
  let sum = 1;
  if (days < timer) {
    return sum;
  }

  for (let i = (days-timer); i > 0; i -= 7) {
    sum += calculateImpact(9, i);
  }
  return sum;
}

const answer2AfterSomeHelp = (input) => {
  const DAYS = 256;

  const ages = new Array(9).fill(0);
  input.forEach(i => ages[parseInt(i, 10)] += 1);

  for (let i = 0; i < DAYS; i++) {
    const newbies = ages.shift();
    ages.push(newbies);
    ages[6] += newbies;
  }

  return ages.reduce((sum, n) => sum + n, 0);
}

const answer2 = (input) => {
  const DAYS = 256;

  let total = 0;
  input.forEach(i => {
    const impact = calculateImpact(parseInt(i, 10), DAYS);
    console.log({impact});
    total += impact;
  });
  return total;
}

const answer1 = (input) => {
  const DAYS = 80;

  let fish = input.map(i => new Lanternfish(parseInt(i, 10)));
  for (let i = 0; i < DAYS; i++) {
    const newFish = fish.map(f => f.newDay()).filter(x => x);
    fish = fish.concat(newFish);
  }
  return fish.length;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split(',');
console.log(answer2AfterSomeHelp(input));
