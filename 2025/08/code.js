const { getLines, PoppableSet } = require('../../utils/helpers')

class Point {
  connections = []

  traversed = false

  constructor(line) {
    const [x, y, z] = line.split(',')
    this.x = +x
    this.y = +y
    this.z = +z
  }

  distanceTo(other) {
    return Math.sqrt(
      (this.x - other.x) ** 2 +
        (this.y - other.y) ** 2 +
        (this.z - other.z) ** 2
    )
  }

  connectTo(other) {
    this.connections.push(other)
  }

  isConnectedTo(other) {
    return this.connections.includes(other)
  }
}

const getMinDistance = (points) => {
  let min = Number.MAX_VALUE
  let minPoints = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const pointI = points[i]
      const pointJ = points[j]

      if (pointI.isConnectedTo(pointJ)) continue

      const distance = pointI.distanceTo(pointJ)
      if (distance < min) {
        min = distance
        minPoints = [pointI, pointJ]
      }
    }
  }

  return { min, minPoints }
}

const findCircuit = (point) => {
  const circuit = new PoppableSet([point])
  const toTraverse = new PoppableSet([point])
  while (toTraverse.size) {
    const next = toTraverse.pop()
    for (const point of next.connections) {
      circuit.add(point)
      if (!point.traversed) {
        point.traversed = true
        toTraverse.add(point)
      }
    }
  }

  circuit.forEach((p) => (p.traversed = false)) // reset

  return circuit
}

const getNumCircuits = (points) => {
  const pointSet = new PoppableSet(points)

  const circuits = []
  while (pointSet.size) {
    const point = pointSet.pop()
    const circuit = findCircuit(point, pointSet)
    circuits.push(circuit)

    for (const point of circuit) {
      pointSet.delete(point)
    }
  }
  return circuits.length
}

module.exports.answer2 = (input) => {
  const MAX_ITERATIONS = 10000
  const lines = getLines(input)
  const points = lines.map((l) => new Point(l))
  let lastMinPoints = []
  let i = 0
  while (i++ < MAX_ITERATIONS) {
    const { minPoints } = getMinDistance(points)
    lastMinPoints = minPoints

    minPoints[0].connectTo(minPoints[1])
    minPoints[1].connectTo(minPoints[0])

    const numCircuits = getNumCircuits(points)
    if (numCircuits === 1) break
  }

  return lastMinPoints[0].x * lastMinPoints[1].x
}

module.exports.answer1 = (input) => {
  // const ITERATIONS = 10
  const ITERATIONS = 10000
  const lines = getLines(input)
  const points = lines.map((l) => new Point(l))
  let i = 0
  while (i++ < ITERATIONS) {
    const { minPoints } = getMinDistance(points)
    minPoints[0].connectTo(minPoints[1])
    minPoints[1].connectTo(minPoints[0])
  }

  const pointSet = new PoppableSet(points)

  const circuits = []
  while (pointSet.size) {
    const point = pointSet.pop()
    const circuit = findCircuit(point, pointSet)
    circuits.push(circuit)

    for (const point of circuit) {
      pointSet.delete(point)
    }
  }

  circuits.sort((a, b) => a.size - b.size)
  return circuits.pop().size * circuits.pop().size * circuits.pop().size
}
