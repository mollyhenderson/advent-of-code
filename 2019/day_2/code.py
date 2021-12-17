def answer2(program):
  for noun in range(100):
    for verb in range(100):
      input = [x for x in program]
      input[1] = noun
      input[2] = verb
      out = answer1(input)
      if (out == 19690720):
        return 100 * noun + verb

def answer1(program):
  program = [int(x) for x in program]
  # program[1] = 12
  # program[2] = 2
  i = 0
  while True:
    opcode, param1, param2, param3, *_ = program[i:]
    match opcode:
        case 1:
          program[param3] = program[param1] + program[param2]
        case 2:
          program[param3] = program[param1] * program[param2]
        case 99:
          return program[0]
        case _:
          raise Exception('something went wrong!')
    i += 4

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split(',')
print(answer2(input))
