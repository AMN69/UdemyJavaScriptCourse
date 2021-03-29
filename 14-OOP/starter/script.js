'use strict';

const Person = function (firstName, birthYear) {
    // We instanciate the properties
    this.firstName = firstName;
    this.birthYear = birthYear;
  
    // Never do this!
    // The reason is because we would create as many functions as 
    // times we instanciated the Person and it would affect the 
    // performance
    // this.calcAge = function () {
    //   console.log(2037 - this.birthYear);
    // };
  };
  
  const jonas = new Person('Jonas', 1991); // We create the object jonas from blueprint Person
  console.log(jonas);

  // 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person); // true
console.log(jay instanceof Person); // false

// Prototypes

console.log(Person.prototype); // Now the objects created with the constructor Person will have access to the method calcAge
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

jonas.calcAge(); // jonas object was created from constructor Person and can use the calcAge function because has the prototype even though it doesn't contain within the calcAge method.
matilda.calcAge();

console.log(jonas.__proto__); // all objects have the __proto__ method.
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false. Person.prototype is prototype of all objects created from the constructor Person but IS NOT from the constructor itself

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); // now in __proto__ they have the new property species
console.log(jonas.species, matilda.species);
// birthYear and firstName are the objects own properties, species is NOT
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// ON the prototype chain we have jonas.__proto__ first, jonas.__proto__.proto__ second (and top one)
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); // null because there is no any other up on the prototype chain

// A function is an object and therefore has a prototype that contins all the methods we use
const arr = [1, 2, 3, 1, 1, 5, 6, 3, 3]
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true

// As Array.prototype is an object we can add new methods to it. All arrays will inherit this method. It is NOT a good idea.
Array.prototype.unique = function () {
  return [...new Set(this)] // returns for a given array a new array with unique values
}

console.log(arr.unique());

// Code chanllenge #1

const Car = function (make, speed) {
  this.make = make
  this.speed = speed
}

Car.prototype.accelerate = function () { // Method outside constructor object to avoid performance issues
  if (this.speed + 10 > 250) {
    this.speed = 250
    console.log("We can overpass 250km/h, now speed is: ", this.speed);
  } else {
    this.speed = this.speed + 10
    console.log("New speed: ", this.speed);
  }
}

Car.prototype.brake = function () {
  if (this.speed - 5 < 0) {
    this.speed = 0
    console.log("The car is stopped now, leave the brakes!");
  } else {
    this.speed = this.speed - 5
    console.log("New speed: ", this.speed);
  }
}

const car1 = new Car('BMW', 0)
const car2 = new Car('Mercedes', 250)
console.log(car1);
console.log(car2);

car1.brake();
car1.accelerate();
car1.accelerate();
car1.brake()
car1.brake()
car1.brake()
car1.brake()
car1.brake()
car1.accelerate()

car2.accelerate();
car2.brake();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.brake()
car2.accelerate()
car2.accelerate()