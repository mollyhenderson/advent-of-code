import re
import utils.helpers as helpers
import itertools

def parse_input(filename):
  lines = helpers.get_lines_from_file(filename)
  one = []
  two = []
  for l in lines:
    [a,b] = l.split('   ')
    one.append(int(a))
    two.append(int(b))

  return one, two

def answer2(filename):
  [one, two] = parse_input(filename)

  two.sort()
  freqMap = itertools.groupby(two)

  score = 0
  for num, group in freqMap:
    count = len(list(group))
    score += sum([a * count for a in one if a == num])
  
  return score

def answer1(filename):
  [one, two] = parse_input(filename)

  one.sort()
  two.sort()

  return sum([abs(a - b) for a, b in zip(one, two)])
