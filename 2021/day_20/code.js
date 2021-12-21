const fs = require('fs');

const getBlankPixel = (i) => new Pixel(i % 2 === 0 ? '.' : '#');

class Pixel {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
  }

  update(algorithm) {
    const indexString = this.neighbors.map(n => n.value).map(p => p === '.' ? '0' : '1').join('');
    let index = parseInt(indexString, 2);

    return new Pixel(algorithm[index]);
  }

  add(values) {
    this.neighbors = this.neighbors.concat(values);
  }

  neighborsToString() {
    return this.neighbors.map(n => n.value).join('');
  }

  toString() {
    return this.value;
  }
}

const imageToString = (image) => image.map(line => line.map(p => p.toString()).join('')).join('\n');

const litPixelCount = (image) => image.reduce((sum, l) => sum + l.filter(p => p.value === '#').length, 0);

const update = (image, algorithm) => {
  const newImage = [];
  for (let i = 0; i < image.length; i++) {
    const line = image[i];
    const newLine = [];
    for (let j = 0; j < line.length; j++) {
      newLine.push(line[j].update(algorithm));
    }
    newImage.push(newLine);
  }
  return newImage;
}

const getBlankLine = (len, iteration) => new Array(len).fill(0).map(_ => getBlankPixel(iteration));

const setValues = (image, iteration) => {
  image = image.map(line => {
    for (let i = 0; i < 3; i++) {
      line.unshift(getBlankPixel(iteration));
      line.push(getBlankPixel(iteration));
    }
    return line;
  });

  for (let i = 0; i < 3; i++) {
    image.unshift(getBlankLine(image[0].length, iteration));
    image.push(getBlankLine(image[0].length, iteration));
  }

  // update neighbors
  for (let i = 1; i < image.length-1; i++) {
    const prevLine = image[i-1];
    const line = image[i];
    const nextLine = image[i+1];
    for (let j = 1; j < line.length-1; j++) {
      const pixel = line[j];

      pixel.add(prevLine.slice(j-1, j+2));
      pixel.add(line.slice(j-1, j+2));
      pixel.add(nextLine.slice(j-1, j+2));
    }
  }
  return image;
}

const parseInput = (input) => {
  const algorithm = input[0];
  const image = input.slice(2).map(line => line.split('').map(p => new Pixel(p)));
  return { algorithm, image };
}

const answer1 = (input) => {
  const REPEATS = 2;

  let { image, algorithm } = parseInput(input);

  console.log(imageToString(image));
  console.log(litPixelCount(image));
  console.log();

  for (let i = 0; i < REPEATS; i++) {
    image = setValues(image, i);
    image = update(image, algorithm);
    console.log(imageToString(image));
    console.log(litPixelCount(image));
    console.log();
  }
  return litPixelCount(image);
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));