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
      document.querySelector(".card-container").children[0].innerHTML = `
        <img src="${data.cards[0].image}" class='card' />
      `;
      document.querySelector(".card-container").children[1].innerHTML = `
        <img src="${data.cards[1].image}" class='card' />
      `;
    });
}

document.querySelector(".drawBtn").addEventListener("click", drawCards);
document.querySelector(".newDeckBtn").addEventListener("click", handleClick);
