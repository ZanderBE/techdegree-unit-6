// Const Variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const phraseUl = document.querySelector('#phrase ul');
const title = document.querySelector('.title');

// Let Variables
let wrongGuess = 0;

// Event Listener for start game button
startGame.addEventListener('click', () => {
  overlay.style.display = 'none';
  // Checks if page should be reloaded to start new game
  if (startGame.classList.contains('new__game')) {
    location.reload();
  }
  addPhraseToDisplay(phrases);
});

// Array of phrases
const phrases = [
  'Diamond in the rough',
  'Head over heels',
  'Penny for your thoughts',
  'Shot heard around the world',
  'Barking up the wrong tree'
];

// Selects a random phrase from phrases array
function getRandomPhraseArray(array){
  let randomPhrase = Math.floor(Math.random()*array.length);
  let newArray = array[randomPhrase];
  return newArray.split("");
}

// Adds randomly selected phrase and displays to user
function addPhraseToDisplay(array){
  array = getRandomPhraseArray(array);
  for (let i=0; i < array.length; i++) {
    let listCharacter = document.createElement('li');
    let arrayCharacter = array[i];
    listCharacter.textContent = arrayCharacter;
    phraseUl.appendChild(listCharacter);
    if (arrayCharacter !== ' ') {
      listCharacter.classList.add('letter');
    } else {
      listCharacter.classList.add('space');
    }
  }
}

// Checks the button the user has selected against the randomly chosen phrase
function checkLetter(selectedButton) {
  let letters = document.querySelectorAll('.letter');
  let checkedLetter = null;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent.toLowerCase() === selectedButton.textContent) {
      letters[i].classList.add('show');
      checkedLetter = selectedButton;
    }
  }
  return checkedLetter;
}

// Event Listener for the Keyboard presses by the user
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.disabled = true;
    let letterFound = checkLetter(e.target);
    // Count the missed guesses by the user
    if (letterFound === null) {
      let lives = document.querySelectorAll('img');
      lives[wrongGuess].src = 'images/lostHeart.png';
      ++wrongGuess;
    }
    checkWin();
  }
});

// Check if the user has won the game
function checkWin() {
  let show = document.querySelectorAll('.show').length;
  let letters = document.querySelectorAll('.letter').length;
  if (wrongGuess === 5) {
    overlay.style.display = '';
    overlay.classList.add('lose');
    title.textContent = 'you lost! better luck next time!';
    startGame.classList.add('new__game');
    startGame.textContent = 'Try Again!';
  } else if (show === letters) {
    overlay.style.display = '';
    overlay.classList.add('win');
    title.textContent = 'you win! nice job!';
    startGame.classList.add('new__game');
    startGame.textContent = 'Try Again!';
  }
}

// Recreate the buttons in the Keyboard

// Generate a new random phrases

// Set number of misses to zero
