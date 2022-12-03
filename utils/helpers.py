def read_file(filename):
  f = open(filename, 'r')
  return f.read()

def get_lines(input):
  return input.split('\n')

def get_lines_from_file(filename):
  return get_lines(read_file(filename))
