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
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, 
according to the rule above. Example: "Koalas win (30 vs. 13)"
4. Use the'checkWinner'function to determine the winner for both Data1 and Data 2
5. Ignore draws this time
Test data:
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
§ To calculate average of 3 values, add them all together and divide by 3
§ To check if number A is at least double number B, check for A >= 2 * B.
Apply this to the team's average scores 😉 GOOD LUCK */

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
console.log(`First data Dolphins average was ${calcAverage(44, 23, 71)} and Koalas was ${65, 54, 49}`);
console.log(`Second data Dolphins average was ${calcAverage(85, 54, 41)} and Koalas was ${23, 34, 27}`);

const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);

const scoreDolphins2 = calcAverage(85, 54, 41);
const scoreKoalas2 = calcAverage(23, 34, 27);

console.log(scoreKoalas2);
console.log(scoreDolphins2);

const checkWinner = (scoreKoalas, scoreDolphins) => {
    if (scoreKoalas >= scoreDolphins * 2) {
        return `Koalas win (${scoreKoalas} vs. ${scoreDolphins})`
    } else if (scoreDolphins >= scoreKoalas * 2) {
        return `Dolphins win (${scoreDolphins} vs. ${scoreKoalas})`
    } else {
        return 'Nobody wins'
    }
}

console.log(checkWinner(scoreKoalas, scoreDolphins));
console.log(checkWinner(scoreKoalas2, scoreDolphins2));

const populations = ['Catalonia', 'Spain', 'Finland', 'France'];
const hasFourElements = populations.length === 4 ? true : false;
console.log(hasFourElements);

const percentages = [ parseFloat(percentageOfWorld1(7500000)), parseFloat(percentageOfWorld1(47000000)), parseFloat(percentageOfWorld1(6000000)), parseFloat(percentageOfWorld1(58000000))];

console.log(percentages);

let neighbours = ['Germany', 'Spain', 'France', 'Andorra'];
neighbours.push('Utopia');
console.log(neighbours);

neighbours.splice(3,1);
console.log(neighbours);

if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
};

const countryIndex = neighbours.indexOf('Spain');
neighbours[countryIndex] = 'King of Spain';
console.log(neighbours);

/* Coding Challenge #2
Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, 
and if the value is different, the tip is 20%.
Your tasks:
1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on 
    the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. 
    Test the function using a bill value of 100
2. And now let's use arrays! So create an array 'bills' containing the test data below
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before
4. Bonus: Create an array 'total' containing the total values, so the bill + tip 
Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! 
So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉
GOOD LUCK */

function calcTip (bill) {
    if (bill < 50 || bill > 300) {
        return bill * 0.2;
    } else {
        return bill * 0.15;
    };
}

console.log(calcTip(100));

const bills = [125, 555, 44];

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(tips);

const total = [bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]];

console.log(total);