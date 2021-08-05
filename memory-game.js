"use strict";
/** Memory game: find matching pairs of cards and flip both of them. */
let count=0;
let lockBoard=false;
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

function createCards(colors) {
  const gameBoard = document.getElementById("game");

for (let color of colors) {
    let ele = null;
    // missing code here ...
  // create the div, assign it a background color of color, append it as a child to #game div
    ele = document.createElement("div");
    ele.classList.add(color,"noColor");
    ele.addEventListener('click',handleCardClick);
    gameBoard.appendChild(ele);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  //need to figure out which div i am clicking on, and then make the display class appear.

  count++;
  card.setAttribute("id","count" + count);
  card.classList.remove('noColor');

}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  //need to figure out which div i am clicking on, and then make the display class appear.
  count--;
  card.removeAttribute("id");
  card.classList.add('noColor');

}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  
  e.preventDefault();
  if (lockBoard){
    return
  };

  let target = e.target;

  if(this.classList.contains('noColor')){

    flipCard(target);
    
  }else unFlipCard(target);

  if(count == 2){
    lockBoard = true;
    if (document.getElementById('count1').classList.item(0) === document.getElementById('count2').classList.item(0)){
      setTimeout(confirmMatch, FOUND_MATCH_WAIT_MSECS);
    }else {
      setTimeout(resetSelected, FOUND_MATCH_WAIT_MSECS);
    }
  }

  // on flip of card -- count++, assign that card an id of card+count. then once count == 2 you check for win and if the c
  // class of count 1 = class of count 2, confirm match by removing event listeners from those cards.
  // when you unflip, the count should minus minus and the id should be removed from that card. 
  // if you check them and there is no match, they should pause and then unflip both cards
  // at the end of that you should check for a win, which is looping through and checking for the class of "noColor" if any of them have it, win not confirmed otherwise alert "congrats!"

}


function confirmMatch(){
  document.getElementById("count1").removeEventListener('click',handleCardClick);
  document.getElementById("count2").removeEventListener('click',handleCardClick);
  document.getElementById("count1").removeAttribute("id");
  document.getElementById("count2").removeAttribute("id");
  count=0;
  lockBoard = false;

}

function resetSelected(){
unFlipCard(document.getElementById("count1"));
unFlipCard(document.getElementById("count2"));
lockBoard = false;
}

