import re
from collections import defaultdict


def answer1(input, preamble):
  lines = list(map(int, input.split('\n')))
  for i in range(preamble, len(lines)):
    success = False
    prev = lines[i-preamble:i]
    combos = [(x,y) for x in prev for y in prev]
    for (x,y) in combos:
      if x != y and x + y == int(lines[i]): 
        success = True
        break
    if not success: return lines[i]


f = open('input.txt', 'r')
print(answer1(f.read(), 25))
 