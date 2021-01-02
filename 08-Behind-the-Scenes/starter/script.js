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
