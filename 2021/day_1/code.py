def answer1(input):
  lines = input.split('\n')
  zipped = zip(lines, lines[1:])
  return len([x for x in zipped[:-1] if int(x[1]) > int(x[0])])

f = open('input.txt', 'r')
print(answer1(f.read()))
