import re

requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

def isValid(passport):
  for f in requiredFields:
    if f not in passport: return False
  return True

def answer1(input):
  passports = []
  inputPassports = input.split('\n\n')
  for p in inputPassports:
    passports.append({ s.split(':')[0]:s.split(':')[1] for s in re.split('\s', p) })
  return sum([1 for p in passports if isValid(p)])
    

f = open('input.txt', 'r')
print(answer1(f.read()))
