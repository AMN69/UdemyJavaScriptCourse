'use strict';

function describeCountry(country, population, capitalCity) {
    return (`${country} has ${population} people and its capital city is ${capitalCity}`);
}

//console.log(describeCountry('Catalonia', 7500000, 'Barcelona'));

const firstCall = describeCountry('Catalonia', 7500000, 'Barcelona');
const secondCall = describeCountry('Finland', 6000000, 'Helsinki');
const thirdCall = describeCountry('France', 58000000, 'Paris');

console.log(firstCall);
console.log(secondCall);
console.log(thirdCall);

function percentageOfWorld1(population) {
    return ((population/7900000000) * 100).toFixed(2);
}

//console.log(`China has ${percentageOfWorld1(1441000000)}% of the World population`);

const firstPercentage = percentageOfWorld1(1441000000);
const secondPercentage = percentageOfWorld1(7500000);
const thirdPercentage = percentageOfWorld1(47000000);

console.log(`China has ${firstPercentage}% of the World population`);
console.log(`Catalonia has ${secondPercentage}% of the World population`);
console.log(`Spain has ${thirdPercentage}% of the World population`);

const functionExpression = function (population) {return ((population/7900000000) * 100).toFixed(2);}

console.log(`China2 has ${functionExpression(1441000000)}% of the World population`);
console.log(`Catalonia2 has ${functionExpression(7500000)}% of the World population`);
console.log(`Spain2 has ${functionExpression(47000000)}% of the World population`);

const functionExpArrow = (population) => {return ((population/7900000000) * 100).toFixed(2);};

console.log(`China3 has ${functionExpArrow(1441000000)}% of the World population`);
console.log(`Catalonia3 has ${functionExpArrow(7500000)}% of the World population`);
console.log(`Spain3 has ${functionExpArrow(47000000)}% of the World population`);

function describePopulation (country, population) {
    return (`${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world`);
}

console.log(describePopulation('China4', 1441000000));
console.log(describePopulation('Catalonia4', 7500000));
console.log(describePopulation('Spain4', 47000000));

/* Coding Challenge #1
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!
Your tasks:
1. Create an arrow function'calcAverage'to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function'checkWinner'that takes the averages core of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
4. Use the'checkWinner'function to determine the winner for both Data1 and Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
§ To calculate average of 3 values, add them all together and divide by 3
§ To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores 😉 GOOD LUCK */

