def answer2(lines):
  zipped = zip(lines, lines[1:], lines[2:])
  return answer1([int(x[0])+int(x[1])+int(x[2]) for x in zipped])

def answer1(lines):
  zipped = zip(lines, lines[1:])
  return len([x for x in zipped if int(x[1]) > int(x[0])])

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\n')
print(answer2(input))
