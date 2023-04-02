'use strict';

////////////////////////////////////////////////////////////////////
// Modal section for the instruction

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

// function for the hidden modal and overlay to appear when clicked
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// function for the modal and overlay to be hidden when clicked again.
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for loop for the modal btns to work when clicked
for (let i = 0; i < btnOpenModal.length; i++)
  btnOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////
// For players to enter own name

const enterName0El = document.querySelector('.player0-name');
const enterName1El = document.querySelector('.player1-name');

enterName0El.addEventListener('click', function () {
  const newName = prompt('Player 1, please enter your name');
  enterName0El.textContent = `${newName}`;
});

enterName1El.addEventListener('click', function () {
  const newName = prompt('Player 2, please enter your name');
  enterName1El.textContent = `${newName}`;
});

////////////////////// LET'S PLAY THE GAME ////////////////////////
// selecting elements

// players
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

// player names
const playerName0El = document.getElementById('name-0');
const playerName1El = document.getElementById('name-1');

// players global scores
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');

// players current scores
const currentScore0El = document.getElementById('current-0');
const currentScore1El = document.getElementById('current-1');

// buttons and dice
const diceEl = document.querySelector('.dice');
const newGameEl = document.querySelector('.new-game');
const rollDiceEl = document.querySelector('.roll-dice');
const holdEl = document.querySelector('.hold');

// message to tell players that they rolled a 1
const messageEl0 = document.querySelector('.hidden-msg0');
const messageEl1 = document.querySelector('.hidden-msg1');

////////////////////////////////////////////////////////////////////
// Variables that need to be in global scope to be reused in multiple block scopes:
let scores, currentScore, activePlayer, playing;

////////////////////////////////////////////////////////////////////
// A function to reset the game when 'new game' is clicked

const init = function () {
  scores = [0, 0]; //these are players' global scores in an array
  currentScore = 0;
  activePlayer = 0;
  playing = true; //to stop the game once a player wins.

  // reset the global scores
  score0El.textContent = 0;
  score1El.textContent = 0;

  // reset the current scores
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // reset the winner color
  diceEl.classList.add('hidden-dice');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');

  // reset the active class
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');

  // reset the "Winner" message
  playerName0El.textContent = 'Enter player name...';
  playerName1El.textContent = 'Enter player name...';

  // reset the text color
  playerName0El.style.color = '#333';
  playerName1El.style.color = '#333';

  // reset the message that players rolled a 1
  messageEl0.classList.add('hidden-msg0');
  messageEl1.classList.add('hidden-msg1');
};

init();

////////////////////////////////////////////////////////////////////
// Switching players
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};

////////////////////////////////////////////////////////////////////
// to make the roll dice button work
rollDiceEl.addEventListener('click', function () {
  if (playing) {
    //1. generate a random number
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    //2. display the matching die number to the randomly generated number
    diceEl.classList.remove('hidden-dice');
    diceEl.src = `img/dice-${dice}.png`;

    // remove the message that players rolled a 1
    messageEl0.classList.add('hidden-msg0');
    messageEl1.classList.add('hidden-msg1');

    // 3. check if 1 is rolled
    if (dice !== 1) {
      // if false
      currentScore += dice; //add the rolled number to the current score.
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true but also add message that the player rolled a 1.
      if (activePlayer === 0) {
        messageEl0.classList.remove('hidden-msg0');
      } else {
        messageEl1.classList.remove('hidden-msg1');
      }
      switchPlayer();
    }
  }
});

////////////////////////////////////////////////////////////////////
// To add the current score to global score when 'hold' button is clicked, then switch player.

holdEl.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; //to add current score to global score

    // to display this in the global score
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    // if a player has a global score of 100 or more.
    if (scores[activePlayer] >= 100) {
      // game is over, active player wins the game.
      playing = false;
      diceEl.classList.add('hidden-dice');

      // to change name to "winner"
      document.getElementById(`name-${activePlayer}`).textContent =
        '🥳 Winner! 🥳';
      document.getElementById(`name-${activePlayer}`).style.color = '#309130';

      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      // if false
      switchPlayer();
    }
  }
});

////////////////////////////////////////////////////////////////////
// to reset the entire game
newGameEl.addEventListener('click', init);
