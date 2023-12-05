const { getLines, int } = require('../../utils/helpers')

class Grab {
  constructor(line) {
    const redMatch = line.match(/(\d+) red/)
    this.red = redMatch ? int(redMatch[1]) : 0

    const greenMatch = line.match(/(\d+) green/)
    this.green = greenMatch ? int(greenMatch[1]) : 0

    const blueMatch = line.match(/(\d+) blue/)
    this.blue = blueMatch ? int(blueMatch[1]) : 0
  }
}

class Game {
  constructor(line) {
    this.id = int(line.match(/Game (\d+)/)[1])
    this.setGrabs(line)
  }

  setGrabs(line) {
    const grabLines = line.replace(/Game \d+: /, '').split('; ')
    this.grabs = grabLines.map((g) => new Grab(g))
  }

  getPower() {
    const minRed = Math.max(...this.grabs.map(g => g.red))
    const minGreen = Math.max(...this.grabs.map(g => g.green))
    const minBlue = Math.max(...this.grabs.map(g => g.blue))

    return minRed * minGreen * minBlue
  }
}

const isPossible = (game, config) => {
  const { red, green, blue } = config
  return !game.grabs.some((grab) => {
    return grab.red > red || grab.green > green || grab.blue > blue
  })
}

module.exports.answer2 = (input) => {
  const games = getLines(input).map((l) => new Game(l))
  return games.reduce((sum, curr) => {
    return sum + curr.getPower()
  }, 0)
}

module.exports.answer1 = (input) => {
  const config = { red: 12, green: 13, blue: 14 }

  const games = getLines(input).map((l) => new Game(l))
  const possibleGames = games.filter((g) => isPossible(g, config))
  return possibleGames.reduce((sum, curr) => sum + curr.id, 0)
}
