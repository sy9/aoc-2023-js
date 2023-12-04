export class Deck {
  constructor(){
    this.cards = []
  }

  add(card) {
    this.cards.push(card)
  }

  count() {
    this.cards.forEach((card, idx, cards) => {
      for (let iter=0;iter<card.count;iter++) {
        for (let i=idx+1;i<idx+1+card.wins;i++) {
          cards[i].count++
        }
      }
    })
    return this.cards.reduce((total, current) => total + current.count, 0)
  }
}