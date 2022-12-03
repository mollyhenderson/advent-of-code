const fs = require('fs')
const path = require('path')
const { program } = require('commander')

program
  .argument('<year>')
  .argument('<day>')
  .requiredOption('-p, --puzzle <num>', 'Number of the puzzle')
  .option('-t, --test', 'Turning on "test" automatically uses the test_input file.')
  .option('-i, --input <file>', 'Name of the input file. Defaults to input.txt')
  .action((year, day, { puzzle, test, input }) => {
    const inputFileName = input ?? test ? 'test_input.txt' : 'input.txt'

    const directory = path.join(process.cwd(), year, `day_${day}`)
    const codeFile = path.join(directory, 'code.js')
    const inputFile = path.join(directory, inputFileName)

    const inputString = fs.readFileSync(inputFile, 'utf-8')
    const code = require(codeFile)

    const output = puzzle === '1' ? 
      code.answer1(inputString) : 
      code.answer2(inputString)

    console.log(output)
  })
  .parse()
