'use strict';

// Setting the score and highscore.
let score = 20;
let highscore = 0;
let randomNumber = getRandomNumber();
let isGameOver = false;

// Random number from 1 to 20.
function getRandomNumber () {
    return Math.floor(Math.random() * (20 - 1) + 1);
};

// Checking the button 'Check!'.
function checkClickedNumber() {
    
        let numberEntered = Number(document.querySelector(".guess").value);
        // console.log("Number entered", numberEntered);
        // console.log("Random number: ", randomNumber);
        // console.log(typeof numberEntered)
        if (numberEntered) {
            if (numberEntered === randomNumber) {
                document.querySelector(".message").innerHTML = "🎉 Correct Number!";
                document.body.style.backgroundColor = "#60b347";
                isGameOver = true;
                if (score > highscore) { 
                    highscore = score;
                    document.querySelector(".highscore").innerHTML = highscore;
                };
            } else {
                if (score > 1) {
                    score--;
                    if (numberEntered > randomNumber) {
                        document.querySelector(".message").innerHTML = "📈 Too high!";
                    } else {
                        document.querySelector(".message").innerHTML = "📉 Too low!";
                    };
                    document.querySelector(".score").innerHTML = score;
                } else {
                    document.querySelector(".message").innerHTML = "💥 You lost the game!";
                    isGameOver = true;
                };
            };
        } else {
            document.querySelector(".message").innerHTML = "⛔️ No number!";
        };
        return;
};

function onceAgain() {
    score = 20;
    randomNumber = getRandomNumber();
    document.querySelector(".message").innerHTML = "Start guessing...";
    document.querySelector(".guess").value = "";
    document.querySelector(".score").innerHTML = 20;
    document.body.style.backgroundColor = "#222";
    // console.log("onceAgain");
};

// Messages: "Too high!", "Too low!"

// Event listener when we want to play again.
// console.log("Before queryselector OnceAgain")
document.querySelector(".again").addEventListener('click', function() { onceAgain()});

// Event listener when we click the button "check!" to check our guess.
if (!isGameOver) {
    document.querySelector(".check").addEventListener('click', function() {checkClickedNumber()});
};
