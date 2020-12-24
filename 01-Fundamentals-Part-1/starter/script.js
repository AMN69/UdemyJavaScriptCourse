// [AMN] Practices Udemy Javascript couse - Fundamentals Part 1
// The Complete JavaScript Course 2020:From Zero to Expert!

let country = 'Catalonia';
let continent = 'Europe';
let population = 7500000;
console.log("Country: ", country);
console.log("Continent: ", continent);
console.log("Population: ", population);

let isIsland = true;
let language;
console.log("Is my country and Island: ", isIsland);
console.log("Population: ", population);
console.log("Country: ", country);
console.log("Language: ", language);

language = 'English';

console.log("Half population is: ", population / 2);
console.log("Population of my country + 1: ", population + 1);
let finlandPopulation = 6000000;
if (population > finlandPopulation) {
    console.log("My country " + country + " has more people than Finland that has " + finlandPopulation);
} else {
    console.log("My country " + country + " has less people than " + finlandPopulation);
};
if (population > 33000000) {
    console.log("My country " + country + " has more people than the average country");
} else {
    console.log("My country " + country + " has less people than the average country");
};
let description = "Portugal is in Europe, and its 11 million people speak portuguese";
console.log(description);

const myCountryInfo = country + " is in Europe, and part of its " + population + " million people speak " + language + ".";
console.log(myCountryInfo);

if (population > 33000000) {
    console.log(population + " population is above average.");
} else {
    console.log(population + " population is " + (33000000 - population) + " million below average.");
};

console.log ('9' - '5'); // 4
console.log ('19' - '13' + '17'); // 617
console.log ('19' - '13' - 17); // -11

if ('123' < 57) {
    console.log("123 < 57");
} else {
    console.log("123 > 57"); // This
};

console.log(5 + 6 + '4' + 9 - 4 - 2); // 1143

/*Coding Challenge #1

Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).
Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.
Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK */

// const markMass = 78;
// const markHeight = 1.69;
// const johnMass = 92;
// const johnHeight = 1.95;

const markMass = 95;
const markHeight = 1.88;
const johnMass = 85;
const johnHeight = 1.76;

let markBMI1 = markMass / (markHeight ** 2);
let markBMI2 = markMass / (markHeight * markHeight);
let johnBMI1 = johnMass / (johnHeight ** 2);
let johnBMI2 = johnMass / (johnHeight * johnHeight);

let isMarkBMIHigher = markBMI1 > johnBMI1;

// [AMN] Above line is a summary way of doing these lines below...
// if (markBMI1 > johnBMI1) {
//     isMarkBMIHigher = true;
// } else {
//     isMarkBMIHigher = false;
// }

console.log("Mark BMI is: ", markBMI1, markBMI2);
console.log("John BMI is: ", johnBMI1, johnBMI2);
console.log("Is Mark BMI higher than John's: ", isMarkBMIHigher);

/* Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.
Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement �
GOOD LUCK */

if (isMarkBMIHigher) {
    console.log("Mark's BMI is higher than John's!");
} else {
    console.log("John's BMI is higher than Mark's!");
}

if (isMarkBMIHigher) {
    console.log("Mark's BMI (" + markBMI1 + ") is higher than John's (" + johnBMI1 + ")!"); 
} else {
    console.log("John's BMI (" + johnBMI1 + ") is higher than Mark's (" + markBMI1 + ")!"); 
}

if (isMarkBMIHigher) {
    console.log(`Mark's BMI (${markBMI1}) is higher than John's (${johnBMI1})!`); 
} else {
    console.log(`John's BMI (${johnBMI1}) is higher than Mark's (${markBMI1})!`); 
}

// let numNeighbours = prompt("How many neighbours coutries does your country have?");
// let numNeighbours = Number(prompt("How many neighbours coutries does your country have?"));

// if (numNeighbours === 1) {
//     console.log('My country has only 1 neighbour country.');
// } else if (numNeighbours > 1) {
//     console.log('My country has more than 1 neighbour country.');
// } else {
//     console.log('No borders!');
// };

