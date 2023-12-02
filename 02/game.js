export class Game {
  // Game 1: 2 green, 6 blue, 7 red; 12 green, 6 blue, 3 red; 5 red, 18 green, 4 blue
  constructor(line){
    const data = parse(line)
    this.id = data.id
    this.draws = data.draws
  }

  isPossible(limits) {
    for (const draw of this.draws) {
      for (const color of Object.keys(draw)) {
        if (draw[color] > limits[color]) return 0
      }
    }
    return this.id
  }

  power() {
    const maxCountsPerColor = {}
    for (const draw of this.draws) {
      for (const color of Object.keys(draw)) {
        if (!maxCountsPerColor[color] || draw[color] > maxCountsPerColor[color]) {
          maxCountsPerColor[color] = draw[color]
        }
      }
    }
    return Object.keys(maxCountsPerColor).reduce((acc, curr) => acc *= maxCountsPerColor[curr], 1)
  }
}

function parse(line) {
  const parts = line.split(":")
  const id = parts[0].substring("Game ".length)
  const draws = [];
  parts[1].split(";").forEach(draw => {
    const drawObj = {}
    draw.split(",").forEach(single => {
      const [count, color] = single.trim().split(" ")
      drawObj[color] = parseInt(count)
    })
    draws.push(drawObj)
  })
  

  return {
    id: parseInt(id),
    draws: draws
  }
}
