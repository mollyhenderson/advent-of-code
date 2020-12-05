

def parseInput(i):
  r = i[:7].replace('F', '0').replace('B', '1')
  c = i[7:].replace('L', '0').replace('R', '1')
  return int(r, 2), int(c, 2)

def getSeatIds(input):
  seatIds = []
  for i in input.split('\n'):
    row, column = parseInput(i)
    seatIds.append(row * 8 + column)
  return seatIds

def answer1(input):
  return max(getSeatIds(input))

def answer2(input):
  seatIds = getSeatIds(input)
  seatIds.sort()
  for i in range(1, len(seatIds)-2):
    if seatIds[i] - seatIds[i-1] > 1:
      return seatIds[i] - 1


f = open('input.txt', 'r')
print(answer2(f.read()))
