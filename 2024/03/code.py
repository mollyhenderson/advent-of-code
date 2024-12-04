import re
import utils.helpers as helpers

def answer2(filename):
  input = helpers.read_file(filename)

  matches = re.findall(r'mul\((\d+),(\d+)\)|(do\(\))|(don\'t\(\))', input)

  sum = 0
  do_it = True
  for x,y,do,dont in matches:
    if (do):
      do_it = True
      continue
    if (dont):
      do_it = False
      continue
    if (do_it):
      sum += int(x)*int(y)
  return sum

def answer1(filename):
  input = helpers.read_file(filename)

  matches = re.findall(r'mul\((\d+),(\d+)\)', input)
  return sum([int(x)*int(y) for x,y in matches])
