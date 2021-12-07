const fs = require('fs');

const sum = (arr) => arr.reduce((sum, v) => sum + v, 0);

class BingoSpace {
  constructor(value) {
    this.value = value;
    this.marked = false;
  }

  markValue(value) {
    if (this.value === value) {
      this.marked = true;
    }
  }

  toString() {
    return this.marked ? `*${this.value}*` : this.value;
  }
}

class BingoBoard {
  constructor(boardStrings) {
    this.board = boardStrings.map(row => {
      const values = row.trim().split(/\s+/u);
      return values.map(v => new BingoSpace(v));
    });
  }

  markValue(value) {
    this.board.forEach(row => {
      row.forEach(space => space.markValue(value));
    })
  }

  isBingo() {
    const rowBingo = this.board.some(row => 
      row.every(space => space.marked));
    const columnBingo = this.board[0].some((_, i) => 
      this.board.every(row => row[i].marked));

    return rowBingo || columnBingo;
  }

  score(lastValue) {
    const total = sum(
      this.board.flat()
      .filter(space => !space.marked)
      .map(space => parseInt(space.value, 10)));
    
    return total * lastValue;
  }

  toString() {
    return this.board
    .map(row => row.join(' '))
    .join('\n');
  }
}

const setup = (input) => {
  input = input.filter(r => r.length);
  const numsCalled = input.shift().split(',');

  const boards = [];
  while(input.length) {
    boards.push(new BingoBoard(input.splice(0, 5)));
  }

  return { boards, numsCalled };
}

const answer2 = (input) => {
  let { boards, numsCalled } = setup(input);

  for (let i = 0; i < numsCalled.length; i++) {
    const num = numsCalled[i];
    boards.forEach(board => board.markValue(num));
    const winner = boards.find(board => board.isBingo());
    boards = boards.filter(board => !board.isBingo());

    if (boards.length === 0) {
      return winner.score(num);
    }
  }
}

const answer1 = (input) => {
  const { boards, numsCalled } = setup(input);

  for (let i = 0; i < numsCalled.length; i++) {
    const num = numsCalled[i];
    boards.forEach(board => board.markValue(num));
    // console.log(`-${num}-`)
    // console.log(boards.join('\n\n'))
    // console.log('\n\n---\n\n')
    const bingoBoard = boards.find(b => b.isBingo());
    if (bingoBoard) {
      return bingoBoard.score(num);
    }
  }
}

const FILENAME = 'input.txt';

const f = fs.readFileSync(FILENAME, 'utf-8');
const input = f.split('\n');
console.log(answer2(input));
