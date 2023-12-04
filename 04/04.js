import { Card } from './card'
import { Deck } from './deck'

const input = await Bun.file("04_input.txt").text()
const inputLines = input.split("\n")
const deck = new Deck()

let total = 0
inputLines.forEach(line => {
  const card = new Card(line)
  deck.add(card)
  total += card.pointValue()
})
console.log(total)
console.log(deck.count())