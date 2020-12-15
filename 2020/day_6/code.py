def answer1(input):
  groups = []
  inputGroups = [set(c for c in g.replace('\n', '')) for g in input.split('\n\n')]
  print(len(inputGroups))
  return sum([len(i) for i in inputGroups])

def answer2(input):
  sum = 0
  inputGroups = input.split('\n\n')
  print(len(inputGroups))

  for g in inputGroups:
    people = g.split('\n')
    answers = set(people[0])
    for p in people[1:]:
      answers = answers.intersection(p)
    sum += len(answers)
  return sum
    


f = open('input.txt', 'r')
print(answer2(f.read()))
