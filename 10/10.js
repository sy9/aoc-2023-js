import { Cells  } from './cells'

const input = await Bun.file("10_input.txt").text()
const maze = input.split("\n")

const maze2 = []
for (const line of input.split("\n")) {
  const row = []
  for (const pipe of line) {
    row.push({"status": "unseen"})
  }
  maze2.push(row)
}

const [startX, startY] = findStart(maze)
let x = startX, y = startY-1
let dir = "down"
//let x = startX, y = startY+1
//let dir = "up"
const path = []

console.log("start:", startX, startY)
do {
  maze2[y][x].status = "MAINPIPE"
  maze2[y][x].value = maze[y][x]
  path.push({x: x, y: y, dir: dir, pipe: maze[y][x]})
  console.log(path.length, x, y, dir, maze[y][x])
  if (maze[y][x] === "S") break
  const response = nextCell(maze[y][x], dir)
  x += response.offsetX
  y += response.offsetY
  dir = response.dir
} while (x !== startX || y !== startY)

let count = 0
let isOutside = true
let pipeSeen = false
for (const y in maze2) {
  for (const x in maze2[y]) {
    if (maze2[y][x].status === "MAINPIPE") {
      pipeSeen = true
      continue
    }
    if (pipeSeen) {
      pipeSeen = false
      isOutside = remainingXingPipeSegs(maze2[y], x) % 2 === 0 ? true : false
    }
    if (!isOutside) count++
  }
}
console.log(count)

function remainingXingPipeSegs(line, start) {
  let count = 0
  let inboundDirection = null
  for (let i=start; i<line.length; i++) {
    if (line[i].status !== "MAINPIPE") continue
    if (line[i].value === "|") {
      count++
      continue
    }
    if (line[i].value === "F") {
      inboundDirection = "bottom"
      continue
    }
    if (line[i].value === "L") {
      inboundDirection = "top"
      continue
    }
    if (line[i].value === "-") continue
    if (line[i].value === "7") {
      if (inboundDirection === "top") count++
      inboundDirection = null
      continue
    }
    if (line[i].value === "J") {
      if (inboundDirection === "bottom") count++
      inboundDirection = null
      continue
    }
  }
  console.log("remain:", start, count)
  return count
}


console.log(count)
function nextCell(p, dir) {
  return Cells[p][dir]
}

function findStart(m) {
  for (let y in m) {
    let x = m[y].indexOf("S")
    if (x !== -1) {
      return [x, y]
    }
  }
  throw new Error("no start found")
}