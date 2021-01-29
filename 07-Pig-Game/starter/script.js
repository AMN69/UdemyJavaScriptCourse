'use strict';

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let player = 1;
let newCurrent1 = 0;
let newCurrent2 = 0;
let totalScore1 = 0;
let totalScore2 = 0;

rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', gameBegins);

function rollDice() {
    const diceNumber = Math.round(Math.random() * (6 - 1) + 1);
    console.log(diceNumber);
    switch (diceNumber) {
        case 1:
            document.querySelector('.dice').src = "dice-1.png";
            if (player === 1) {
                player = 2;
                newCurrent1 = 0;
                document.getElementById('current--0').textContent = "0";
                document.querySelector('.player--0').classList.remove('player--active');
                document.querySelector('.player--1').classList.add('player--active');
            } else {
                player = 1;
                newCurrent2 = 0;
                document.getElementById('current--1').textContent = "0";
                document.querySelector('.player--1').classList.remove('player--active');
                document.querySelector('.player--0').classList.add('player--active');
            };
            break;
        case 2:
            document.querySelector('.dice').src = "dice-2.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 2;
                document.getElementById('current--0').textContent = newCurrent1.toString();
            } else {
                newCurrent2 = newCurrent2 + 2;
                document.getElementById('current--1').textContent = newCurrent2.toString();
            };
            break;
        case 3:
            document.querySelector('.dice').src = "dice-3.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 3;
                document.getElementById('current--0').textContent = newCurrent1.toString();
            } else {
                newCurrent2 = newCurrent2 + 3;
                document.getElementById('current--1').textContent = newCurrent2.toString();
            };
            break;
        case 4:
            document.querySelector('.dice').src = "dice-4.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 4;
                document.getElementById('current--0').textContent = newCurrent1.toString();
            } else {
                newCurrent2 = newCurrent2 + 4;
                document.getElementById('current--1').textContent = newCurrent2.toString();
            };
            break;
        case 5:
            document.querySelector('.dice').src = "dice-5.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 5;
                document.getElementById('current--0').textContent = newCurrent1.toString();
            } else {
                newCurrent2 = newCurrent2 + 5;
                document.getElementById('current--1').textContent = newCurrent2.toString();
            };
            break;
        case 6:
            document.querySelector('.dice').src = "dice-6.png";
            if (player === 1) {
                newCurrent1 = newCurrent1 + 6;
                document.getElementById('current--0').textContent = newCurrent1.toString();
            } else {
                newCurrent2 = newCurrent2 + 6;
                document.getElementById('current--1').textContent = newCurrent2.toString();
            };
            break;
    };
};

function holdScore() {
    if (player === 1) {
        totalScore1 = totalScore1 + newCurrent1;
        newCurrent1 = 0;
        player = 2;
        document.getElementById('score--0').textContent = totalScore1.toString();
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
        if (totalScore1 > 99) {
            document.querySelector('.player--0').classList.add('player--winner');
        };
    } else {
        totalScore2 = totalScore2 + newCurrent2;
        newCurrent2 = 0;
        player = 1;
        document.getElementById('score--1').textContent = totalScore2.toString();
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
        if (totalScore2 > 99) {
            document.querySelector('.player--1').classList.add('player--winner');
        };
    };
};

function gameBegins() {
    newCurrent1 = 0;
    newCurrent2 = 0;
    if (totalScore1 > 99) {
        document.querySelector('.player--0').classList.remove('player--winner');
    };
    if (totalScore2 > 99) {
        document.querySelector('.player--1').classList.remove('player--winner');
    };
    totalScore1 = 0;
    totalScore2 = 0;
    document.getElementById('current--0').textContent = "0";
    document.getElementById('score--0').textContent = "0";
    document.getElementById('current--1').textContent = "0";
    document.getElementById('score--1').textContent = "0";
    if (player === 2) {
        document.querySelector('.player--0').classList.add('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
    };
    player = 1;
};
