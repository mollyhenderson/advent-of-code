FLOOR = '.'
EMPTY = 'L'
OCCUPIED = '#'

def getAdj1(map, i, j, char):
  startI = max(0, i-1)
  startJ = max(0, j-1)
  adj = ''.join([row[startJ:j+2] for row in map[startI:i+2]])
  return adj.replace(char, '', 1)

def getAdj2(map, i, j, char):
  adj = []
  for upDown in range(-1, 2):
    for leftRight in range(-1, 2):
      if (upDown == 0 and leftRight == 0):
        continue
      startI = i+upDown
      startJ = j+leftRight
      while startI >= 0 and startJ >= 0 and len(map) > startI and len(map[startI]) > startJ:
        seen = map[startI][startJ]
        if seen != FLOOR:
          adj.append(seen)
          break
        startI = startI+upDown
        startJ = startJ+leftRight
  return adj


def applyRules(map, getAdjFn, maxOccupied):
  newMap = []
  for i, row in enumerate(map):
    newMap.append('')
    for j, char in enumerate(row):
      if char == FLOOR:
        newMap[i] += char
        continue
      adj = getAdjFn(map, i, j, char)
      numOccupied = len([x for x in adj if x == OCCUPIED])

      if char == EMPTY and numOccupied == 0:
        newMap[i] += OCCUPIED
      elif char == OCCUPIED and numOccupied >= maxOccupied:
        newMap[i] += EMPTY
      else:
        newMap[i] += char
  return newMap


def answer1(input, getAdjFn = getAdj1, maxOccupied = 4):
  old = input.split('\n')
  new = applyRules(old, getAdjFn, maxOccupied)
  while old != new:
    old = new.copy()
    new = applyRules(old, getAdjFn, maxOccupied)
  return len([x for x in ''.join(new) if x == OCCUPIED])


def answer2(input):
  return answer1(input, getAdj2, 5)


f = open('input.txt', 'r')
print(answer2(f.read()))
 