const cardContainer = document.querySelector(".card-container");
const drawBtn = document.querySelector(".drawBtn");
const newDeckBtn = document.querySelector(".newDeckBtn");
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
    });
}

drawBtn.addEventListener("click", drawCards);
newDeckBtn.addEventListener("click", handleClick);
