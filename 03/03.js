const input = await Bun.file("03_input.txt").text(),
  partsMap = new Map(),
  symbols = [],
  symbolsSet = "@/&%-+=*#$"

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
    if (symbolsSet.includes(line[x])) {
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
  //if (total > 2000) return
  //console.log("processing symbol: ", s)
  const n = neighbors(s)
  //console.log("  neighbors: ", n)
  n.forEach(nn => {
    const num = partsMap.get(nn)
    //console.log("  current neighbor: ", nn, "content: ", num)
    if (num === undefined) return
    if (num.seen) return
    //console.log ("  setting seen attribute")
    num.seen = true
    total += num.value
    //console.log("  new total: ", total)
  })
})

console.log(total)