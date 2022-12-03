const fs = require('fs')
const path = require('path')
const { program, Option } = require('commander')

const Languages = {
  JAVASCRIPT: 'javascript',
  PYTHON: 'python'
}

const jsContents = `const utils = require('../../utils/utils')

module.exports.answer2 = (input) => {
  return 'This function is not yet implemented!'
}

module.exports.answer1 = (input) => {
  return 'This function is not yet implemented!'
}
`

// TODO: add python support to index.js & clean up this template
const pyContents = `def answer2(lines):
  return 'This function is not yet implemented!'

def answer1(lines):
  return 'This function is not yet implemented!'

FILENAME = 'test_input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\\n')
print(answer1(input))
`

program
  .argument('<year>')
  .argument('<day>')
  .addOption(new Option('-l, --language <language>', 'Which language to generate.').choices(Object.values(Languages)).default(Languages.JAVASCRIPT))
  .action((year, day, { language }) => {
    const directory = path.join(process.cwd(), year, `day_${day}`)

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
