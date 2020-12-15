import re
from collections import defaultdict


def answer1(input, matchColor):
  containedIn = defaultdict(list)
  lines = input.split('\n')
  for line in lines:
    [first, *rest] = re.findall(r'([a-z]*? [a-z]*?) bag', line)

    for color in rest:
      containedIn[color].append(first)

  V = { matchColor }
  E = set()

  while len(V) > 0:
    c = V.pop()
    E.add(c)
    V.update(i for i in containedIn[c])
  
  return len(E) - 1


f = open('input.txt', 'r')
print(answer1(f.read(), 'shiny gold'))
