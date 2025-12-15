const { describe, it } = require('node:test');
const assert = require('node:assert');
const { getLines, int } = require('./helpers');

describe('getLines', () => {
  it('Works as expected with only one line', () => {
    const TEST_STRING = 'hello';
    const EXPECTED = ['hello'];
    const lines = getLines(TEST_STRING);
    assert.strictEqual(lines.length, 1);
    lines.forEach((line, idx) => {
      assert.deepStrictEqual(line, EXPECTED[idx])
    })
  })

  it('Works as expected with multiple lines', () => {
    const TEST_STRING = `hello
my
name
is
test`;
    const EXPECTED = ['hello', 'my', 'name', 'is', 'test'];
    const lines = getLines(TEST_STRING);
    assert.strictEqual(lines.length, 5);
    lines.forEach((line, idx) => {
      assert.deepStrictEqual(line, EXPECTED[idx])
    })
  })
})

describe('int', () => {
  it('Works as expected with a numbers', () => {
    const TEST_STRING = '69420';
    const EXPECTED = 69420;
    const number = int(TEST_STRING);
    assert.strictEqual(number, EXPECTED);
  })

  it('Works as expected with letters', () => {
    const TEST_STRING = 'burrrrrp sorry I drank soda. baking soda.'
    const EXPECTED = NaN;
    const number = int(TEST_STRING);
    assert.strictEqual(number, EXPECTED);
    assert.strictEqual(isNaN(number), true);
  })
})