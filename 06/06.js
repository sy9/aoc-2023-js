const races = [
  { time: 62, distance:  553 },
  { time: 64, distance: 1010 },
  { time: 91, distance: 1473 },
  { time: 90, distance: 1074 },
]

function wins(timeTotal, oldRecord) {
  let recordCount = 0
  for (let holdTime = 0; holdTime < timeTotal; holdTime++) {
    const currentDistance = holdTime * (timeTotal - holdTime)
    if (currentDistance > oldRecord) recordCount++
  }
  return recordCount
}

const total = races.reduce((acc, curr) => acc *= wins(curr.time, curr.distance), 1)

console.log(total)
console.log(wins(62649190,553101014731074))