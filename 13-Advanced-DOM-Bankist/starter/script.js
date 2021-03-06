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

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//   nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// })

// Sticky navigation through intersection observer API (better than above one)

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null, // null option or without root option means that the viewport is observed
//   threshold: 0.1, // 0.1 means that when 10% of the target is visible the callback function is called
//   //threshold: [0, 0.2, 1], You can use an array and then the callback function is called in each target
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions) // on 10% viewport visible the callback function is called
// observer.observe(section1)

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height // We take the high of the nav dinamically

const stickyNav = function (entries) {
  const [entry] = entries
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // The nav appears 90px before the threshold really appears.
})

headerObserver.observe(header)

// Reveal sections

const allSections = document.querySelectorAll('.section') // We take all sections
const revealSection = function(entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver (revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]') // we only select those images with low-resolution
const loadImg = function (entries, observer) {
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src // if we are intersecting the img we replace the low-quality one by the high-quality one
  // We remove the blur once the image is loaded. We could instead 
  // remove the lazy-img directly just when intersecting but in case the
  // quality of the connection was, for example 3G we will see that the
  // image would take a long time to load with 100% quality.
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  
    observer.unobserve(entry.target)
  })
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px' // We want the images to upload and remove the blur time before we reach the area where they are placed
})

imgTargets.forEach(img => imgObserver.observe(img))

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide') // AMN - There are three slide classes 
  const btnLeft = document.querySelector('.slider__btn--left')
  const btnRight = document.querySelector('.slider__btn--right')
  const dotContainer = document.querySelector('.dots')

  let curSlide = 0;
  const maxSlide = slides.length // Max number slides we can go right

  //Functions
  const createDots = function () {
    slides.forEach(function(_, index) {
      dotContainer
        .insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`)
    })
  }

  const goToSlide = function(toSlide) { // Goes to the slide passed
    slides
      .forEach((slide, index) => (slide.style.transform = `translateX(${100 * (index - toSlide)}%)`)
  )}

  const activateDot = function(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'))
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active')
  }

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) { // We can go right till max slides - 1 (array starts at zero)
      curSlide = 0
    } else {
      curSlide++
    }

    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const prevSlide = function () {
    if (curSlide === 0) { // We can go left till reach slide 0 (really is the first one)
      curSlide = maxSlide - 1
    } else {
      curSlide--
    }
    
    goToSlide(curSlide)
    activateDot(curSlide)
  }

  // Initialize function

  const init = function() {
    goToSlide(0)
    createDots()
    activateDot(0)
  }
  init()

  // Event handlers

  btnLeft.addEventListener('click', prevSlide) // Listening arrow left
  btnRight.addEventListener('click', nextSlide) // Listening arrow rigth

  document.addEventListener('keydown', function (event) {
    event.key === 'ArrowLeft' && prevSlide() // Listening keyboard arrow left
    event.key === 'ArrowRight' && nextSlide() // Listening keyboard arrow right
  })

  dotContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('dots__dot')) {
      const {slide} = event.target.dataset // takes from index.html the dataset slide
      goToSlide(slide)
      activateDot(slide)
    }
  })
}

slider()

// DOMContentLoaded is the first event that happens when a page is loaded.

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('HTML parsed and DOM tree built!', event);
})

window.addEventListener('load', function(event) {
  console.log('Pagen fully loaded', event);
})

// window.addEventListener('beforeunload', function(event) {
//   event.preventDefault()
//   console.log(event);
//   event.returnValue = ''
// })