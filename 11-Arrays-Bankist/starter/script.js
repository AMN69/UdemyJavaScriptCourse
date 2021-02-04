'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Bankist app AMN solution for js course

// First I get and inform the date and time (as the main page is hidden it's not a problem)
function getTodayDate () {
  const today = new Date();

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = today.getFullYear();

  const hrs = today.getHours();
  const min = today.getMinutes();

  const todayDate = dd + '/' + mm + '/' + yyyy;
  const todayTime = hrs + ':' + min;

  return `${todayDate}, ${todayTime}`;
};

labelDate.textContent = (getTodayDate());
// console.log(getTodayDate());

// I add in the array with accounts name and name initials.

for (let i = 0; i < accounts.length; i++) {
  let name = accounts[i].owner.split(' ');
  accounts[i].name = name[0];
  accounts[i].username = '';
  for (let j = 0; j < name.length; j++) {
    accounts[i].username = accounts[i].username + name[j][0].toLowerCase()
  };
};

// Another way to do the same:
// 1st we pass the owner to lowercase,
// 2nd we split the owner name by ' ' giving an array with two/three words.
// 3rd we map the two/three-words-array taking the first letter (previously transform to lowercase) of each iteration
// 4th we finally join the two/three-words-array first letter in one new accounts property called username.
// forEach doesn't create a shallow array, it MUTATES the exiting one meanwhile map creates a SHALLOW copy. 

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//   });
// };
// createUsernames(accounts);

console.log(accounts);

// I create an array for deposits and another for withdrawals.

const withdrawals = movements.filter((mov) => mov < 0);
// const deposits = movements.filter((mov) => mov > 0);

// console.log(withdrawals);
// console.log(deposits);

// I create three variables that contains the total balance, diposits and withdrawals.

// const totalBalance = movements.reduce((acc, mov) => acc + mov);
// const totalDeposits = deposits.reduce((acc, mov) => acc + mov);
const totalWithdrawals = withdrawals.reduce((acc, mov) => acc + mov);

// console.log((totalBalance));
// console.log(totalDeposits);
// console.log(totalWithdrawals);

//Second I check the user and pin entered.
// If the user and pin is correct I unhide the main page.

btnLogin.addEventListener('click', checkUserAndPin);
let userConnected;
let indexOfUsrConnected;

function checkUserAndPin() {

  event.preventDefault(); // Prevent form from submitting that is its natural behaviour.
  
  const account = accounts.find(acc => (acc.username === inputLoginUsername.value && 
    acc.pin === Number(inputLoginPin.value)));
  indexOfUsrConnected = accounts.findIndex(acc => (acc.username === inputLoginUsername.value && 
    acc.pin === Number(inputLoginPin.value)));
  
  if (account) {
      userConnected = account.username;
      containerApp.style.opacity = 100;
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      labelWelcome.textContent = `Good day, ${account.name}!`;
      financialState(account.movements, account.interestRate);
  };
};

// We need a function to update the UI who calls showMovs(), showBal(), showSummary() 

function financialState (accMov, accIntRate) {
  showMovs(accMov);
  showBal(accMov);
  showSummary(accMov, accIntRate);
};

let balance;
function showBal(movements) {
  balance = movements.reduce((acc, mov) => acc + mov, 0); // Starts at zero
  labelBalance.textContent = balance.toFixed(2) + " €"; 
};

function showSummary(movements, intrRate) {
  labelSumIn.textContent = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0).toFixed(2) + " €";
  labelSumOut.textContent = Math.abs(movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)).toFixed(2) + " €";
  // In Jonas the interest below 1€ is filtered out.
  labelSumInterest.textContent = ((movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0) * intrRate) / 100) + " €";
}

// Third - Show movememts

