import re
import utils.helpers as helpers

def answer2(filename):
  input = helpers.read_file(filename)

  elves = input.split('\n\n')
  totals = [sum(map(int, elf.split('\n'))) for elf in elves]
  totals.sort(reverse=True)
  return sum(totals[:3])

def answer1(filename):
  lines = helpers.get_lines_from_file(filename)

  # This is no fun, but:
  max = 0
  curr = 0
  for line in lines:
    if line == '':
      if curr > max: max = curr
      curr = 0
      continue
    curr += int(line)
  return max
