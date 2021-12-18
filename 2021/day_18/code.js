const fs = require('fs');

const add = (a, b) => {
  const r = `[${a},${b}]`;
  console.log({sum: r})
  return r;
}

const reverse = (str) => {
  return str.split('').reverse().join('');
}

const replaceAt = (str, index, char) => {
  return str.substring(0, index) + char + str.substring(index+1);
}

const explode = (n, i) => {
  console.log('explode time');
  console.log(n.substring(i, i+5));
  const leftNum = parseInt(n[i+1], 10);
  const rightNum = parseInt(n[i+3], 10);

  let leftBit = n.substring(0, i);
  let rightBit = n.substring(i+5);

  const numToLeftIndex = leftBit.length-1 - reverse(leftBit).search(/\d/);
  console.log({numToLeftIndex, i})
  if (numToLeftIndex > -1 && numToLeftIndex < i) {
    const numToLeft = parseInt(n[numToLeftIndex], 10);
    leftBit = replaceAt(leftBit, numToLeftIndex, numToLeft + leftNum);
  }

  const numToRightIndex = rightBit.search(/\d/);
  if (numToRightIndex > -1) {
    const numToRight = parseInt(rightBit[numToRightIndex], 10);
    rightBit = replaceAt(rightBit, numToRightIndex, numToRight + rightNum);
  }

  return leftBit + '0' + rightBit;
}

const condition1 = (n) => {
  console.log('condition 1');
  const q = [];
  let numToLeftIndex = -1;
  for (const [i, c] of n.split('').entries()) {
    if (c === '[') {
      if (q.length === 4) {
        // hit our condition
        const exploded = explode(n, i);
        console.log({exploded})
        return [true, exploded];
      }
      else {
        q.push(c);
      }
    }
    else if (c === ']') {
      q.pop();
    }
  }
  return [false, n];
}

const condition2 = (n) => {
  console.log('condition 2');
  const i = n.search(/\d\d/);
  console.log({i});
  if (i > -1) {
    const num = parseInt(n.substring(i, i+2), 10);
    const split = n.substring(0, i) + add(Math.floor(num/2), Math.ceil(num/2)) + n.substring(i+2);
    console.log({split});
    return [true, split];
  }
  return [false, n];
}

const reduce = (n) => {
  let exploded = true;
  let split = false;
  let i = 0;
  while(exploded || split) {
    ([exploded, n] = condition1(n));
    if (!exploded) {
      ([split, n] = condition2(n));
    }
    i++;
  }
  return n;
}

const answer1 = (input) => {
  return input.slice(1).reduce((sum, n) => reduce(add(sum, n)), input[0]);
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));
