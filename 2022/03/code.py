import string

letters = list(string.ascii_lowercase + string.ascii_uppercase)

def get_rucksacks(lines):
  return [list(x) for x in lines]

def priority(x):
  return letters.index(x) + 1

def answer2(lines):
  rucksacks = get_rucksacks(lines)

  total = 0
  for i in range(0, len(rucksacks), 3):
    rucks = rucksacks[i:i+3]
    
    shared = next(x for x in rucks[0] if x in rucks[1] and x in rucks[2])

    total += priority(shared)
  
  return total

def answer1(lines):
  rucksacks = get_rucksacks(lines)

  total = 0
  for rucksack in rucksacks:
    center = len(rucksack) // 2
    left = rucksack[:center]
    right = rucksack[center:]

    shared = next(x for x in left if x in right)

    total += priority(shared)

  return total

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\n')
print(answer2(input))
