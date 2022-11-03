const cardContainer = document.querySelector(".card-container");
const drawBtn = document.querySelector(".draw-Btn");
const newDeckBtn = document.querySelector(".newDeck-Btn");
const winnerText = document.querySelector(".winner-text");
let deckId = "";

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardContainer.children[0].innerHTML = `
        <img src="${data.cards[0].image}" class='card' />
      `;
      cardContainer.children[1].innerHTML = `
        <img src="${data.cards[1].image}" class='card' />
      `;

      const winner = whoWon(data.cards[0], data.cards[1]);
      setTimeout(() => {
        winnerText.textContent = winner;
      }, 300);
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
    return "Computer Wins!";
  } else if (card1Index < card2Index) {
    return "You Win!";
  } else {
    return "War!";
  }
}

drawBtn.addEventListener("click", drawCards);
newDeckBtn.addEventListener("click", handleClick);
