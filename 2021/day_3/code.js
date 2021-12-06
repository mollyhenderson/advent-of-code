const fs = require('fs');

const getOnesCounts = (input) =>
  input[0].split('')
    .map((_, i) =>
      input.reduce((acc, d) =>
        acc + parseInt(d[i]), 0));

const getGamma = (input) => {
  const total = input.length;
  return getOnesCounts(input)
    .map(count =>
      +(count >= total / 2))
    .join('');
}

const getEpsilon = (input) => {
  const total = input.length;
  return getOnesCounts(input)
    .map(count =>
      +(count < total / 2))
    .join('');
}

const filterList = (input, compareFn) => {
  let list = [...input];
  let i = 0;
  let compareList = compareFn(list);
  while (list.length > 1) {
    list = list.filter(x => x[i] === compareList[i]);
    i += 1;
    compareList = compareFn(list);
  }
  return list[0];
}

const answer2 = (input) => {
  const oxygenRating = parseInt(filterList(input, getGamma), 2);
  const co2Rating = parseInt(filterList(input, getEpsilon), 2);

  return { oxygenRating, co2Rating, answer: oxygenRating * co2Rating };
}

const answer1 = (input) => {
  const gamma = parseInt(getGamma(input), 2);
  const epsilon = parseInt(getEpsilon(input), 2);

  return { gamma, epsilon, answer: gamma * epsilon };
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
