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
