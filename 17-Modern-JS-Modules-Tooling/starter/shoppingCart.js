console.log("I'm in the shopping cart exporting the shopping cart");

// AMN - all variables within the module are only accesible in the module. Therefore
// script.js can't use these variables as they are written

const shippingCost = 10; // AMN - by default can't be accessed outside the module
export const cart = [];

// AMN - Now we can use the addToCart outside the module

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq};

export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};
