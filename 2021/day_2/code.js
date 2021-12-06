const fs = require('fs');

const answer2 = (input) => {
  let x = y = aim = 0;
  input.forEach(instruction => {
    let [dir, num] = instruction.split(' ');
    num = parseInt(num);
    switch(dir) {
      case 'forward':
        x += num;
        y += aim * num;
        break;
      case 'down':
        aim += num;
        break;
      case 'up':
        aim -= num;
        break;
    }
  });
  return {x, y, aim, total: x * y};
}

const answer1 = (input) => {
  let x = y = 0;
  input.forEach(instruction => {
    let [dir, num] = instruction.split(' ');
    num = parseInt(num);
    switch(dir) {
      case 'forward':
        x += num;
        break;
      case 'down':
        y += num;
        break;
      case 'up':
        y -= num;
        break;
    }
  });
  return {x, y, total: x * y};
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));