import { StarMap } from './starmap'

const partAuniverseExpansionFactor = 2
const partBuniverseExpansionFactor = 1000000
const parts = [
  {
    name: "Part A",
    f: partAuniverseExpansionFactor
  },
  {
    name: "Part B",
    f: partBuniverseExpansionFactor
  },
]
const data = await Bun.file("galaxy.txt").text()
parts.forEach(part => {
  const starMap = new StarMap(data, part.f)
  let totalDistance = 0
  starMap.galaxyPairs().forEach(gp => {
    const dist = distance(gp[0], gp[1])
    totalDistance += dist
  })
  console.log(`${part.name}:`, totalDistance)
})

function distance(a, b) {
  return Math.abs(a.x-b.x) + Math.abs(a.y-b.y)
}