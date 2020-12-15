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


def getRange(lines, number):
  for i in range(len(lines)):
    sum = 0
    index = i
    while sum < number:
      sum += lines[index]
      index += 1
    if sum == number: return lines[i:index]


def answer2(input, number):
  lines = list(map(int, input.split('\n')))
  range = getRange(lines, number)
  smol = min(range)
  yuge = max(range)
  return smol + yuge  


f = open('input.txt', 'r')
# print(answer1(f.read(), 25))
print(answer2(f.read(), 22406676))
 