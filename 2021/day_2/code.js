const fs = require('fs');

const answer1 = (input) => {
  let x = y = 0;
  input.forEach(instruction => {
    console.log(instruction);
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

const filename = 'input.txt';

const f = fs.readFileSync(filename, 'utf-8');
const input = f.split('\n')
console.log(answer1(input));