import { compareHands, handTypes, handTypeJoker, compareHandsJoker } from './poker'

const hands = []

const input = await Bun.file("07_input.txt").text()
const inputLines = input.split("\n")
for (const line of inputLines) {
  const [hand, bid] = line.split(" ")
  hands.push({ hand: hand, bid: parseInt(bid)})
}

hands.sort((a, b) => compareHands(a.hand, b.hand))
const total = hands.reduce((acc, val, idx) => acc + val.bid * (idx+1), 0)
console.log("part a: ", total)
hands.sort((a, b) => compareHandsJoker(a.hand, b.hand))
const totalJoker = hands.reduce((acc, val, idx) => acc + val.bid * (idx+1), 0)
console.log("part b: ", totalJoker)