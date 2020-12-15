import re
from collections import defaultdict


def answer1(input):
  lines = input.split('\n')
  visited = []
  i = 0
  acc = 0
  while i < len(lines) and i not in visited:
    line = lines[i]
    visited.append(i)
    instruction, count = line.split(' ')
    if instruction == 'nop':
      i += 1
    if instruction == 'acc':
      acc += int(count)
      i += 1
    if instruction == 'jmp':
      i += int(count)
  
  return acc

def tryItOut(lines, changeIndex):
  visited = []
  i = 0
  acc = 0
  newLines = lines.copy()

  while lines[changeIndex].startswith('acc'):
    changeIndex += 1

  newLines[changeIndex] = lines[changeIndex].replace('nop', '!!!').replace('jmp', 'nop').replace('!!!', 'jmp')

  while i < len(newLines):
    if i in visited: return tryItOut(lines, changeIndex + 1)
    line = newLines[i]
    visited.append(i)
    instruction, count = line.split(' ')
    if instruction == 'nop':
      i += 1
    if instruction == 'acc':
      acc += int(count)
      i += 1
    if instruction == 'jmp':
      i += int(count)
  return acc

def answer2(input):
  lines = input.split('\n')
  return tryItOut(lines, 0)



f = open('input.txt', 'r')
print(answer2(f.read()))
 