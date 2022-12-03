const fs = require('fs')
const path = require('path').posix
const { execSync } = require('child_process')
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

    const directory = path.resolve(year, day)
    const inputFile = path.join(directory, inputFileName)

    if (language === Languages.PYTHON) {
      try {
        const cmd = ` \
          py -c "import importlib; \
          code = importlib.import_module('${year}.${day}.code'); \
          print(code.answer${puzzleNum}('${inputFile}'))" \
        `
        const output = execSync(cmd)
        console.log(output.toString())
      } catch (err) {
        console.error('Error running python script:', err)
      }
    } else {
      const inputString = fs.readFileSync(inputFile, 'utf-8')

      const codeFile = path.join(directory, 'code.js')
      let code
      try {
      code = require(codeFile)
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.error('That js file does not exist!\nIf you are not using javascript, remember to supply the -l flag.')
          return
        }
        console.error(err)
        return
      }

      const output = puzzleNum === '1' ? 
        code.answer1(inputString) : 
        code.answer2(inputString)

      console.log(output)
    }
  })
  .parse()
