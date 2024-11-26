const Limages = [
    "images/gif1.gif", "images/gif1.gif",
    "images/gif3.gif", "images/gif3.gif",
    "images/gif10.gif", "images/gif10.gif",
    "images/gif12.gif", "images/gif12.gif",
    "images/Hatsune-Miku-8.jpg", "images/Hatsune-Miku-8.jpg",
    "images/Miku.jpeg", "images/Miku.jpeg",
    "images/gif14.gif", "images/gif14.gif",
    "images/Miku_cute.jpg", "images/Miku_cute.jpg"
];

//aléatoire (pour que le mémory ne soit pas toujours identique)
function al3atoire(liste) {
    //taille de la liste-1 (car commence à 0) ; S'arrête quand i=0 ; i diminue de 1 à chaque itération.
    for (let i=liste.length-1;i>0;i--) {
        // Math.floor()=Nombre avant la virgule (5.95->5)
        // Math.random()=Nombre aléatoire entre 0 et 1 (jamais 1)
        const j=Math.floor(Math.random()*i);
        // échange de deux images différentes
        [liste[i], liste[j]] = [liste[j], liste[i]];
    }
}
al3atoire(Limages);

//création de variables (il faut les créer ici, car les fonctions qui les contiennent sont anoncées en-dessous)
let cartesrévélées=[];
let matchedPairs=0;
//création d'une constante liée à la div "memory"
const Memory = document.getElementById("memory");

Limages.forEach (truc => {
    // Créaction de 3 div avec des classes différentes
    const card=document.createElement("div");
    card.classList.add("card");

    const front=document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    //jsp
    console.log(truc);
    
    back.style.background = `url(${truc})`;
    back.style.backgroundSize = '100%';
    back.style.backgroundRepeat = 'no-repeat';
    back.style.backgroundPosition = 'top';

    // Ajout des div "front" et "back" à la div "card"
    card.appendChild(front);
    card.appendChild(back);
    // Ajout de la div "card" à la div "memory" dans l'html
    Memory.appendChild(card);
    // Lorsque l'on clique sur l'élément créé, active la fonction "flipCard" (qui révèle une carte) avec les éléments "card" (l'élémetn créé) et "hide" (l'image cachée)
    card.addEventListener("click", () => flipCard(card, truc));
});

function flipCard(card, truc) {
    // pas compris, mais probablement ce qui permet de révéler la carte
    if (cartesrévélées.length === 2 || card.classList.contains("flipped")) return;
        //ajout de la classe "flipped" à la carte, permettant qu'elle se révèle
        card.classList.add("flipped");
        //ajout d'une liste contenant la carte et l'image cachée dans la liste "révélées"
        //permet de savoir quelle image se retourne
        cartesrévélées.push({card, truc});
    //si deux cartes sont retournées
    if (cartesrévélées.length === 2) {
        //lance la fonction "checkMatch" qui vérifie si les cartes sont identiques ou s'il faut les cacher à nouveau
        checkMatch();
    }
}


function checkMatch() {
    //card1=première carte révélée, card2=deuxième carte révélée
    const [card1, card2] = cartesrévélées;
    //si les deux cartes sont identiques :
    if (card1.truc === card2.truc) {
        // permet d'attendre 300ms (pour que ce ne soit pas instantané lorsque l'on clique sur la 2e carte)
        setTimeout(()=>{
            //révèle de manière permanente les deux cartes
            card1.card.classList.add("revealed");
            card2.card.classList.add("revealed");
            //vide la liste 
            cartesrévélées=[];
            //ajoute une paire au compte (lorsque 6 sont découvertes, le jeu est fini)
            matchedPairs++;

            //annonce de réussite
            if (matchedPairs === 8) {
                document.getElementById("gagné").innerHTML=("Victoire !");
            }
        }, 600);
    } else {
        setTimeout(()=> {
            //recache les cartes
            card1.card.classList.remove("flipped");
            card2.card.classList.remove("flipped");
            //vide la liste
            cartesrévélées=[];
        }, 800)
    }
}
