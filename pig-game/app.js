/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


  Challenge 1 - A player loses his entire score when he rolls two 6s in a row. After that, it is the next player's turn.
  Challenge 2 - Add an input field to the HTML where players can set the winning score, so that they can change the predefined
                score of 100.
  Challenge 3 - Add another dice to the game, so there are tow dices now. The player loses his score when one of them is a 1.
*/
var scores, roundScore, activePlayer, gamePlaying, prevDice, prevDice2;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. random number
    var dice = Math.floor( Math.random() * 6 ) + 1;

    /* -- Challenge 3 -- */ 
    var dice2 = Math.floor( Math.random() * 6 ) + 1;
    /* ----------------- */
    

    //2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    /* -- Challenge 3 -- */ 
    var dice2DOM = document.querySelector('.dice--2');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';
    /* ----------------- */

    //3. update the round score IF the rolled number was neither 1 nor two 6s in a row
    if ((dice !== 1) && ((prevDice + dice) !== 12) && (dice2 !== 1) && ((prevDice2 + dice2) !== 12)) { 
      //Add score
      roundScore = roundScore + dice + dice2;
      prevDice = dice; //Stores the current value of dice which will soon be the previous
      prevDice2 = dice2;

      document.querySelector('#current-'+activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }

  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    var finalScore = document.getElementById("finalScore").value;


    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the GLOBAL score on the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= finalScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice--2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Hide dice when switching players
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice--2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {
  scores = [0,0]; //individual scores
  roundScore = 0; //total
  activePlayer = 0; //0: Player 1, 1: Player 2
  gamePlaying = true;
  //querySelector selecting/modifying the HTML element
  //document.querySelector('#current-'+activePlayer).textContent = dice;

  //querySelector selecting/modifying the CSS element
  //setting the display property to none so the dice is not shown before the game begins
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice--2').style.display = 'none';

  //Setting all the scores to zero initially
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

//Math.random() generates a random number from 0 to 1
//Math.floor() rounds the number
//dice = Math.floor( Math.random() * 6 ) + 1