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

console.log("cheking");
btnLogin.addEventListener('click', checkUserAndPin);

function checkUserAndPin() {

  event.preventDefault(); // Avoids the button to restart the page.
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].username === inputLoginUsername.value &&
        accounts[i].pin === Number(inputLoginPin.value)) {
        containerApp.style.opacity = 100;
        inputLoginUsername.value = "";
        inputLoginPin.value = "";
        labelWelcome.textContent = `Good day, ${accounts[i].name}!`;
        showMovs(accounts[i].movements);
        showBal(accounts[i].movements);
        showSummary(accounts[i].movements);
    };
  };
};

// We need a function to update the UI who calls showMovs(), showBal(), showSummary() 

function showBal(movements) {
  labelBalance.textContent = movements.reduce((acc, mov) => acc + mov, 0) + " €"; // Starts at zero
};

function showSummary(movements) {
  labelSumIn.textContent = movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0) + " €";
  labelSumOut.textContent = Math.abs(movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0)) + " €";
  // In Jonas the interest below 1€ is filtered out.
  labelSumInterest.textContent = (movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0) * 1.2 / 100) + " €";
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
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Fourth - Show balance

// Fith - Show summary


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


