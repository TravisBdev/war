const cardContainer = document.querySelector(".card-container");
const drawBtn = document.querySelector(".draw-Btn");
const newDeckBtn = document.querySelector(".newDeck-Btn");
const winnerText = document.querySelector(".winner-text");
const cardsRemaining = document.querySelector(".cards-remaining");
const computerScore = document.querySelector(".computer-score");
const yourScore = document.querySelector(".your-score");
let scores = {
  computer: 0,
  you: 0,
};
let deckId = "";
drawBtn.disabled = true;

function handleClick() {
  drawBtn.disabled = false;
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      cardsRemaining.textContent = `Cards Remaining: ${data.remaining}`;
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      cardContainer.children[0].innerHTML = `
        <img src="${data.cards[0].image}" class='card' />
      `;
      cardContainer.children[1].innerHTML = `
        <img src="${data.cards[1].image}" class='card' />
      `;

      const winner = whoWon(data.cards[0], data.cards[1]);
      winnerText.textContent = winner;

      if (data.remaining === 0) {
        drawBtn.disabled = true;
        if (computerScore > yourScore) {
          winnerText.textContent = "Computer wins the war";
        } else if (yourScore > computerScore) {
          winnerText.textContent = "You win the war";
        } else {
          winnerText.textContent = "It's a Draw";
        }
      }

      cardsRemaining.textContent = `Cards Remaining: ${data.remaining}`;
    });
}

function whoWon(card1, card2) {
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1Index = values.indexOf(card1.value);
  const card2Index = values.indexOf(card2.value);

  if (card1Index > card2Index) {
    scores.computer++;
    computerScore.textContent = `Computer Score: ${scores.computer} `;
    return "Computer Wins!";
  } else if (card1Index < card2Index) {
    scores.you++;
    yourScore.textContent = `Your Score: ${scores.you}`;
    return "You Win!";
  } else {
    return "War!";
  }
}

// function checkForWinner(score1, score2) {
//   if (score1 > score2) {
//     return "Computer Wins the War!";
//   } else if (score1 < score2) {
//     return "You Win the War!";
//   } else {
//     return "It's a tie";
//   }
// }

drawBtn.addEventListener("click", drawCards);
newDeckBtn.addEventListener("click", handleClick);
