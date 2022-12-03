const fs = require('fs')
const path = require('path')
const { program, Option } = require('commander')
const { Languages } = require('./utils/scriptUtils')

const jsContents = `const helpers = require('../../utils/helpers')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  return 'This function is not yet implemented!'
}
`

const pyContents = `import utils.helpers as helpers

def answer2(filename):
  return 'This function is not yet implemented!'

def answer1(filename):
  return 'This function is not yet implemented!'
`

program
  .argument('<year>', 'YYYY')
  .argument('<day>', 'DD')
  .addOption(new Option('-l, --language <language>', 'Which language to generate.').choices(Object.values(Languages)).default(Languages.JAVASCRIPT))
  .action((year, day, { language }) => {
    const directory = path.join(process.cwd(), year, day)

    try {
      fs.mkdirSync(directory)
    } catch (err) {
      console.error('Directory already exists! If you\'re sure you want to continue, please delete the directory first.', { directory })
      return
    }

    if (language === Languages.PYTHON) {
      const codeFile = path.join(directory, 'code.py')
      fs.writeFileSync(codeFile, pyContents)
    } else {
      const codeFile = path.join(directory, 'code.js')
      fs.writeFileSync(codeFile, jsContents)
    }

    
    const testInputFile = path.join(directory, 'test_input.txt')
    const inputFile = path.join(directory, 'input.txt')

    fs.writeFileSync(testInputFile, '')
    fs.writeFileSync(inputFile, '')
  })
  .parse()
