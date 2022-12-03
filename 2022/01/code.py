import re

def answer2(lines):
  # What dummy decided to split into lines then re-join the lines
  input = '\n'.join(lines)
  elves = input.split('\n\n')
  totals = [sum(map(int, elf.split('\n'))) for elf in elves]
  totals.sort(reverse=True)
  return sum(totals[:3])

def answer1(lines):
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


FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\n')
print(answer2(input))
