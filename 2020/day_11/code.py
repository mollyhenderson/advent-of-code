from math import factorial

FLOOR = '.'
EMPTY = 'L'
OCCUPIED = '#'

def applyRules(map):
  newMap = []
  for i, row in enumerate(map):
    newMap.append('')
    for j, char in enumerate(row):
      startI = max(0, i-1)
      startJ = max(0, j-1)
      adj = ''.join([row[startJ:j+2] for row in map[startI:i+2]])
      adj = adj.replace(char, '', 1)

      numOccupied = len([x for x in adj if x == OCCUPIED])
      if char == EMPTY and numOccupied == 0:
        newMap[i] += OCCUPIED
      elif char == OCCUPIED and numOccupied >= 4:
        newMap[i] += EMPTY
      else:
        newMap[i] += char
  
  return newMap


def answer1(input):
  old = input.split('\n')
  new = applyRules(old)
  while old != new:
    old = new.copy()
    new = applyRules(old)
  
  return len([x for x in ''.join(new) if x == OCCUPIED])



f = open('input.txt', 'r')
print(answer1(f.read()))
 