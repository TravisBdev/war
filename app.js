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
      data.cards.forEach((card) => {
        document.querySelector(".card-container").innerHTML += `
          <img src="${card.image}" alt="playing card" class='card' />
        `;
      });
    });
}

document.querySelector(".draw-cards").addEventListener("click", drawCards);
document.querySelector(".new-deck").addEventListener("click", handleClick);
