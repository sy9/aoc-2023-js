const input = await Bun.file("03_input.txt").text(),
  partsMap = new Map(),
  symbols = []

let numberFound = false
let numberStartIndex = null
input.split("\n").forEach((line, y) => {
  for (let x=0;x<line.length;x++) {
    if (line[x] >= '0' && line[x] <= '9') {
      if (numberFound) {
        if (x !== line.length-1) continue
      } else {
        numberFound = true
        numberStartIndex = x
        if (x !== line.length-1) continue
      }
    }
    if (line[x] === "*") {
      symbols.push(`${x}:${y}`)
    }
    if (numberFound) {
      numberFound = false
      let lastDigitOffset = 0
      if (x === line.length-1) lastDigitOffset = 1
      const numObj = {
        value: parseInt(line.slice(numberStartIndex, x + lastDigitOffset))
      }
      for (let xpos=numberStartIndex;xpos<x;xpos++) {
        partsMap.set(`${xpos}:${y}`, numObj)
      }
    }
  }
})

function neighbors(input) {
  const n = []
  let [x, y] = input.split(":")
  let xval = parseInt(x)
  let yval = parseInt(y)

  n.push(`${xval-1}:${yval-1}`)
  n.push(`${xval}:${yval-1}`)
  n.push(`${xval+1}:${yval-1}`)
  n.push(`${xval-1}:${yval+1}`)
  n.push(`${xval}:${yval+1}`)
  n.push(`${xval+1}:${yval+1}`)
  n.push(`${xval-1}:${yval}`)
  n.push(`${xval+1}:${yval}`)

  return n
}
let total = 0
symbols.forEach(s => {
  const n = neighbors(s)
  const partList = getPartsFromNeighbors(n)
  if (partList.length !== 2) return
  total += partList[0] * partList[1]
})

function getPartsFromNeighbors(neighborlist) {
  const parts = []

  neighborlist.forEach(n => {
    const part = partsMap.get(n)
    if (part === undefined || part.seen) return
    part.seen = true
    parts.push(part.value)
  })

  return parts
}
console.log(total)