function showMovs (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Transfer money

btnTransfer.addEventListener('click', transferMoney);

function transferMoney () {
  event.preventDefault();
  const amountToTrans = Number(inputTransferAmount.value);
  // const toWhomToTrans = inputTransferTo.value;

  const index = accounts.findIndex(acc => (acc.username === inputTransferTo.value));

  if (index > -1 && index !== indexOfUsrConnected && amountToTrans < balance && amountToTrans > 0) {
    accounts[index].movements.push(amountToTrans);
    accounts[indexOfUsrConnected].movements.push(amountToTrans * -1);
    financialState(accounts[indexOfUsrConnected].movements, accounts[indexOfUsrConnected].interestRate);
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
  };
};

// Close account

btnClose.addEventListener('click', closeAccount);

function closeAccount () {
  event.preventDefault();
  const indexOfUsrCancelled = accounts.findIndex(acc => (acc.username === inputCloseUsername.value && 
    acc.pin === Number(inputClosePin.value)));
  if (indexOfUsrCancelled === indexOfUsrConnected) {
    accounts.splice(indexOfUsrConnected, 1);
    containerApp.style.opacity = 0;
  };
  inputCloseUsername.value = "";
  inputClosePin.value = "";
};

// Request loan

btnLoan.addEventListener('click', giveLoan);

function giveLoan() {
  event.preventDefault();
  const amountToLoan = Math.floor(Number(inputLoanAmount.value));
  if (accounts[indexOfUsrConnected].movements.some(mov => mov > amountToLoan * 0.1) && amountToLoan > 0) {
    accounts[indexOfUsrConnected].movements.push(amountToLoan);
    financialState(accounts[indexOfUsrConnected].movements, accounts[indexOfUsrConnected].interestRate);
  };
  inputLoanAmount.value = "";
};

// Sorting movements

btnSort.addEventListener('click', sortMovs);

let sorted = false;
function sortMovs() {
  sorted = !sorted;
  if (sorted) {
    const sortedMovs = accounts[indexOfUsrConnected].movements.sort((a, b) => a - b);
    showMovs(sortedMovs);
  } else {
    showMovs(accounts[indexOfUsrConnected].movements);
  };
  console.log("Sorted: ", sorted);
};

// Showing includes and some array methods

console.log(movements);

// Knowing if a certain value is within the array.
console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));

// Knowing if a range of values is within the array.
console.log(movements.some(mov => mov > 1300));

// Every checks whether all the elements in an array are true.

console.log(movements.every(mov => mov > -10000));

// Flat and flatMap examples
const arr = [[1,2,3], [4,5,6], 7, 8];
console.log("Array flat: ", (arr.flat()));

const arrDeep = [[[1,2], 3], [4, [5, 6], 7, 8]];
console.log("Array deep flat: ", arrDeep.flat(2)); // going deep two levels within the array

// flat method to calculate global accounts (all) balance
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log("Overall balance with flat: ", overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log("Overall balance with flatMap: ", overallBalance2);

// Sorting takes array elements as strings even when they are numbers
// therefore to sort arrays with numbers (for strings it works with sort) we have
// to pass a function to the sort method.

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

// The same that above simpler
movements.sort((a, b) => a - b);

console.log(movements);

//Descending
// movements.sort((a,b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// })

// The same that above simpler
movements.sort((a, b) => b - a);

console.log(movements);

//Creating an array of 100 randomly throwing dice elements

const arrDice = Array.from({length: 100}, () => Math.round(Math.random() * (6 - 1) + 1));
console.log("100 randomly throwing dice elements: ", arrDice);

// Array methods practice

const BankDepositSum = accounts
  .flatMap(acc => acc.movements) // 1st) From 4 arrays we generate only one
  .filter(mov => mov > 0) // 2nd) From the array we filter positive movs 
  .reduce((sum, cur) => sum + cur, 0); // 3rd) from the filtered we sum all the values
console.log("Bank total deposits: ", BankDepositSum);

const numDep1000 = accounts
  .flatMap(acc => acc.movements) // 1st) From 4 arrays we generate only one
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // 2nd) we count starting from zero all deposits greater or equal to 1000.

console.log("Num of dep >=1000: ", numDep1000);  
const numDep1000Other = accounts // or we can
  .flatMap(acc => acc.movements) // 1st) From 4 arrays we generate only one
  .filter(mov => mov >= 1000).length; // 2nd) From the array we filter movs greater or equal 1000 and count them.
console.log("Num of dep >=1000: ", numDep1000Other);

const sums = accounts
  .flatMap(acc => acc.movements) // 1st) From 4 arrays we generate only one
  .reduce((sums, cur) => { // 2nd) we reduce the array to deposits and withdrawals
    cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur); 
    return sums;
  },
  { deposits: 0, withdrawals: 0 } // Initialize the object to zero to accumulate later above.
  );
