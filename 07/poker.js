export const handTypes = {
  'fiveofakind':  7,
  'fourofakind':  6,
  'fullhouse':    5,
  'threeofakind': 4,
  'twopairs':     3,
  'onepair':      2,
  'highcard':     1,
  1: 'High Card',
  2: 'One Pair',
  3: 'Two Pairs',
  4: 'Three Of A Kind',
  5: 'Full House',
  6: 'Four Of A Kind',
  7: 'Five Of A Kind'
}

export function handTypeJoker(hand) {
  const cardCounts = {}
  for (const card of hand) {
    cardCounts[card] == undefined ? cardCounts[card] = 1 : cardCounts[card] += 1
  }
  if (!cardCounts["J"]) return handType(hand)
  if (cardCounts["J"] === 5 || cardCounts["J"] === 4) return handTypes['fiveofakind']
  const keys = Object.keys(cardCounts)
  if (cardCounts["J"] === 3) {
    if (keys.length === 3) return handTypes['fourofakind']
    return handTypes['fiveofakind']
  }
  if (cardCounts["J"] === 2) {
    if (keys.length === 4) return handTypes['threeofakind']
    if (keys.length === 3) return handTypes['fourofakind']
    return handTypes['fiveofakind']
  }
  if (keys.length === 2) return handTypes['fiveofakind']
  if (keys.length === 3) {
    // J2223 or J2233
    for (const key of keys) {
      if (cardCounts[key] === 3) {
        return handTypes['fourofakind']
      }
    }
    return handTypes['fullhouse']

  }
  // J8876
  if (keys.length === 4) return handTypes['threeofakind']
  
  return handTypes['onepair']
}

export function handType(hand) {
  const cardCounts = {}
  for (const card of hand) {
    cardCounts[card] == undefined ? cardCounts[card] = 1 : cardCounts[card] += 1
  }
  const keys = Object.keys(cardCounts)
  if (keys.length === 1) return handTypes['fiveofakind']
  if (keys.length === 2) {
    // four of a kind or full house
    for (const key of keys) {
      if (cardCounts[key] === 4) {
        return handTypes['fourofakind']
      }
    }
    return handTypes['fullhouse']
  }
  if (keys.length === 3) {
    // three of a kind or two pairs
    for (const key of keys) {
      if (cardCounts[key] === 3) {
        return handTypes['threeofakind']
      }
    }
    return handTypes['twopairs']
  }
  if (keys.length === 4) return handTypes['onepair']
  return handTypes['highcard']
}

const cardValuesJoker = "AKQT98765432J"
function cardValueJoker(card) {
  return cardValuesJoker.length - cardValuesJoker.indexOf(card)
}
const cardValues = "AKQJT98765432"
function cardValue(card) {
  return cardValues.length - cardValues.indexOf(card)
}

export function compareHands(a, b) {
  const hta = handType(a),
        htb = handType(b)
  if (hta > htb) return 1
  if (hta < htb) return -1
  for (const i in a) {
    const cva = cardValue(a[i]),
          cvb = cardValue(b[i]);
    
    if (cva === cvb) continue
    if (cardValue(a[i]) > cardValue(b[i])) return 1
    return -1
  }
}

export function compareHandsJoker(a, b) {
  const hta = handTypeJoker(a),
        htb = handTypeJoker(b)
  if (hta > htb) return 1
  if (hta < htb) return -1
  for (const i in a) {
    const cva = cardValueJoker(a[i]),
          cvb = cardValueJoker(b[i]);
    
    if (cva === cvb) continue
    if (cva > cvb) return 1
    return -1
  }
}