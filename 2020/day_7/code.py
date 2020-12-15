import re
from collections import defaultdict


def answer1(input, matchColor):
  containedIn = defaultdict(list)
  lines = input.split('\n')
  for line in lines:
    [first, *rest] = re.findall(r'([a-z]* [a-z]*) bag', line)

    for color in rest:
      containedIn[color].append(first)

  V = { matchColor }
  E = set()

  while len(V) > 0:
    c = V.pop()
    E.add(c)
    V.update(i for i in containedIn[c])
  
  return len(E) - 1

def answer2(input, matchColor):
  contains = defaultdict(list)
  lines = input.split('\n')
  for line in lines:
    [first, *rest] = re.findall(r'(\d* ?[a-z]* [a-z]*) bag', line)

    for r in rest:
      if r == ' no other': continue
      [n, *color] = r.split(' ')
      contains[first].extend(' '.join(color) for i in range(int(n)))
  
  count = 0
  V = [ matchColor ]
  E = []
  while len(V) > 0:
    c = V.pop()
    E.append(c)
    V.extend(i for i in contains[c])
  
  return len(E) - 1


f = open('input.txt', 'r')
print(answer2(f.read(), 'shiny gold'))
