import { Game } from './game.js'

const input = Bun.file("02_input.txt")
const txt = await input.text()
let total = 0;
let power = 0;

for (let line of txt.split("\n")) {
  const game = new Game(line)
  total += game.isPossible({
    red: 12,
    green: 13,
    blue: 14
  })
  power += game.power()

}

console.log(`total = ${total}`)
console.log(`power = ${power}`)