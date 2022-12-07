const helpers = require('../../utils/helpers')

class File {
  name = null
  size = 0

  constructor(name, size) {
    this.name = name
    this.size = helpers.int(size)
  }
}

class Directory {
  name = null
  parent = null
  // ok so as it turns out, these totally don't need to be their own arrays
  childDirs = []
  childFiles = []

  constructor(name, parent = null) {
    this.name = name
    this.parent = parent
  }

  get size() {
    let size = 0
    for (const child of this.childDirs) {
      size += child.size
    }
    for (const child of this.childFiles) {
      size += child.size
    }
    return size
  }

  child(name) {
    return this.childDirs.find(x => x.name === name)
  }
}

const print = (directory, indent = '') => {
  console.log(`${indent}${directory.name} (dir)`)
  for (const dir of directory.childDirs ?? []) {
    print(dir, indent + '\t')
  }
  for (const file of directory.childFiles ?? []) {
    console.log(`${indent}\t${file.name} (file, size=${file.size})`)
  }
} 

const printDirSizes = (directories) => {
  for (const directory of Object.values(directories)) {
    console.log(`${directory.name}: ${directory.size}`)
  }
}

const parseInput = (input) => {
  const lines = helpers.getLines(input)

  const root = new Directory('/')

  let currentDirectory = root
  const directories = [currentDirectory]
  for (const line of lines.slice(1)) {
    if (line.startsWith('$')) {
      // we're running a command!
      if (line.startsWith('$ cd')) {
        const name = line.slice(5)
        if (name === '..') {
          currentDirectory = currentDirectory.parent
        } else {
          currentDirectory = currentDirectory.child(name)
        }
      }
      // ignore ls lines; we'll handle those in the next iterations
    } else {
      // we've just run ls
      if (line.startsWith('dir')) {
        const name = line.slice(4)
        const dir = new Directory(name, currentDirectory)
        directories.push(dir)
        currentDirectory.childDirs.push(dir)
      } else {
        // we've reached a file
        const match = line.match(/(\d+) (.*)/)
        const name = match[2]
        const size = match[1]
        const file = new File(name, size)
        currentDirectory.childFiles.push(file)
      }
    }
  }

  return { root, directories }
}

module.exports.answer2 = (input) => {
  const { root, directories } = parseInput(input)

  const spaceRemaining = 30000000 - (70000000 - directories[0].size)

  directories.sort((a, b) => a.size - b.size)

  // printDirSizes(directories)

  const theOne = directories.find(d => d.size > spaceRemaining)
  return theOne.size
}

module.exports.answer1 = (input) => {
  const { root, directories } = parseInput(input)

  // print(root)

  // printDirSizes(directories)

  return directories.reduce((acc, value) => {
    if (value.size <= 100000) acc += value.size
    return acc
  }, 0)
}
