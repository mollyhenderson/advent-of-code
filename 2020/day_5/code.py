

def parseInput(i):
  r = i[:7].replace('F', '0').replace('B', '1')
  c = i[7:].replace('L', '0').replace('R', '1')
  return int(r, 2), int(c, 2)

def answer1(input):
  seatIds = []
  for i in input.split('\n'):
    row, column = parseInput(i)
    seatIds.append(row * 8 + column)
  return max(seatIds)


f = open('input.txt', 'r')
print(answer1(f.read()))