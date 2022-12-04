const getLines = (input) => input.split('\n')

const getCharacters = (input) => input.split('')

const int = (str) => parseInt(str, 10)

const times = (num, cb) => [...Array(num)].map((_, i) => cb(i))

class GrowingMap {
  #map
  #fillChar

  #minX = 0
  #minY = 0
  #maxY = 0
  #maxX = 0

  constructor (fillChar = 0) {
    this.#fillChar = fillChar
    this.#map = {
      0: { 0: this.#fillChar }
    }
  }

  get(x, y) {
    return this.#map[y][x]
  }

  set(x, y, value) {
    this.resizeToFit(x, y)
    this.#map[y][x] = value
  }

  // this is wildly inefficient ¯\_(ツ)_/¯
  resizeToFit(x, y) {
    while (y < this.#minY) {
      this.#minY--
      this.#map[this.#minY] = {}
      for (let i = this.#minX; i < this.#maxX; i++) {
        this.#map[this.#minY][i] = this.#fillChar
      }
    }
    while (y > this.#maxY) {
      this.#maxY++
      this.#map[this.#maxY] = {}
      for (let i = this.#minX; i < this.#maxX; i++) {
        this.#map[this.#maxY][i] = this.#fillChar
      }
    }

    while (x < this.#minX) {
      this.#minX--
      Object.values(this.#map).forEach(row => row[this.#minX] = this.#fillChar)
    }
    while (x > this.#maxX) {
      this.#maxX++
      Object.values(this.#map).forEach(row => row[this.#maxX] = this.#fillChar)
    }
  }

  toString() {
    let str = ''
    for (let i = this.#maxY; i >= this.#minY; i--) {
      for (let j = this.#minX; j <= this.#maxX; j++) {
        str += this.get(j, i)
      }
      str += '\n'
    }
    return str
  }
}

module.exports = {
  getLines,
  getCharacters,
  int,
  times,
  GrowingMap,
}