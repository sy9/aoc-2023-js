const input = await Bun.file("08_input.txt").text()
const lines = input.split("\n")
const instructions = lines[0]
const startingNodenames = []

const network = new Map()
const regex = /(...) \= \((...), (...)\)/;

let instrIndex = 0, nodename = "AAA", steps = 0;
lines.forEach((line, idx) => {
  if (idx < 2) return
  const found = line.match(regex)
  network.set(found[1], {
    l: found[2],
    r: found[3]
  })
  if (found[1].endsWith("A")) startingNodenames.push(found[1])
})

console.log(startingNodenames)
while (nodename != "ZZZ") {
  steps++
  const next = network.get(nodename)
  nodename = instructions[instrIndex] === "L" ? next.l : next.r
  instrIndex = (instrIndex + 1) % instructions.length
}

console.log("part a:", steps)

/*

8 16 24 32 40 48
4 8 16

*/

// 14.631.604.759.649
// for each starting node, check after how many steps we reach a node
// ending with "Z"
steps = 0, instrIndex = 0
const stepsPerNode = []
startingNodenames.forEach(nodename => {
  let found = false
  let startnode = nodename
  let zfound = 0
  while (!found) {
    steps++
    const next = network.get(nodename)
    nodename = instructions[instrIndex] === "L" ? next.l : next.r
    instrIndex = (instrIndex + 1) % instructions.length
    if (nodename.endsWith("Z")) {
      console.log(startnode, "=>", nodename, steps)
      stepsPerNode.push(steps)
      steps = 0
      instrIndex = 0
      found=true
      
    }
  }
})
console.log(stepsPerNode)
console.log(stepsPerNode.reduce((acc, curr) => acc *= curr, 1))

// online kgV (least common multiple) tool: 14631604759649