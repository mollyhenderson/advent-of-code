import re
from collections import defaultdict


def answer1(input):
  numbers = list(map(int, input.split('\n')))
  numbers.sort()
  numbers.insert(0, 0)
  numbers.append(numbers[-1]+3)
  diffs = zip(numbers, numbers[1:])

  ones = 0
  threes = 0

  for (a,b) in diffs:
    diff = b - a
    if diff == 1: ones += 1
    if diff == 3: threes += 1
  return ones * threes



f = open('input.txt', 'r')
print(answer1(f.read()))
 