console.log(sums);

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1); // We put first letter to capital letter
  
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title // we take the title
    .toLowerCase() // put the entire title to lowercase
    .split(' ') // split by words
    .map(word => (exceptions.includes(word) ? word : capitalize(word))) // in case the word is an exception we keep the word as it is otherwise we capitalize the word
    .join(' '); // rebuild again the title joining individual words before separated in a new sentence with capital letters except if they are an exception.

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));


/////////////////////////////////////////////////

/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about 
their dog's age, and stored the data into an array (one array for each). For now, they 
are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 
3 years old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 
'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
 cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages
  from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's
 data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉 GOOD LUCK 😀
*/

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// const dogsJulia = [9, 16, 6, 8, 3];
// const dogsKate = [10, 5, 6, 1, 4];



// function checkDogs (dogsJulia, dogsKate) {
//   let newDogsJulia = dogsJulia.slice();
//   // newDogsJulia.splice(0, 2);
//   // newDogsJulia.splice(1, 2);
//   return newDogsJulia.slice(2,-2);
// };

// let newDogsJulia = checkDogs(dogsJulia, dogsKate);

// console.log("Dogs Julia", dogsJulia);

// console.log("New Dogs Julia", newDogsJulia);

// // Two ways to join two arrays: concat or spread operator.
// // let dogsJuliaAndKate = newDogsJulia.concat(dogsKate);
// let dogsJuliaAndKate = [...newDogsJulia, ...dogsKate];
// console.log("Dogs Julia and Kate", dogsJuliaAndKate);

// // Three ways to loop the array: for, for of and foreach
// // foreach CAN'T be break meanwhile for of CAN.

// console.log('----For: ');
// for (let i = 0; i < dogsJuliaAndKate.length; i++) {
//   if (dogsJuliaAndKate[i] > 3) {
//     console.log(`Dog number ${i + 1} is an adult, and is ${dogsJuliaAndKate[i]} years old`); 
//   } else {
//     console.log(`Dog number ${i + 1} is still a puppy.`);
//   };
// };

// console.log('----For of: ');
// for (const [i, dog] of dogsJuliaAndKate.entries()) {
//   if (dog > 3) {
//     console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`); 
//   } else {
//     console.log(`Dog number ${i + 1} is still a puppy.`);
//   };
// };

// console.log('----For each: ');

// dogsJuliaAndKate.forEach(function(dog, i) {
//   if (dog > 3) {
//     console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`); 
//   } else {
//     console.log(`Dog number ${i + 1} is still a puppy.`);
//   };
// });

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages 
and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the 
following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, 
humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at 
  least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we 
  calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]
GOOD LUCK 😀
*/

// const dogAgesArr1 = [5, 2, 4, 1, 15, 8, 3];
// const dogAgesArr2 = [16, 6, 10, 5, 6, 1, 4];

// function calcAverageHumanAge(arr) {
//   const dogsInHumanYears = arr.map((value, index) =>
//     value <= 2 ? value * 2 : 16 + value * 4
//   );
//   console.log(dogsInHumanYears);
//   const dogsGreater18 = dogsInHumanYears.filter((value, index) => value > 17);
//   console.log(dogsGreater18);
//   const averageAge =
//     dogsGreater18.reduce((acc, value) => acc + value, 0) / dogsGreater18.length;
//   console.log(averageAge);
// }
// calcAverageHumanAge(dogAgesArr1);
// calcAverageHumanAge(dogAgesArr2);

/*
Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and 
using chaining!
Test data:
§ Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]
GOOD LUCK 😀
*/

// const dogAgesArr1 = [5, 2, 4, 1, 15, 8, 3];
// const dogAgesArr2 = [16, 6, 10, 5, 6, 1, 4];

// function calcAverageHumanAge(arr) {
//   const dogsInHumanYears = arr.map((value, index) =>
//     value <= 2 ? value * 2 : 16 + value * 4
//   );
//   console.log(dogsInHumanYears);
//   const dogsGreater18 = dogsInHumanYears.filter((value, index) => value > 17);
//   console.log(dogsGreater18);
//   const averageAge =
//     dogsGreater18.reduce((acc, value) => acc + value, 0) / dogsGreater18.length;
//   console.log(averageAge);
// }

// calcAverageHumanAge(dogAgesArr1);
// calcAverageHumanAge(dogAgesArr2);

// // Another way to calculate the average through chaining

