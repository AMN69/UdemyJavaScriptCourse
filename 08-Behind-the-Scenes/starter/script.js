'use strict';

function calcAge (birthYear) {
    const age = 2037 - birthYear;
  
    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}`;
        console.log(output);
        if (birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;

            // [AMN] If we declare a new variable firstName here within this scope the console.log
            // will print Steven instead of Jonas. But outside this scope, at global level the 
            // console.log will continue to print Jonas. So we have two variables with the same name
            // at different levels in scope. They have the same name but are completely diffent 
            // variables.
            const firstName = 'Steven';
            const str = `Oh, and you're a millenial, ${firstName}`;
            console.log(str);

            function add(a,b) {
                return a + b;
            };
            // [AMN] Here we are redefining the content of output variable. The variable is in a 
            // parent scope. If we create a new const output the parent one would not change.
            output = 'NEW OUTPUT!';
        };
        // [AMN] str can't be read here because since ES6 const and let variables 
        // are within the block scope otherwise millenial CAN be read because 
        // var are not affected by the block scope. They are out of the block scope.
        // console.log(str);
        console.log(millenial);

        // [AMN] add() function can't be called here because is defined within a block scope.
        // Note: if we removed the 'strict mode' in the first line then it would work. 
        // console.log(add(2,3));

        // [AMN] As we have changed the output content in a children scope where the output variable
        // was created now the output content has changed. 
        console.log(output);
    };
    printAge();
    return age;
};

const firstName = 'Jonas';
calcAge(1991);
// [AMN] As the variable age is defined within printAge() function scope can't be read here neither
// the function printAge() can't be called because both, age and printAge() are in a child scope.
// console.log(age);
// printAge();

// Hoisting and TDZ (Temporal Dead Zone)

console.log(me); // console log undefined because is a var.
// console.log(job); // console log cannot access before initialization because is a let.
// console.log(year); // idem that let.

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Functions test:
// a) Function declaration can be called before defining it.
// b) Function expression and arrow functions CANNOT be called before.

console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));

function addDecl(a, b) { // [AMN] function declaration
    return a + b;
};

const addExpr = function (a, b) { // [AMN] function expression
    return a + b;
}; // if instead of const we defined as var we would get an error that addArrow is not a function.

const addArrow = (a, b) => a + b; // [AMN] arrow function
// the same that above: as a var this wouldn't work.

// Example
// [AMN] As we use the numProducts var before we define it, and taking into 
// account that by hosting something not defined is undefined, and that undefined
// is 'falsy' the if is true and therefore we execute the function. In case we
// really had 10 products we would be deleting the cart.

console.log(undefined);
if(!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!');
};

var x = 1;
var y = 2;
const z = 3;

console.log(x === window.x); // the console returns true because x is in window obj
console.log(y === window.y); // the console returns false because x isn't in window obj
console.log(z === window.z); // the console returns false because x isn't in window obj

// Best practices:
// - Don't use var.
// - Declare variables at the top of the code.
// - Declare functions before we use them at the beginning of the code.

// [AMN] This keyword in action

// Here the this is the window itself
console.log(this);

// Here the this is undefined because we are in strict mode otherwise it would be
// the window object (who't the father of the function). This is because the function
// is not attached to any object. Anyway functions instead of arrow functions have
// their this and in case we had any method we could use it.

const calcAge2 = function (birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
};
calcAge2(1991);

// Here the this is the parent's object (the window) because arrow functions 
// don't have this and then they take their parents one.

const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    console.log(this);
};
calcAgeArrow(1980);

// Here the this keyword as it is in a function and is within an object so it takes 
// their parent object value (the parent is the const jonas). It shows the year and
// the calcAge() function.
const jonas = {
    year: 1991,
    calcAge2: function() {
        console.log(this);
        console.log(2037 - this.year);
    }
};
jonas.calcAge2();

// Here we can see that this takes the value of the parent object because once
// matilda copies the jonas method calcAge() the this is referred to matilda

const matilda = {
    year: 2017
};

matilda.calcAge2 = jonas.calcAge2; // We copy not call the method (so no parenthesis)
matilda.calcAge2();

// Now as the functon is not attached to any object the this is undefined.

const f = jonas.calcAge2;
f();
