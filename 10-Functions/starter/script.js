'use strict';

/* Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number 
of replies for each option. This data is stored in the starter 'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
    1.1. Display a prompt window for the user to input the number of the
    selected option. The prompt should look like this: What is your favourite programming language?
    0: JavaScript
    1: Python
    2: Rust
    3: C++
    (Write option number)
    1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, 
    increase the value at position 3 of the array by 1. Make sure to check if the input is a number and 
    if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answerpoll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input 
(called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results 
array as it is, using console.log(). This should be the default option. If type is 'string', display a 
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 
'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
  The Complete JavaScript Course 20
Test data for bonus:
§ Data1:[5,2,3]
§ Data2:[1,5,3,9,6,1]
Hints: Use many of the tools you learned about in this and the last section 😉 GOOD LUCK 😀
*/

// [AMN] Important note about this and bind method:
// The first example don't use bind, therefore when I call the method registerNewAnswer
// the this word points to the addEventListener query '.poll' and this can't
// be used within the object poll.

// const poll = {
//     question: "What is your favourite programming language?", 
//     options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//     // This generates [0, 0, 0, 0]. More in the next section! 
//     answers: new Array(4).fill(0),
//     registerNewAnswer: function () {
//         const answer = Number(window.prompt("What is your favourite programming language? 0: JavaScript; 1: Python; 2: Rust; 3: C++"))
//         switch (answer) {
//             case 0:
//             case 1:
//             case 2: 
//             case 3: 
//                 poll.answers[answer]++
//                 poll.displayResults(poll.answers)
//                 break;
//             default:
//                 window.prompt("The answer must be 0, 1, 2 or 3");
//                 break;
//         };
//     },
//     displayResults: function (somePollAnswers) {
//         if (Array.isArray(somePollAnswers)) {console.log(somePollAnswers)}
//         else {console.log(`Poll results are: ${[somePollAnswers]}`)}
//     }
// };

// // Entering poll answers:
// const answerPoll = document.querySelector('.poll');
// answerPoll.addEventListener('click', poll.registerNewAnswer);

// Nevertheless when we add bind(poll) to the callback function call by the 
// high order function addEventListener we CAN use this within the poll
// object.

const poll = {
    question: "What is your favourite programming language?", 
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section! 
    answers: new Array(4).fill(0),
    registerNewAnswer: function () {
        const answer = Number(window.prompt("What is your favourite programming language? 0: JavaScript; 1: Python; 2: Rust; 3: C++"))
        switch (answer) {
            case 0:
            case 1:
            case 2: 
            case 3: 
                this.answers[answer]++
                this.displayResults(this.answers)
                break;
            default:
                window.prompt("The answer must be 0, 1, 2 or 3");
                break;
        };
    },
    displayResults: function (somePollAnswers) {
        if (Array.isArray(somePollAnswers)) {console.log(somePollAnswers)}
        else {console.log(`Poll results are: ${[somePollAnswers]}`)}
    }
};

// Entering poll answers:
const answerPoll = document.querySelector('.poll');
answerPoll.addEventListener('click', poll.registerNewAnswer.bind(poll));


// Array option:
// poll.displayResults([5,2,3]); 
// poll.displayResults([1,5,3,9,6,1]); 

// String option:
// poll.displayResults("5,2,3"); 
// poll.displayResults("1,5,3,9,6,1"); 

// Functions returning another functions.

// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     };
// };

// const greetHey = greet('Hey');
// greetHey('Andreu');
// greetHey('Josep');

// greet('Hello')('Andreu');

// Functions returning another functions as arrow functions.
// const greet2 = (greeting) => {
//     return (name) => {
//         console.log(`${greeting} ${name}`);
//     };
// };

// const greetHey2 = greet2('Hola');
// greetHey2('Andreuet');
// greetHey2('Josepet');

// greet2('Holandiqui')('Andreuet');

// [AMN] Partial use and a function returning a function all together

const addTax = (rate, value) => value + value * rate;
const addTax2 = (rate) => {
    return (value) => {
        return value + value * rate;
    };
};

console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

// [AMN] Same solution w/o bind using a callback function called from a high-order
// one.

const addVAT2 = addTax2(0.3);
console.log(addVAT2(200));

