const { readInput } = require('../../utils');

function answer1(inputs) {
  return inputs.reduce((totalCount, i) => {
    const [, start, end, char, str] = /(\d*)-(\d*) (.): (.*)/.exec(i);
    const count = (str.match(new RegExp(char, 'g'))||[]).length;
    return (count >= start && count <= end) ? totalCount + 1 : totalCount;
  }, 0);
}

function answer2(inputs) {
  return inputs.reduce((totalCount, i) => {
    const [, start, end, char, str] = /(\d*)-(\d*) (.): (.*)/.exec(i);
    const a = str[parseInt(start)-1] === char;
    const b = str[parseInt(end)-1] === char;
    return ((a && !b) || (b && !a)) ? totalCount + 1 : totalCount;
  }, 0);
}

console.log(answer2(readInput('input.txt')));