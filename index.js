const fs = require('fs')
const path = require('path')
const { program, Option } = require('commander')
const { Languages } = require('./utils/scriptUtils')

program
  .argument('<year>', 'YYYY')
  .argument('<day>', 'DD')
  .requiredOption('-n, --puzzle-num <puzzle>', 'Number of the puzzle')
  .option('-i, --input <file>', 'Name of the input file. If not provided, will be determined by the prod flag.')
  .option('-p, --prod', 'Production ready - use the official input file!')
  .addOption(new Option('-l, --language <language>', 'Which language to run.').choices(Object.values(Languages)).default(Languages.JAVASCRIPT))
  .action((year, day, { puzzleNum, input, prod, language }) => {
    const inputFileName = input ?? prod ? 'input.txt' : 'test_input.txt'

    const directory = path.join(process.cwd(), year, day)
    const inputFile = path.join(directory, inputFileName)

    const inputString = fs.readFileSync(inputFile, 'utf-8')

    if (language === Languages.PYTHON) {
      console.log('Sorry, python is not yet supported!')
    } else {
      const code = require(codeFile)

      const output = puzzleNum === '1' ? 
        code.answer1(inputString) : 
        code.answer2(inputString)

      console.log(output)
    }
  })
  .parse()
