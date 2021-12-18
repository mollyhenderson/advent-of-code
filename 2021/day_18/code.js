const fs = require('fs');

const isNumber = (n) => Number.isInteger(n);

class SnailfishNumber {
  constructor({ left, right, value } = { left: null, right: null, value: null }) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = null;

    if (this.left) this.left.parent = this;
    if (this.right) this.right.parent = this;
  }

  isLeaf() {
    return isNumber(this.value);
  }

  isLeftChild() {
    return this.parent?.left === this;
  }

  isRightChild() {
    return this.parent?.right === this;
  }

  addToLeftmost(toAdd) {
    let node = this;
    while (!node.isLeaf()) {
      node = node.left;
    }
    node.value += toAdd;
  }

  addToRightmost(toAdd) {
    let node = this;
    while (!node.isLeaf()) {
      node = node.right;
    }
    node.value += toAdd;
  }

  updateNextLeft(toAdd) {
    let node = this;
    while(node && node.isLeftChild()) {
      node = node.parent;
    }
    node = node.parent;
    if (node) node.left.addToRightmost(toAdd);
  }

  updateNextRight(toAdd) {
    let node = this;
    while (node.parent && node.isRightChild()) {
      node = node.parent;
    }
    node = node.parent;
    if (node) node.right.addToLeftmost(toAdd);
  }

  explode() {
    // console.log('exploding', this.toString());
    this.updateNextLeft(this.left);
    this.updateNextRight(this.right);

    this.left = undefined;
    this.right = undefined;
    this.value = 0;
  }

  split() {
    const newLeft = new SnailfishNumber({ value: Math.floor(this.value / 2) });
    const newRight = new SnailfishNumber({ value: Math.ceil(this.value / 2) });
    this.value = undefined;

    newLeft.parent = this;
    newRight.parent = this;

    this.left = newLeft;
    this.right = newRight;
  }

  toString() {
    if (this.isLeaf()) return this.value;
    return `[${this.left.toString()},${this.right.toString()}]`;
  }
}

const getFirstDeepest = (root, depth=0) => {
  if (depth >= 4 && !root.isLeaf()) return root;

  if (!root.isLeaf()) {
    const node = getFirstDeepest(root.left, depth+1);
    if (node) return node;
  }
  if (!root.isLeaf()) {
    return getFirstDeepest(root.right, depth+1);
  }
  return false;
}

const condition1 = (root) => {
  // console.log('checking condition 1', root.toString());
  const node = getFirstDeepest(root);
  if (node) {
    node.explode();
    return true;
  }
  return false;
}

const condition2 = (root) => {
  // console.log('checking condition 2', root.toString());
  if (root.value > 9) {
    // console.log('split', root.toString());
    root.split();
    return true;
  }

  if (root.left) {
    const done = condition2(root.left);
    if (done) return done;
  }
  if (root.right) {
    return condition2(root.right);
  }
  return false;
}

const reduce = (n) => {
  let exploded = true;
  let split = false;
  let i = 0;
  while(exploded || split) {
    // console.log(n.toString());
    exploded = condition1(n);
    if (!exploded) {
      split = condition2(n);
    }
    i++;
  }
  // console.log('REDUCED NUMBER:')
  // console.log(n.toString());
  return n;
}

const add = (a, b) => new SnailfishNumber({ left: a, right: b });

const parseInput = (input) => {
  if (input.match(/^\d+$/)) {
    return new SnailfishNumber({ value: parseInt(input, 10) });
  }

  const q = [];
  for (const [i, c] of input.split('').entries()) {
    if (c === '[') {
      q.push(c);
    }
    else if (c === ']') {
      q.pop();
    }
    else if (c === ',') {
      if (q.length === 1) {
        // found our split point
        const first = input.substring(1, i);
        const second = input.substring(i+1, input.length-1);
        return new SnailfishNumber({ left: parseInput(first), right: parseInput(second) });
      }
    }
  }
  return parseInput(input.substring(firstIndex+1, lastIndex));
}

const answer1 = (input) => {
  const sum = input.slice(1).reduce((sum, n) => reduce(add(sum, parseInput(n))), parseInput(input[0]));
  // TODO: get magnitude
  console.log(sum.toString());
}

const FILENAME = 'test_input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer1(input));