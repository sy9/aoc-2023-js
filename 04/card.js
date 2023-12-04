export class Card {
  // Card 173: 72 49 45 75 23 20 90 50 48 94 | 38 34 28 33 91 65 87 19 37 30  9 18 64 14 53 70 49 39 90 79 88 51 12 57 48
  constructor(input) {
    const parts = input.split(":")
    const numbers = parts[1].split("|")
    this.winning = numbers[0].split(" ").map(num => parseInt(num)).filter(num => num)
    this.hasNumbers = numbers[1].split(" ").map(num => parseInt(num)).filter(num => num)
    this.wins = 0 // number of wins for part B, calculated from pointValue()
    this.count = 1
  }

  pointValue() {
    this.winning.forEach(w => {
      if (this.hasNumbers.includes(w)) {
        this.wins++
      }
    })
    return Math.floor(2**(this.wins-1))
  }
}