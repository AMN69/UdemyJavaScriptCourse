'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // AMN - to avoid the page going up to the top when opening the modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// AMN - this does the same than above but we prefer above solution

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// AMN - adding scrolling to the page when clicking learn more goes to first section
const section1 = document.querySelector('#section--1');

// Scrolls from the place we are (current position) plus the top of the page (can be zero or other distance)
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // old way
  // window.scrollTo( {
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // modern way - only works on modern browsers.
  section1.scrollIntoView({ behavior: 'smooth' });
  });

// Page navigation

// we are adding an event listener to each (forEach) link. Imagine we had 1000 or 10000
// links, it wouldn't be very efficient. Then it's better to use event delegation.

// document.querySelectorAll('.nav__link').forEach(function(element) {
//   element.addEventListener('click', function (event){
//     event.preventDefault();
//     const id = this.getAttribute('href'); // we get the href value
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth'});
//   });
// });

// Event delegation

// Instead of adding an event listerner to each possible link you can add it to the link really clicked.
// For this we need to do two things: 
// a) Add the event listener to the common (to all links) parent element
// b) Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('nav__link')) { // Checking which area (event.target) was clicked (space between links is not considered)
    const id = event.target.getAttribute('href'); // getting the link clicked to...
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // ...scroll smoothly towards it.
  };
});







// AMN - important info:
// You can take the entire DOM, the head and the body like this

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// Get elements: querySelector, querySelectorAll, getElementById, getElementsByTagName and getElementsByClassName
// Add elements: insertAdjacentHTML()
// Delete elements: remove()

// Let's create and insert a new element (the header for cookies)
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// const header = document.querySelector('.header');
// header.prepend(message); // Adds just on top below header, with append just on the bottom of header
// And now we remove it when the user clicks on the button
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function() {
//     message.remove(); // we need to select the element and we did it above.
//   });

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%'; 
// We can add styles to the html but can't read them from the css by doing
// console.log(message.style.heigth). It only work for inline styles

// console.log(getComputedStyle(message)); // Now, yes. You get all styles on CSS
//console.log(getComputedStyle(message).color);

// We can add 40px to the height like this

//message.style.height = Number.parseFloat(getComputedStyle(message)
//                             .height, 10) + 30 + 'px'; // Number.paseFloat takes the number and leaves the px.

// On Style.css on :root we have the general styles at doc level and we can change them
//document.documentElement.style.setProperty('--color-primary', 'orangered');
// Now all elements with classeses with --color-primary change to orange red color 
 
// Atributes - we can read STANDARD elements properties
//const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src); // absolute address
// console.log(logo.className); // Be careful,for class is className like in React.

//logo.alt = 'Beatiful minimalist logo';
// For NON-STANDARD element properties we have to do this (it must exist, here it doesn't)
// console.log(logo.getAttribute('designer')); // I added on html Jonas on purpose.
// console.log(logo.setAttribute('company', 'Bankist'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // absolute address
// console.log(link.getAttribute('href')); // relative address

// Data attribute works to add new attributes to the HTML.
// It starts by data- and then version-number and here you use camelCase versionNumber w/o dashes
//console.log(logo.dataset.versionNumber); 

// Classes...
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j);
// logo.classList.toggle('c');
// logo.classList.contains('c');

// Don't use log.className = 'jonas' because replaces all the classnames by Jonas.

// Event listeners
//const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great you enter with your mouse on an h1');
// };
// h1.addEventListener('mouseenter', alertH1);

// remove the event listener after 6 seconds.
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 6000);

// Very important example of DOM behaviour on addEventListener

//const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
//const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)}, ${randomInt(0,255)})`;

// This makes than when you click on the navbar link button 'Features' the bubbling makes 
// that from bottom to up the click event is propagating, and as we have an event listener in
// each element the 'Feature' button, the container and the entire navbar change their colors

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// If we click on the container the 'Feature' button doesn't change but the container and the
// entire navbar does due to bubbling from container to navbar.

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// If we click on the navbar neither the 'Feature' button nor the container change. Only the
// navbar does and bubbling goes up to the top going through all the navbar family members 
// (parent, grandparent, etc...)
// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// How to read children and parent elements of an element.

//const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight')); // Finds children no matter how far is in the tree.
// console.log(h1.childNodes); // Takes all nodes (not only elements, text, scr, href, ...)
// console.log(h1.children); // Takes only elements (h1, div, span, etc...)
// h1.firstElementChild.style.color = 'white'; 
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
// console.log(h1.parentNode); // Takes all nodes
// console.log(h1.parentElement); // Takes only elements

// Finds parent no matter how far is in the tree.
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; // taking CSS vars directly 
// h1.closest('h1').style.background = 'var(--gradient-primary)'; // As there are NOT any other h1 close to this one this one itself will be updated

// Going sideways: siblings
// console.log(h1.previousElementSibling); // None because h1 is the first
// console.log(h1.nextElementSibling); // h4 element

// console.log(h1.previousSibling); // For all nodes (above for all elements).
// console.log(h1.nextSibling); 

// Combining parent and children to get siblings as well
//console.log(h1.parentElement.children);

// Finally we can modify all siblings by passing them to an array and manipulating them. We modify all except h1 but we could modify h1 as well.
// [...h1.parentElement.children].forEach(function (element) {
//   if (element != h1) element.style.transform = 'scale(0.5)';
// });

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(event) {
  const clicked = event.target.closest('.operations__tab');
  
  // Guard clause
  if (!clicked) return;
  
  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');
  

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // We select the content related with the button clicked
    .classList // Select the classList
    .add('operations__content--active') // and active the CSS that makes it appear.
  
});

// Menu fade animation

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this; // this = 0.5
    })
    logo.style.opacity = this; // this = 1
  }
}

// We are passing an "argument" into handler and the argument that is 0.5 and 1 
// could be an array in case we needed more than one parameter. On the handleHover
// function this argument is the word this.

nav.addEventListener('mouseover', handleHover.bind(0.5));  

nav.addEventListener('mouseout', handleHover.bind(1));  

// Sticky navigation or fixing the navbar on the top of the screen.
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) {
  nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
})
