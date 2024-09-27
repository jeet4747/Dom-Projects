let random_number = parseInt(Math.random() * 100 + 1);

const submit_btn = document.querySelector('#subt');
const user_input = document.getElementById('guessField');
const previous_guess = document.querySelector('.guesses');
const remaining_chances = document.querySelector('.lastResult');
const result_message = document.querySelector('.lowOrHi');
const reset_game = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevguess = [];
let numguess = 1;

let playGame = true;

if (playGame) {
  submit_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(user_input.value);
    console.log(guess);
    validateGame(guess);
  });
}

function validateGame(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess > 100) {
    alert('Please enter a number less than 100');
  } else if (guess < 1) {
    alert('Please enter a number greater than 1');
  } else {
    prevguess.push(guess);
    if (numguess === 11) {
      display_guess(guess);
      display_msg(`Game over. The random number was ${random_number}`);
      endGame();
    } else {
      display_guess(guess);
      checkguess(guess);
    }
  }
}

function checkguess(guess) {
  if (guess === random_number) {
    display_msg('You guessed it right!');
    endGame();
  } else if (guess > random_number) {
    display_msg('Please enter a smaller number');
  } else if (guess < random_number) {
    display_msg('Please enter a larger number');
  }
}

function display_msg(message) {
  result_message.innerHTML = `<h2>${message}</h2>`;
}

function display_guess(guess) {
  user_input.value = '';
  previous_guess.innerHTML += `${guess}, `;
  numguess++;
  remaining_chances.innerHTML = `${11 - numguess}`;
}

function Newgame() {
  const new_game = document.querySelector('#newgame');
  new_game.addEventListener('click', (e) => {
    random_number = parseInt(Math.random() * 100 + 1);
    prevguess = [];
    numguess = 1;
    remaining_chances.innerHTML = `${10 - numguess}`;
    user_input.removeAttribute('disabled');
    reset_game.removeChild(p);

    playGame = true;
  });
}

function endGame() {
  user_input.value = '';
  user_input.setAttribute('disabled', ''); // Corrected typo here
  p.classList.add('button');
  p.innerHTML = `<h2 id="newgame">Start new Game</h2>`;
  reset_game.appendChild(p);
  playGame = false;
  Newgame();
}
