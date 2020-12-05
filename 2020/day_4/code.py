import re

requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

def isValid(passport):
  for f in requiredFields:
    if f not in passport: return False
  return True

def isValid2(p):
  if not isValid(p): return False
  if len(p['byr']) != 4 or int(p['byr']) < 1920 or int(p['byr']) > 2002: return False
  if len(p['iyr']) != 4 or int(p['iyr']) < 2010 or int(p['iyr']) > 2020: return False
  if len(p['eyr']) != 4 or int(p['eyr']) < 2020 or int(p['eyr']) > 2030: return False
  
  heightMatch = re.match('(\d+)((cm)|(in))', p['hgt'])
  if not heightMatch: return False
  n, u, _, _ = heightMatch.groups()
  if u == 'cm' and (int(n) < 150 or int(n) > 193): return False
  if u == 'in' and (int(n) < 59 or int(n) > 76): return False

  if not re.match('^#[0-9a-f]{6}$', p['hcl']): return False
  if p['ecl'] not in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']: return False
  if not re.match('^[0-9]{9}$', p['pid']): return False

  return True


def answer1(input):
  passports = []
  inputPassports = input.split('\n\n')
  print(len(inputPassports))
  for p in inputPassports:
    passports.append({ s.split(':')[0]:s.split(':')[1] for s in re.split('\s', p) })
  return sum([1 for p in passports if isValid2(p)])
    

f = open('input.txt', 'r')
print(answer1(f.read()))
