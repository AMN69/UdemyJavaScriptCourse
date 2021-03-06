'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    let newDate = new Date (acc.movementsDates[i]);
    let intDate = new Intl.DateTimeFormat(acc.locale).format(newDate); 

    let intNumber = new Intl.NumberFormat(((acc.locale)), {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);
    console.log("Figures: ", intNumber);
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
        <div class="movements__date">${intDate}</div>
        <div class="movements__value">${intNumber}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Examples with numbers - Section 12th - episode 168

// console.log(23 === 23.0); 
// console.log(23 == 23.0);
// console.log(0.1 + 0.2);
// console.log(0.1 + 0.2 === 0.3)
// console.log(Number(23));
// console.log(+'23');
// console.log(Number.parseInt('39px', 10));
// console.log(Number.parseInt('e23'));

// console.log(Number.parseFloat('2.5rem'));
// console.log(Number.parseInt('2.5rem'));

// Better to check only if a value is NaN not to check numbers
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));


// Best way to check if a number is a number instead of isNaN.
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20X'));
// console.log(Number.isFinite(23 / 0));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(24.0));
// console.log(Number.isInteger(23 / 0));

// Examples with numbers - Section 12th - episode 169

// console.log(Math.sqrt(25)); // Square root
// console.log(25 ** (1 / 2)); // Square root
// console.log(8 ** (1 / 3));  // Cubic root

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2)); // It makes parsing
// console.log(Math.max(5, 18, '23px', 11, 2)); 

// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat('10px') ** 2); //circle area

// console.log(Math.trunc(Math.random() * 6) + 1); // Match.random generates a rancom number fron 0 to 0.99999 and Match.trunc removes decimals. The +1 is to get numbers from 1 to 6 otherwise we would get max to 5.

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min; // a random number between max and min.
// console.log(randomInt (10, 20));

// console.log(Math.trunc(23.3));

// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.ceil('23.3')); // it works with type coertion
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9')); // it works with type coertion

// trunc and floor get the same results with positive numbers but not with negatives ones (be careful!)

// console.log(Math.trunc(-23.3)); // it gives -23
// console.log(Math.floor(-23.3)); // it gives -24 (+23.3 gives 23)

// rounding decimals
// console.log((2.7).toFixed(0)); //string
// console.log((2.7).toFixed(3)); //string with 3 decimals filled with zeros
// console.log((2.345).toFixed(2)); // string with 2 decimals rounded up
// console.log(+(2.345).toFixed(2)); // now a number with 2 decimals rounded up
// console.log(Number((2.345).toFixed(2))); // id but with number instead of +// Examples with numbers - Section 12th - episode 168

// Dates and times

// const now = new Date(); // current date and time
// console.log(now);
// console.log(new Date('Feb 04 2021 20:23:29 GMT+0100')); // Giving a specific date and time
// console.log(new Date('December 24, 2015')); // js writes de date without time.
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2021, 1, 4, 22, 25, 10)); // Be careful, month 1 is Feb 'cos months start by zero

// console.log(new Date(2021, 10, 31)); // It doesn't exist nov 31st so js sums up one day and transform to dec 1st.

//dates in js starts on jan 1st 1970.

// console.log(new Date(0));

// We can get Jan 4th 1970 like this...

// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Getting different parts of a date

// 

// Experimenting with API - Intl (international dates)

const now = new Date();
const options = { // Formating date
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
}
const intnowUS = new Intl.DateTimeFormat('en-US', options).format(now); // US format date
const intnowGB = new Intl.DateTimeFormat('en-GB').format(now); // GB format date
const intnowCAT = new Intl.DateTimeFormat('cat-SP', options).format(now);
console.log("intl now US: ", intnowUS);
console.log("intl now GB: ", intnow
console.log("intl now CAT: ", intnowCAT);

// Experimenting with API - Intl (international numbers)

const num = 25394.45;

const options2 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
}

console.log('US:      ', new Intl.NumberFormat('en-US', options2).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options2).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options2).format(num));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, options2).format(num));

// Experimenting setTimeOut function

setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, 'olives', 'spinach');
console.log('Waiting...');

// Experimenting setInterval

const ingredients = ['ing1', 'ing2'];

const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, ...ingredients);
console.log('Waiting...')
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// setInterval
const options3 = {
//year: 'numeric', month: 'numeric', day: 'numeric',
hour: 'numeric', minute: 'numeric', second: 'numeric',
hour12: false,
timeZone: 'Europe/Paris'
};
setInterval(function () {
const now = new Date()
const nowInt = new Intl.DateTimeFormat('sp-SP', options3).format(now)
console.log(nowInt)
}, 1000);

// We implement a timer (countdown timer) at the login
// Bankist countdown
let timer = 600 // we start at 10 minutes (600 seconds)
const theCountDown = setInterval(function () {
const min = String(Math.trunc(timer / 60)).padStart(2, '0');
const sec = String(timer % 60).padStart(2, '0');
console.log(`Counting down formatted... ${min}:${sec}`) // Code to use to manipulate DOM and show the countdown
timer--;
if (timer < 0) {
stopTimer();
};
}, 1000);
// We need to stop the countdown timer when the timer reaches 0 or when we login to a new user.
function stopTimer() {
clearInterval(theCountDown);
};
// we need to restart the countdown timer when the user request a loan or makes a transfer.
function reStartTimer() {
timer = 6;
}