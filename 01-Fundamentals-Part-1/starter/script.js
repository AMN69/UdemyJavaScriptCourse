// [AMN] Practices Udemy Javascript couse - Fundamentals Part 1
// The Complete JavaScript Course 2020:From Zero to Expert!

let country = 'Catalonia';
let continent = 'Europe';
let population = 7500000;
console.log("Country: ", country);
console.log("Continent: ", continent);
console.log("Population: ", population);

let isIsland = false;
let language;
console.log("Is my country and Island: ", isIsland);
console.log("Population: ", population);
console.log("Country: ", country);
console.log("Language: ", language);

language = 'Catalan';

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

// if (markBMI1 > johnBMI1) {
//     isMarkBMIHigher = true;
// } else {
//     isMarkBMIHigher = false;
// }

console.log("Mark BMI is: ", markBMI1, markBMI2);
console.log("John BMI is: ", johnBMI1, johnBMI2);
console.log("Is Mark BMI higher than John's: ", isMarkBMIHigher);

