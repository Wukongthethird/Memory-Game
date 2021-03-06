

"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);


createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */



let card1,card2
let card1ID, card2ID

let flippedCard = false;
let gameLock = false

let cardArray = []


function createCards(colors) {

  const gameBoard =  document.getElementsByClassName('game')[0]

  for (let i=0; i< colors.length; i++) {

    const card = document.createElement('div');

      card.setAttribute('class', 'cards');
      card.setAttribute('color-id', colors[i])
      card.setAttribute('data-id', i)

      let frontImg = document.createElement( 'img' );
      let backImg = document.createElement( 'img' );

      backImg.setAttribute('class','backImg')
      backImg.setAttribute('src', 'images/blank.png')
      frontImg.setAttribute('class','frontImg')
      frontImg.setAttribute('src', 'images/' + colors[i]+'.png')    

      card.appendChild(backImg);
      card.appendChild(frontImg);
      
      card.addEventListener('click', handleCardClick);
      gameBoard.appendChild(card);

  }
}
 
/** Flip a card face-up. */
// matching function

function flipCard() {
  
  if( colors[card1ID] === colors[card2ID] && card1ID !== card2ID){
    card1.removeEventListener('click', handleCardClick)
    card2.removeEventListener('click', handleCardClick)
    cardArray.push(card1)
    cardArray.push(card2)
  }
  else{
    unFlipCard(card1)
    unFlipCard(card2)
  }
}

/** Flip a card face-down. */

function unFlipCard(card) {
  gameLock = true;
  setTimeout(()=>{
    card.classList.remove('flipped');
    resetBoard()
   }, 1000);

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {

  if(gameLock ===true){return}
  if(this === card1){return}

  this.classList.add('flipped')
  if(!flippedCard){
    flippedCard = true
    card1 = this;
    card1ID = this.getAttribute('data-id')
    console.log(card1ID)

    return
  }  
  flippedCard = false;
  card2 = this;
  card2ID = this.getAttribute('data-id')
  console.log (card2ID)
  flipCard()
  winCon()
}


function resetBoard(){
  flippedCard = false;
  gameLock = false;
  card1 = undefined;
  card2 = undefined;
  card1ID = undefined
  card2ID = undefined
}

function winCon (){
  if(cardArray.length === colors.length){
    setTimeout(() => {
    alert("You Have Fantastic Memory")
  },500)
}
}





