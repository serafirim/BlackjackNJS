const express = require('express')
const app = express()
const port = 3000

// Initialize a deck of cards (simplified for demonstration)
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(`${rank} of ${suit}`)
    } 
  }
  return deck 
}

// Shuffle the deck (simplified shuffle for demonstration)
function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5)
}

// Deal a card from the deck
function dealCard(deck) {
  return deck.pop()
}

// Calculate the value of a hand
function calculateHandValue(hand) {
  let value = 0
  let hasAce = false

  for (const card of hand) {
    const rank = card.split(' ')[0]
    if (rank === 'A') {
      hasAce = true
      value += 11
    } else if (['K', 'Q', 'J'].includes(rank)) {
      value += 10
    } else {
      value += parseInt(rank)
    }
  }

  // Adjust for Aces
  if (hasAce && value > 21) {
    value -= 10
  }

  return value
}

// Initialize the game
app.get('/play', (req, res) => {
  const deck = shuffleDeck(createDeck())
  const playerHand = [dealCard(deck), dealCard(deck)]
  const dealerHand = [dealCard(deck), dealCard(deck)]

  const playerValue = calculateHandValue(playerHand)
  const dealerValue = calculateHandValue(dealerHand)

  res.send(`
    <h1>Blackjack Game</h1>
    <p>Player's Hand: ${playerHand.join(', ')}</p>
    <p>Player's Total Value: ${playerValue}</p>
    <p>Dealer's Hand: ${dealerHand[0]}, ???</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
