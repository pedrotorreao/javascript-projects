/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore;

scores = [0,0]; //individual scores
roundScore = 0; //total
activePlayer = 0; //0: Player 1, 1: Player 2

//Math.random() generates a random number from 0 to 1
//Math.floor() rounds the number
dice = Math.floor( Math.random() * 6 ) + 1; 

//querySelector selecting/modifying the HTML element
document.querySelector('#current-'+activePlayer).textContent = dice;

//querySelector selecting/modifying the CSS element
document.querySelector('.dice').style.display = 'none';