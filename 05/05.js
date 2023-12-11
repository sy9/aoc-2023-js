import { AOCMap } from './aocmap'

function getSeedRanges(line) {
  const seedRanges = []
  const values = line.trim().split(" ")
  for (let i=0;i<values.length;i+=2)
    seedRanges.push({
      start: parseInt(values[i]),
      size: parseInt(values[i+1])
    })
  return seedRanges
}

const input = await Bun.file("example_input.txt").text()
const inputLines = input.split("\n")
const seeds = inputLines[0].split(":")[1].split(" ").map(str => parseInt(str)).filter(num => num)
const seedRanges = getSeedRanges(inputLines[0].split(":")[1])
const mapChain = []

let aocmap = null
for (const i in inputLines) {
  if (i === "0") continue
  if (inputLines[i] === "") continue
  if (inputLines[i].endsWith(" map:")) {
    if (aocmap !== null) mapChain.push(aocmap)
    aocmap = new AOCMap(inputLines[i].split(" ")[0]) // seed-to-soil, etc. as name
    continue
  }
  const parts = inputLines[i].split(" ")
  if (parts.length !== 3) throw new Error(`parts.length is ${parts.length}, want 3 (line ${i+1})`)
  aocmap.addEntry(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]))

  if (parseInt(i) === inputLines.length-1) mapChain.push(aocmap)
}
let location = null
for (let seed of seeds) {
  for (const m of mapChain) {
    seed = m.lookup(seed)
  }
  if (location == null || seed < location) location = seed
}
console.log(location)

for (let seedRange of seedRanges) {
  const loc = lookupRanges(0, [seedRange])
  console.log("loc: ", loc)
}

function lookupRanges(index, ranges) {
  if (index==mapChain.length) return ranges // done
  const newRanges = []
  for (const range of ranges) {
    newRanges.push(mapChain[index].lookupRange(range.start, range.length))
  }
  return lookupRanges(index+1, newRanges)
}

// matchRange returns an array of range objects, specifying which
// parts of r1 match r2. A range consists of a start and size property.
// The returned ranges also specify a match attribute, set to true or false
// respectively.
function matchRange(r1, r2) {
  // r1 is the input range we try to match against r2

  // r1 .$$$...... or ......$$$.
  // r2 ......$$$.    .$$$......
  if (r2.start > r1.start+r1.size-1 || r1.start > r2.start+r2.size-1) {
    return [
      {
        
      }
    ]
  }
}