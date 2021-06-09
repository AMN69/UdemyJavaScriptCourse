import {addToCart, totalPrice as price, tq} from './shoppingCart.js';

import * as ShoppingCart from './shoppingCart.js'
console.log("I'm in the main module importing shopping cart");

addToCart('bread', 5)

console.log(price, tq);

ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// AMN - It's better not to mix add and vars even though we do it here.
// AMN - Imports are not copy but live elements.
import add, {cart} from './shoppingCart.js'; // AMN - we can call a export default as we want to.

add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); 

//
///////////////////////////////////////
// The Module Pattern

// AMN - Before ES6 import/export modules we used the Module Pattern:
// programmers defined IIEF in a variable and then the variables had contact
// with the place they were borned. For this reason the ShoppingCart2 has access
// to the vars that were returned.
// The problem was that you had to defined several scripts in the HTML and put them
// in the rigth order. Now with modules import/export plus webpack/parcel bundlers
// you don't need to worry about adding several scripts in the HTML neither the
// order.

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

import cloneDeep from './node_modules/lodash-es/lodash.js';

const state = {
  cart: [
    {product: 'bread', quantity: 5},
    {product: 'pizza', quantity: 5},
  ],
  user: {loggedIn: true},
};;

const stateClone = Object.assign({}, state);
const stateCloneDeep = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateCloneDeep);

if (module.hot) {
  module.hot.accept();
}

// Babel converts ES6 code to previous javascript (before ES6) so old browsers can interpret it
// You can go deeper to load less code from Babel like:
// import 'core-js/stable/array/find' for array find method.
// import 'core-js/stable/primise' for promises.

import 'core-js/stable';    

// Polyfilling async functions
import 'regenerator-runtime/runtime';