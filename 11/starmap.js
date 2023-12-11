export class StarMap {
  constructor(data, f) {
    this.galaxies = parse(data, f)
  }

  // galaxyPairs returns all pairs of galaxies, already
  // taking into account galaxy expansion
  galaxyPairs() {
    const pairs = []
    for (let i=0;i<this.galaxies.length-1;i++) {
      let j = i+1
      while (j<this.galaxies.length) {
        pairs.push([this.galaxies[i], this.galaxies[j]])
        j++
      }
    }
    return pairs
  }
}

function parse(data, f) {
  const galaxies = []
  const lines = data.split("\n")
  let expansionX = new Array(lines[0].length).fill(f-1), // assume columns are always empty
      expansionY = 0

  for (const y in lines) {
    let foundGalaxy = false
    for (const x in lines[y]) {
      if (lines[y][x] === ".") continue // do... nothing!

      // we found a (new?) galaxy!
      galaxies.push({x: parseInt(x), y: parseInt(y)+expansionY})
      expansionX[x] = 0 // no galaxy expansion on this column
      foundGalaxy = true
    }
    if (!foundGalaxy) expansionY+=f-1 // increase expansionY offset for future galaxies
  }

  // adjust for expansionX
  galaxies.forEach(g => {
    g.x += expansionX.reduce((acc, cur, i) => {
      return g.x > i ? acc + cur : acc
    }, 0)
  })

  return galaxies
}