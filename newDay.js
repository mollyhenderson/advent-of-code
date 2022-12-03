const fs = require('fs')
const path = require('path')
const { program } = require('commander')

const initialContents = `const utils = require('../../utils/utils')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  return 'This function is not yet implemented!'
}
`

program
  .argument('<year>')
  .argument('<day>')
  .action((year, day) => {
    const directory = path.join(process.cwd(), year, `day_${day}`)

    fs.mkdirSync(directory)

    const codeFile = path.join(directory, 'code.js')
    const testInputFile = path.join(directory, 'test_input.txt')
    const inputFile = path.join(directory, 'input.txt')

    fs.writeFileSync(codeFile, initialContents)
    fs.writeFileSync(testInputFile, '')
    fs.writeFileSync(inputFile, '')
  })
  .parse()
