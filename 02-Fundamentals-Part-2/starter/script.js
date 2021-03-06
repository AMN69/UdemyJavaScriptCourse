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

let myCountry = {
    country: "Catalonia",
    capital: "Barcelona",
    language: "Catalan",
    population: 7500000,
    neighbours: ['Spain', 'Andorra', 'France']
};

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, 
             ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.population = myCountry.population + 2000000;

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, 
             ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.population = [myCountry.population - 2000000];

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, 
             ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

const jonas = {
    name: "Jonas",
    birthYear: 1991,
    hasDriverLicense: true,
    job: 'teacher',
    calcAge: function () {
        this.age = 2037 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        return `${this.name} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriverLicense ? 'a' : 'no'} driver's license.`;
    }
};

jonas.calcAge();
console.log(jonas.getSummary());

let myCountry2 = {
    country: "Catalonia",
    capital: "Barcelona",
    language: "Catalan",
    population: 7500000,
    neighbours: ['Spain', 'Andorra', 'France'],
    describe: function () {
        return `${this.country} has ${this.population} million ${this.language}-speaking people, 
        ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`;
    },
    checkIsland: function () {this.neighbours.length === 0 ? this.isIsland = true : this.isIsland = false }
};

console.log(myCountry2.describe());
console.log(myCountry2.checkIsland());
console.log(myCountry2.isIsland)

/* Coding Challenge #3
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! 
Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, 
and also return it from the method
3. Log to the console who has the higher BMI, together with the full name and the respective BMI. 
Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
GOOD LUCK 😀 */

let markMiller = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 169,
    calcBMI: function () {
        this.BMI = this.mass / (this.height * this.height) *100;
        return this.BMI;
    }
}

let johnSmith = {
    fullName: 'John Smith',
    mass: 92,
    height: 195,
    calcBMI: function () {
        this.BMI = this.mass / (this.height * this.height) * 100;
        return this.BMI;
    }
}

markMiller.calcBMI();
johnSmith.calcBMI();
console.log("Mark: ", markMiller);
console.log("John: ", johnSmith);

if (markMiller.BMI > johnSmith.BMI) {
    console.log(`${markMiller.fullName}'s BMI (${markMiller.BMI}) is higher than ${johnSmith.fullName}'s (${johnSmith.BMI})!`);
} else {
    if (johnSmith.BMI > markMiller.BMI) {
        console.log(`${johnSmith.fullName}'s BMI (${johnSmith.BMI}) is higher than ${markMiller.fullName}'s (${markMiller.BMI})!`);
    } else {
        console.log(`${markMiller.fullName}'s BMI (${markMiller.BMI}) is equal than ${johnSmith.fullName}'s (${johnSmith.BMI})!`);
    }
};

for (let i=1; i<51; i++) {
    console.log(`Voter number ${i} is currently voting`);
};

// Copy of populations
const populations2 = [7500000, 47000000, 6000000, 58000000];

// Copy of percentageOfWorld1
function percentageOfWorld1Bis(population) {
    return ((population/7900000000) * 100).toFixed(2);
}

let percentages2 = [];

for (let i=0; i<populations2.length; i++) {
    percentages2[i] = parseFloat(percentageOfWorld1Bis(populations2[i]));
};

console.log(percentages, percentages2);

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let i=0; i<listOfNeighbours.length; i++) {
    for (let j=0; j<listOfNeighbours[i].length; j++) {
        console.log(`Neighbour: ${listOfNeighbours[i][j]}`);
    };
};

let i=0;
let percentages3 = [];

while (i<populations2.length) {
    percentages3[i] = parseFloat(percentageOfWorld1Bis(populations2[i]));
    i++;
};

console.log(percentages, percentages3);

/* Coding Challenge #4
Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. 
Use a for loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
tips and totals arrays 😉 
Bonus:
4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as an argument. This function calculates the average of all numbers in the 
given array. 
This is a difficult challenge (we haven't done this before)! Here is how to solve it:
4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. 
Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. 
This way, by the end of the loop, you have all values added together
4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array
GOOD LUCK 😀 */

const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips2 = [];
let totals = [];

// function calcTip (bill) {
//     if (bill < 50 || bill > 300) {
//         return bill * 0.2;
//     } else {
//         return bill * 0.15;
//     };
// }

for (let i=0; i<bills2.length; i++) {
    tips2.push(calcTip(bills2[i]));
    totals.push(bills2[i]+tips2[i]);
};

console.log("Bills: ", bills2);
console.log("Tips: ", tips2);
console.log("Totals: ", totals);

function calcAverage2(arr) {
    let totalArr = 0;
    for (let i=0; i<arr.length; i++) {
        totalArr = totalArr + arr[i];
    }
    return totalArr/arr.length;
};

console.log("The average is: ", calcAverage2(bills2));




