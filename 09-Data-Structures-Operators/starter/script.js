'use strict';

const game = {
  team1: 'Bayern Munich', 
  team2: 'Borrussia Dortmund', 
  players: [
    [
    'Neuer',
    'Pavard',
    'Martinez',
    'Alaba',
    'Davies',
    'Kimmich',
    'Goretzka',
    'Coman',
    'Muller',
    'Gnarby',
    'Lewandowski'
    ], 
    [
    'Burki',
    'Schulz',
    'Hummels',
    'Akanji',
    'Hakimi',
    'Weigl',
    'Witsel',
    'Hazard',
    'Brandt',
    'Sancho',
    'Gotze'
    ], 
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  }, 
};

/* 1. Create one player array for each team (variables 'players1' and 'players2')
*/
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

/* 2. The first player in any player array is the goalkeeper and the others are field
 players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's 
 name, and one array ('fieldPlayers') with all the remaining 10 field players
*/

let gk;
let fieldPlayers = [];

[gk, ...fieldPlayers] = game.players[0];

console.log("Goalkeeper: ", gk);
console.log("Field players: ", fieldPlayers);

/* 3. Create an array 'allPlayers' containing all players of both teams (22 players)
*/

let allPlayers = [];

// Array.prototype.push.apply(allPlayers = Array.from(game.players[0]), game.players[1]);
Array.prototype.push.apply(allPlayers = [...game.players[0], ...game.players[1]]);

console.log("All players: ", allPlayers);
console.log(game.players);

/* 4. During the game, Bayern Munich (team1) used 3 substitute players. So create a new array 
('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'.
*/

let players1Final = [];
// Array.prototype.push.apply(players1Final = Array.from(game.players[0]), ['Thiago', 'Coutinho', 'Perisic']);
Array.prototype.push.apply(players1Final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic']);
// [players1Final] = [Array.from(game.players[0]), 'Thiago', 'Coutinho', 'Perisic'];
console.log("Players1Final: ", players1Final);
console.log(game.players);

/* 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
*/

let [team1, draw, team2] = [ game.odds.team1, game.odds.x, game.odds.team2 ];
console.log("Team1: ", team1);
console.log("draw: ", draw);
console.log("Team2: ", team2);

/* 6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and 
prints each of them to the console, along with the number of goals that were scored in total 
(number of player names passed in) 
*/

// [AMN] Using arguments
function printGoals () {
  console.log('1st method) The players that scored are: ')
  for (let i = 0; i < arguments.length; i++) {
    console.log(`- ${arguments[i]}`);
  };
  console.log('The number of goals were: ' + arguments.length);
};

// [AMN] Using ...rest operator. 
function printGoals2 (...goals) {
  console.log('2nd method) The players that scored are: ')
  for (let i = 0; i < goals.length; i++) {
    console.log(`- ${goals[i]}`);
  };
  console.log('The number of goals were: ' + arguments.length);
}

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(game.scored[0], game.scored[1], game.scored[2], game.scored[3]);

printGoals2('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals2(game.scored[0], game.scored[1], game.scored[2], game.scored[3]);


/* 7. The team with the lower odd is more likely to win. Print to the console which team is more likely 
to win, without using an if/else statement or the ternary operator. 
*/

function whoIsLikelyToWin () {
  if (game.odds.team1 > game.odds.team2) {
    return game.team2;
  } else {
    return game.team1;
  };
};

console.log(whoIsLikelyToWin());

/* Coding Challenge #2
Let's continue with our football betting app! Keep using the 'game' variable from before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console, along with the goal number 
(Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, 
  you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds 
and the game objects have the same property names 😉
4. Bonus:Create an object called 'scorers' which contains the names of the players who scored as properties, and 
the number of goals as the value. In this game, it will look like this:
     {
       Gnarby: 1,
       Hummels: 1,
       Lewandowski: 2
}
GOOD LUCK 😀
*/

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number 
// (Example: "Goal 1: Lewandowski")

console.log("classical for loop");
for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i+1}: ${game.scored[i]}`);
};

// for of loop (new way)
console.log("for of loop without desestructuring");
for (const playerName of game.scored.entries()) {
  console.log(`Goal ${playerName[0]+1}: ${playerName[1]}`);
};

// for of loop (new way) desestructuring
console.log("for of loop desestructuing");
for (const [i, playerName] of game.scored.entries()) {
  console.log(`Goal ${i+1}: ${playerName}`);
};

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, 
//  you can go check if you don't remember)

// a) without for of.
let sum = 0;
const oddsArr = Object.values(game.odds);
for (let i = 0; i < oddsArr.length; i++) {
  sum = sum + oddsArr[i];
};
const avgOdd = sum / oddsArr.length;
console.log(`The average odd is: ${avgOdd}`);

sum = 0;
// b) with for of.
for (const odd of oddsArr) sum = sum + odd;
const avgOdd2 = sum / oddsArr.length;
console.log(avgOdd2);

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds 
// and the game objects have the same property names

// a) without for of...
const oddsKeys = Object.keys(game.odds);
const gameKeys = Object.keys(game);
const gameValues = Object.values(game);
let indexOfGameKeys;

for (let i = 0; i < oddsArr.length; i++) {
  indexOfGameKeys = gameKeys.indexOf(oddsKeys[i]);
  if (indexOfGameKeys > -1) {
    console.log(`Odd of victory ${gameValues[indexOfGameKeys]}: ${oddsArr[i]}`);
  } else {
    console.log(`Odd of draw: ${oddsArr[i]}`);
  };
};
// b) with for off...
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
};

// 4. Bonus:Create an object called 'scorers' which contains the names of the players who scored as properties, and 
// the number of goals as the value. In this game, it will look like this:
// {
//   Gnarby: 1,
//   Hummels: 1,
//   Lewandowski: 2
// }
// GOOD LUCK

let scorers = {};
let keyNames = [];

for (let i = 0; i < game.scored.length; i++) {
  keyNames = Object.getOwnPropertyNames(scorers);
  if (keyNames.includes(game.scored[i])) {
    scorers[game.scored[i]] = scorers[game.scored[i]] + 1;
  } else {
    scorers[game.scored[i]] = 1; 
  };
};

console.log(scorers);

