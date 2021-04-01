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

// Code challenge #1

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

// Now creating objects with class declaration 
// ...but first class expression also...

// const PersonCl = class{}

// class declaration
class PersonCl { // We define Person as before but to distinguish and avoid conflic with PersonCl
  constructor(fullName, birthYear) {
    this.fullName = fullName
    this.birthYear = birthYear
  }

  // This instance methods will be added to the .prototype property (except the one with static keyword)
  calcAge() { // This method will be in the .prototype property 
    console.log(2037 - this.birthYear);
  }

  get age() { // getter for classes (for objects see some lines below)
    return 2037 - this.birthYear
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name // by convention when there is a setter and getter for a property with the setter or setter goes with a '_' as a first char otherwise it doesn't work
    } else {
      return alert('Not a full name!')
    }
  }
  get fullname() {
    return this._fullName // by convention when there is a setter and getter for a property within the getter or setter goes with '_' as a first char otherwise it doesn't work
  }

  // This is a static method and can't be used on the objects created only can be called as a function on the PersonCl
  static hey() {
    console.log("Hey there!!!");
    console.log(this);
  }
}

console.log(PersonCl.hey());
const jessica = new PersonCl('Jessica Davis', 1996) // When we invoke PersonCl the method constructor is automatically called
console.log(jessica);
jessica.calcAge()
console.log(jessica.age); // getter for classes, unless a function we use this as a property

console.log(jessica.__proto__ === PersonCl.prototype); // true 

// we can define methods within the PersonCl object that are on the prototype as calcAge() or...
// ... we can create as above on the prototype

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
}
jessica.greet()

const walter = new PersonCl("Walter White", 1965); // The setter needs a full name with space
console.log("Walter: ", walter)
// getters and setters in javascript objects
const account = {
  owner: 'Jonas',
  movements: [200, 500, 350, 450],

  get latest() { // we use the reserved word get
    return this.movements.slice(-1).pop()
  },

  set latest(mov) { // we use the reserved word set
    this.movements.push(mov)
  },
}

console.log(account.latest); // unless functions we use getters as a variable
account.latest = 50
console.log(account.movements); // unless functions we use setters as a variable

// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear)
  },

  init(firstName, birthYear) { // NOT a constructor. This is only a way to define properties
    this.firstName = firstName
    this.birthYear = birthYear
  },

  init2(propertyName, propertyValue) { // AMN - improvement to add whatever property
    this[propertyName] = propertyValue
  }
}

const steven = Object.create(PersonProto)
console.log(steven);
steven.name = 'Steven' // Worse way to define properties. See below with Sarah
steven.birthYear = 2002
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto)
sarah.init('Sarah', 1979) // Better way to define properties than above
sarah.calcAge()
console.log(sarah);
sarah.init2('Surname', 'Smith')
console.log(sarah);
sarah.init2('Age', 34);
console.log(sarah);

// Code challenge #2


class CarClass {
  constructor(make, speed) {
    this.make = make
    this.speed = speed
  }

  get make() {
    return this._make
  }

  get speed() {
    return this._speed
  }

  get speedMph() {
    return this._speed / 1.6
  }

  set make(make) {
    this._make = make
  }

  set speed(speed) {
    this._speed = speed
  }

  set speedMph(speed) {
    this._speed = speed * 1.6
  }

  accelerate() {
    if (this.speed + 10 > 250) {
      this.speed = 250
      console.log("We can overpass 250km/h, now speed is: ", this.speed);
    } else {
      this.speed = this.speed + 10
      console.log("New speed: ", this.speed);
    }
  }

  brake() {
    if (this.speed - 5 < 0) {
      this.speed = 0
      console.log("The car is stopped now, leave the brakes!");
    } else {
      this.speed = this.speed - 5
      console.log("New speed: ", this.speed);
    }
  }
}

console.log("-------- We start with car bis version -------");
const car1b = new CarClass('BMW', 0)
const car2b = new CarClass('Mercedes', 250)
console.log(car1b);
console.log(car2b);

car1b.brake();
car1b.accelerate();
car1b.accelerate();
car1b.brake()
car1b.brake()
car1b.brake()
car1b.brake()
car1b.brake()
car1b.accelerate()

car2b.accelerate();
car2b.brake();
car2b.accelerate();
car2b.accelerate();
car2b.brake();
car2b.brake()
car2b.accelerate()
car2b.accelerate()
console.log(car1b.make)
console.log(car1b.speed)
console.log(car1b.speedMph)
console.log(car2b.make)
console.log(car2b.speed)
console.log(car2b.speedMph)
car1b.make = 'Ford' // AMN - be careful! We can't do car1b.make('Ford'), we use it as a variable not a function.
console.log("Now is a ", car1b.make);