if (language === 'English' && population < 50000000 && isIsland) {
    console.log('You should live in ' + country);
} else {
    console.log(country + ' does not meet your criteria.');
}

/* Coding Challenge #3
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
GOOD LUCK */

const dolphinsScoreAvg1 = (96 + 108 + 89) / 3;
const koalasScoreAvg1 = (88 + 91 + 110) / 3;

const dolphinsScoreAvg2 = (97 + 112 + 101) / 3;
const koalasScoreAvg2 = (109 + 95 + 123) / 3;

const dolphinsScoreAvg3 = (97 + 112 + 101) / 3;
const koalasScoreAvg3 = (109 + 95 + 106) / 3;

console.log(`The Dolphins average score is ${dolphinsScoreAvg1}, and the Koalas average scored is ${koalasScoreAvg1}`);
console.log(`The Dolphins average score is ${dolphinsScoreAvg2}, and the Koalas average scored is ${koalasScoreAvg2}`);
console.log(`The Dolphins average score is ${dolphinsScoreAvg3}, and the Koalas average scored is ${koalasScoreAvg3}`);

if (dolphinsScoreAvg1 >= 100 || koalasScoreAvg1 >= 100) {
    if (dolphinsScoreAvg1 > koalasScoreAvg1) {
        console.log(`In the first match Dolphins won!`);
    } else if (dolphinsScoreAvg1 < koalasScoreAvg1) {
        console.log(`In the first match Koalas won!`);
    } else {
        console.log("In the first match Dolphins and Koalas drew");
    };
} else {
    console.log (`Neither Dolphins nor Koalas won 'cos score is below 100`);
}

if (dolphinsScoreAvg2 >= 100 || koalasScoreAvg2 >= 100) {
    if (dolphinsScoreAvg2 > koalasScoreAvg2) {
        console.log(`In the second match Dolphins won!`);
    } else if (dolphinsScoreAvg2 < koalasScoreAvg2) {
        console.log(`In the second match Koalas won!`);
    } else {
        console.log("In the second match Dolphins and Koalas drew");
    };
} else {
    console.log (`Neither Dolphins nor Koalas won 'cos score is below 100`);
}

if (dolphinsScoreAvg3 >= 100 || koalasScoreAvg3 >= 100) {
    if (dolphinsScoreAvg3 > koalasScoreAvg3) {
        console.log(`In the third match Dolphins won!`);
    } else if (dolphinsScoreAvg3 < koalasScoreAvg3) {
        console.log(`In the third match Koalas won!`);
    } else {
        console.log("In the third match Dolphins and Koalas got tied");
    };
} else {
    console.log (`Neither Dolphins nor Koalas won 'cos score is below 100`);
}

const swLanguage = "english";

switch (swLanguage) {
    case "chinese":
    case "mandarin" : 
        console.log('MOST number of native speakers!');
        break;
    case "spanish" : 
        console.log('2nd place in number of natives speakers!');
        break;
    case "english" : 
        console.log('3rd place');
        break;
    case "hindi" : 
        console.log('Number 4');
        break;
    case "arabic" : 
        console.log('5th most spoken language');
        break;
    default : 
        console.log('Great language too :D!');
};

population = 7500000;
console.log(`Catalonia's population is ${population > 33000000 ? 'above' : 'below'} average`);

/* Coding Challenge #4
Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.
Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
this. It's not allowed to use an if/else statement � (If it's easier for you, you can
start with an if/else statement, and then try to convert it to a ternary
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
316.25”
Test data:
§ Data 1: Test for bill values 275, 40 and 430
Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2
§ Value X is between 50 and 300, if it's >= 50 && <= 300 �
GOOD LUCK */

const bill = 430;
let tip = bill >=50 && bill <=300 ? bill * 0.15 : bill * 0.2;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);
console.log(`The bill was ${bill}, the tip was ${bill >=50 && bill <=300 ? bill * 0.15 : bill * 0.2}, and the total value ${bill + tip}`);







