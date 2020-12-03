const fs = require('fs');

module.exports.readInput = (filename) => {
  const input = fs.readFileSync(filename, { encoding: 'utf8' });
  return input.split('\n');
}

module.exports.readInputAsInts = (filename) => {
  return readInput(filename).map(i => parseInt(i));
}