// const calcAverageHumanAge2 = (arr) => {
//   const dogsInHumanYears = arr.map((value, index) =>
//     value <= 2 ? value * 2 : 16 + value * 4
//   );
//   console.log('Chaining:', dogsInHumanYears);
//   const dogsGreater18 = arr
//   .map((value, index) => (value <= 2 ? value * 2 : 16 + value * 4))
//   .filter((value, indexF) => value > 17)
//   console.log('Chaining: ', dogsGreater18);
//   const averageAge =
//     arr
//       .map((value, index) => (value <= 2 ? value * 2 : 16 + value * 4))
//       .filter((value, indexF) => value > 17)
//       .reduce((acc, value) => acc + value, 0) /
//     arr
//       .map((value, index) => (value <= 2 ? value * 2 : 16 + value * 4))
//       .filter((value, indexF) => value > 17).length;
//   console.log('Chaining: ', averageAge);
// };

// calcAverageHumanAge2(dogAgesArr1);
// calcAverageHumanAge2(dogAgesArr2);


/* Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
 Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight
 needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find 
Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's
 dogs eat too little!"
5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the 
  array's objects 😉)
    The Complete JavaScript Course 25
Hints:
§ Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, 
the current portion should be between 90% and 110% of the recommended portion.
Test data:
 
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, 
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] }, 
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀 */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, 
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] }, 
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
// Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight
// needs to be in kg)

dogs.forEach((dog) => {
  dog.recommendedFood = Number(((dog.weight ** 0.75 * 28) / 1000).toFixed(2))
});

console.log("1. Dogs: ", dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find 
// Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

dogs.forEach((dog) => {
  const isSarahs = dog.owners.includes('Sarah');
  if (isSarahs) {
    if ((dog.curFood > dog.recommendedFood * 1000 * 0.9) && (dog.curFood < dog.recommendedFood * 1000 * 1.1)) {
      console.log("2. Sarah's dog is eating rigth");
    } else if (dog.curFood < dog.recommendedFood * 1000 * 0.9) { console.log("2. Sarah's dog is eating less than recommended") }
      else { console.log("2. Sarah's dog is eating more than recommended") };
  };
});

// Another way...

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'}`);

// TILL HERE - CONTINUE dogs.find(dogs.owners.includes('Sarah'))

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
// ('ownersEatTooLittle').

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

dogs.forEach((dog) => {
  if (dog.curFood < dog.recommendedFood * 1000 * 0.9) {
    ownersEatTooLittle = ownersEatTooLittle.concat(dog.owners)
  };
  if (dog.curFood > dog.recommendedFood * 1000 * 1.1) {
    ownersEatTooMuch = ownersEatTooMuch.concat(dog.owners)
  };
});

console.log("3. Owners eat to much: ", ownersEatTooMuch);
console.log("3. Owners eat too litte: ", ownersEatTooLittle);

// It could be done also using filter and flatMap even though the number of lines/code would be similar.

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's
//  dogs eat too little!"

function buildStr(arr, str) {
  let stringToCon = '';
  arr.forEach((dog, index) => {
    if (index + 1 >= arr.length) {
      stringToCon = stringToCon + dog + "'s eat too " + str;
    } else {
      stringToCon = stringToCon + dog + " and ";
    }
  });
  return stringToCon;
};

console.log("4. ", buildStr(ownersEatTooMuch, ' much!'));
console.log("4. ", buildStr(ownersEatTooLittle, 'little!'));

// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)

console.log("5. Is there any dog eating exactly the amount of recommended food: ", 
  dogs.reduce((count, dog) => (dog.recommendedFood * 1000 === dog.curFood ? ++count : count), 0) > 0 ? 'true' : 'false');

// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)

console.log("6. Is there any dog eating an okay amount of food: ", 
  dogs.reduce((count, dog) => (((dog.recommendedFood * 1000 * 1.1 > dog.curFood) && (dog.recommendedFood * 1000 * 0.9 < dog.curFood)) ? ++count : count), 0) > 0 ? 'true' : 'false');

// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

let dogsEatingOk = dogs.filter((dog) => (dog.recommendedFood * 1000 * 1.1 > dog.curFood) && (dog.recommendedFood * 1000 * 0.9 < dog.curFood));
console.log("7. Array with dogs eating ok: ", dogsEatingOk);

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the 
//   array's objects 😉)

const sortedDogs = dogs.map((dog) => dog).sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log("8. Sorted dogs: ", sortedDogs);

