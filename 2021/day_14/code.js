const fs = require('fs');

class Rule {
  constructor(line) {
    this.line = line;
    const [pair, element] = line.split(' -> ');
    this.pair = pair.split('');
    this.element = element;
  }

  matches(pair) {
    return this.pair[0] === pair[0] && this.pair[1] === pair[1];
  }
}

const parseInput = (input) => {
  const template = input[0];
  const rules = input.slice(2);

  return {
    template,
    rules: rules.map(r => new Rule(r)),
  }
}

const answer1 = (input) => {
  const STEPS = 10;

  let { template, rules } = parseInput(input);

  for (let i = 0; i < STEPS; i++) {
    const chars = template.split('');
    template = chars[0];
    for (let j = 0; j < chars.length-1; j++) {
      const pair = chars.slice(j, j+2);
      const rule = rules.find(r => r.matches(pair));
      if (rule) template += rule.element;
      template += chars[j+1];
    }
  }
  
  const allElements = new Set(template);
  const countMap = template.split('').reduce((acc, val) => {
    if (!acc[val]) acc[val] = 0;
    acc[val]++;
    return acc;
  }, {});
  const counts = Object.values(countMap);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  return max - min;
}

/*
 * I would like it to be known that everything below this point can be used to solve both parts of today's puzzle.
 * Don't you love it when this silly challenge basically forces you to solve a problem twice?
 * (it was actually very fun but let me act bitter anyway)
 * Thank you for attending my Ted talk
 */

const makeMatrix = (size) => {
  const matrix = [];
  for (let i = 0; i < size; i++) {
    matrix.push(new Array(size).fill(0));
  }
  return matrix;
}

const sum = (arr) => arr.reduce((sum, val) => sum + val, 0);

const answer2 = (input) => {
  const STEPS = 40;

  const template = input[0];
  const rules = input.slice(2);

  const chars = Array.from(
    new Set(rules.join('')
      .split('')
      .filter(c => ![' ', '-', '>'].includes(c))));

  const ruleMatrix = makeMatrix(chars.length);
  rules.forEach(r => {
    const [, one, two, three] = r.match(/(.)(.) -> (.)/);
    ruleMatrix[chars.indexOf(one)][chars.indexOf(two)] = chars.indexOf(three);
  });

  let countMatrix = makeMatrix(chars.length);
  for (let i = 0; i < template.length-1; i++) {
    countMatrix[chars.indexOf(template[i])][chars.indexOf(template[i+1])] += 1;
  }

  for (let i = 0; i < STEPS; i++) {
    const newCountMatrix = makeMatrix(chars.length);
    countMatrix.forEach((row, i) => {
      row.forEach((entry, j) => {
        const mid = ruleMatrix[i][j];

        newCountMatrix[i][mid] += entry;
        newCountMatrix[mid][j] += entry;
      });
    });
    countMatrix = newCountMatrix;
  }
  // sum all pairs that start with a given char
  const finalCounts = countMatrix.map(row => sum(row));
  // and account for the final char
  finalCounts[chars.indexOf(template[template.length-1])]++;

  const max = Math.max(...finalCounts);
  const min = Math.min(...finalCounts);
  return max - min;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
