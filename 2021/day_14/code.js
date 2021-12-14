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
  const max = Math.max(...Object.values(countMap));
  const min = Math.min(...Object.values(countMap));
  return max - min;
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
