const colors = [
    "red", "red",
    "yellow", "yellow",
    "blue", "blue",
    "green", "green",
    "purple", "purple",
    "orange", "orange"
];

function shuffle (array) {
    for (let i=array.length- 1; i>0; i--) {
        const j = Math.floor(Math.random()*i);
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(colors);

const gameBoard = document.getElementById("memory");
let flippedCards=[];
let matchedPairs=0;

colors.forEach(color => {
    const card=document.createElement("div");
    card.classList.add("card");

    const front=document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundColor = color;

    card.appendChild(front);
    card.appendChild(back);
    gameBoard.appendChild(card);

    card.addEventListener("click", () => flipCard(card, color));
});

function flipCard(card, color) {
    if (flippedCards.length === 2 || card.classList.contains("flipped")) return;
        card.classList.add("flipped");
        flippedCards.push({card, color});
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.color === card2.color) {
        setTimeout(()=>{
            card1.card.classList.add("revealed");
            card2.card.classList.add("revealed");
            flippedCards=[];
            matchedPairs++;

            if (matchedPairs === 6) {
                alert("Bravo ! Vous avez trouvé toutes les paires");
            }
        }, 500);
    } else {
        setTimeout(()=> {
            card1.card.classList.remove("flipped");
            card2.card.classList.remove("flipped");
            flippedCards=[];
        }, 1000)
    }
}