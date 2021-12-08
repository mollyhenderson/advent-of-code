def answer1(lines):
  outputs = [x.split(' | ')[1].split() for x in lines]
  flattened = [x for sublist in outputs for x in sublist]
  count = len([1 for x in flattened if len(x) in [2, 3, 4, 7]])
  return count

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\n')
print(answer1(input))
