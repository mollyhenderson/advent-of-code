import re

ALL_CHARS = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

def charsForUniqueSegmentCount(digits, segmentCount):
  return next(x for x in digits if len(x) == segmentCount)

def optionsForSegmentCount(digits, segmentCount):
  return list(set([''.join(sorted(x)) for x in digits if len(x) == segmentCount]))

def intersect(a, b):
    return list(set(a) & set(b))

def answer2(lines):
  finalOutputs = []
  digitsLists = [re.split('(?: \| )| ', x) for x in lines]
  for digits in digitsLists:
    outputs = digits[10:]
    mappings = [ALL_CHARS for i in range(7)]

    one = charsForUniqueSegmentCount(digits, 2)
    mappings[2] = intersect(mappings[2], one)
    mappings[5] = intersect(mappings[5], one)

    four = charsForUniqueSegmentCount(digits, 4)
    mappings[1] = intersect(mappings[1], four)
    mappings[2] = intersect(mappings[2], four)
    mappings[3] = intersect(mappings[3], four)
    mappings[5] = intersect(mappings[5], four)

    seven = charsForUniqueSegmentCount(digits, 3)
    mappings[0] = intersect(mappings[0], seven)
    mappings[2] = intersect(mappings[2], seven)
    mappings[5] = intersect(mappings[5], seven)

    fiveSegments = optionsForSegmentCount(digits, 5)
    sixSegments = optionsForSegmentCount(digits, 6)

    onceInFives = [c for c in ALL_CHARS if len([1 for x in fiveSegments if c in x]) == 1]
    twiceInFives = [c for c in ALL_CHARS if len([1 for x in fiveSegments if c in x]) == 2]
    thriceInFives = [c for c in ALL_CHARS if len([1 for x in fiveSegments if c in x]) == 3]

    onceInSixes = [c for c in ALL_CHARS if len([1 for x in sixSegments if c in x]) == 1]
    twiceInSixes = [c for c in ALL_CHARS if len([1 for x in sixSegments if c in x]) == 2]
    thriceInSixes = [c for c in ALL_CHARS if len([1 for x in sixSegments if c in x]) == 3]

    positionZeroOptions = intersect(thriceInFives, thriceInSixes)
    positionOneOptions = intersect(onceInFives, thriceInSixes)
    positionTwoOptions = intersect(twiceInFives, twiceInSixes)
    positionThreeOptions = intersect(thriceInFives, twiceInSixes)
    positionFourOptions = intersect(onceInFives, twiceInSixes)
    positionFiveOptions = intersect(twiceInFives, thriceInSixes)

    mappings[0] = intersect(mappings[0], positionZeroOptions)
    mappings[1] = intersect(mappings[1], positionOneOptions)
    mappings[2] = intersect(mappings[2], positionTwoOptions)
    mappings[3] = intersect(mappings[3], positionThreeOptions)
    mappings[4] = intersect(mappings[4], positionFourOptions)
    mappings[5] = intersect(mappings[5], positionFiveOptions)
    mappings[6] = intersect(mappings[6], positionZeroOptions)

    mappings[6] = [x for x in mappings[6] if x not in mappings[0]]

    encoding = { mappings[i][0]:i for i in range(0, len(mappings)) }

    # :tada:

    encodedNumbers = ['012456', '25', '02346', '02356', '1235', '01356', '013456', '025', '0123456', '012356']
    
    encodedOutputs = []
    for output in outputs:
      encodedOutputs.append(''.join(sorted([str(encoding[x]) for x in output])))
    finalOutput = ''.join([next(str(i) for (i,n) in enumerate(encodedNumbers) if n == x) for x in encodedOutputs])
    finalOutputs.append(int(finalOutput))
  return sum(finalOutputs)



def answer1(lines):
  outputs = [x.split(' | ')[1].split() for x in lines]
  flattened = [x for sublist in outputs for x in sublist]
  count = len([1 for x in flattened if len(x) in [2, 3, 4, 7]])
  return count

FILENAME = 'input.txt'

f = open(FILENAME, 'r')
input = f.read().split('\n')
print(answer2(input))
