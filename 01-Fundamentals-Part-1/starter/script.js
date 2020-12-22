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

console.log ('9' - '5');
console.log ('19' - '13' + '17');
console.log ('19' - '13' - 17);

if ('123' < 57) {
    console.log("123 < 57");
} else {
    console.log("123 > 57");
};

console.log(5 + 6 + '4' + 9 - 4 - 2);

