'use strict';

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let player = 1;
let newCurrent1 = 0;
let newCurrent2 = 0;
let totalScore1 = 0;
let totalScore2 = 0;

rollDiceBtn.addEventListener('click', rollDice());
holdBtn.addEventListener('click', holdScore(player));
// newGameBtn.addEventListener('click', gameBegins());

function rollDice() {
    const diceNumber = Math.floor(Math.random() * (6 - 1) + 1);
    console.log(diceNumber);
    switch (diceNumber) {
        case 1:
            document.querySelector('.dice').src = "dice-1.png";
            if (player === 1) {
                player = 2;
                document.getElementById('score--0').textContent = '0';
                document.getElementById('current--0').textContent = '0';
                document.querySelector('.player--0').classList.remove('player--active');
                document.querySelector('.player--1').classList.add('player--active');
            } else {
                player = 1;
                document.getElementById('score--1').textContent = '0';
                document.getElementById('current--1').textContent = '0';
                document.querySelector('.player--1').classList.remove('player--active');
                document.querySelector('.player--0').classList.add('player--active');
            };
            break;
        case 2:
            document.querySelector('.dice').src = "dice-2.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 2;
            } else {
                newCurrent2 = newCurrent2 + 2;
            };
            document.getElementById('.dice').textContent = newCurrent;
            break;
        case 3:
            document.querySelector('.dice').src = "dice-3.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 3;
            } else {
                newCurrent2 = newCurrent2 + 3;
            };
            document.getElementById('.dice').textContent = newCurrent;
            break;
        case 4:
            document.querySelector('.dice').src = "dice-4.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 4;
            } else {
                newCurrent2 = newCurrent2 + 4;
            };
            document.getElementById('.dice').textContent = newCurrent;
            break;
        case 5:
            document.querySelector('.dice').src = "dice-5.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 5;
            } else {
                newCurrent2 = newCurrent2 + 5;
            };
            document.getElementById('.dice').textContent = newCurrent;
            break;
        case 6:
            document.querySelector('.dice').src = "dice-6.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 6;
            } else {
                newCurrent2 = newCurrent2 + 6;
            };
            document.getElementById('.dice').textContent = newCurrent;
            break;
    };
};

function holdScore(player) {

}
