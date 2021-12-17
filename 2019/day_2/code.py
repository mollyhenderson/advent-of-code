def answer1(program):
  program = [int(x) for x in program]
  program[1] = 12
  program[2] = 2
  i = 0
  while True:
    opcode, in1, in2, out, *_ = program[i:]
    match opcode:
        case 1:
          program[out] = program[in1] + program[in2]
        case 2:
          program[out] = program[in1] * program[in2]
        case 99:
          return program[0]
        case _:
          raise Exception('something went wrong!')
    i += 4

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split(',')
print(answer1(input))
