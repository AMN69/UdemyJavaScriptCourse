'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AMN - Here we get countries (as many as we want to) randomly (making AJAX calls)
// const getCountryData = function(country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         const html = `
//             <article class="country">
//                 <img class="country__img" src="${data.flag}" />
//                 <div class="country__data">
//                     <h3 class="country__name">${data.name}</h3>
//                     <h4 class="country__region">${data.region}</h4>
//                     <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//                     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//                 </div>
//                 </article>
//         `;
//         countriesContainer.insertAdjacentHTML('beforeend', html)
//         countriesContainer.style.opacity = 1;
//     })
// }

// AMN - data may appear in random order due to async function used (AJAX API)

// getCountryData('portugal')
// getCountryData('spain');
// getCountryData('usa');
// getCountryData('germany')

// AMN - Now we are going to chain several calls one after another, only calling a next call when current has finished

// const renderCountry = function(data, className = '') {
//     const html = `
//             <article class="country ${className}">
//                 <img class="country__img" src="${data.flag}" />
//                 <div class="country__data">
//                     <h3 class="country__name">${data.name}</h3>
//                     <h4 class="country__region">${data.region}</h4>
//                     <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//                     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//                 </div>
//                 </article>
//         `;
//         countriesContainer.insertAdjacentHTML('beforeend', html)
// }

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;

}

// const getCountryAndNeighbour = function(country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);
//         // AMN - first the first country
//         renderCountry(data);
//         // AMN - Then we get the neighbour country 
//         const [neighbour] = data.borders;
//         if(!neighbour) return; // AMN - Some countries doens't have neighbours
//         // AMN - Then we call the neighbour
//         const request2 = new XMLHttpRequest();
//         request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`)
//         request2.send();

//         request2.addEventListener('load', function() {
//             const data2 = JSON.parse(this.responseText)
//             console.log(data2);
//             renderCountry(data2, 'neighbour');
//         })
//     })
// }

//getCountryAndNeighbour('portugal')
//getCountryAndNeighbour('usa')

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal')
// console.log(request);

// AMN - above code now with fetch managing the response.

// const getCountryData = function (country) {
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`) // AMN - 1st promise
//     .then(function (response) {
//         console.log(response)
//         return response.json() // AMN - return data when the promise is fullfilled
//     })
//     .then(function(data) { // AMN - 2nd promise. The response is a promise as well that we have to manage.
//         console.log(data);
//         renderCountry(data[0])
//     })
// }

// AMN - important note. The 'then' always returns a promise. In the case of response.json() the result
// is return and catch in 'data' in the next 'then'. 

// const getJSON = function(url, errorMsg = 'Something went wrong') {
//     return fetch(url).then(response => {
//         if(!response.ok)
//             throw new Error(`${errorMsg} (${response.status})`) // AMn - own error
//         return response.json()
//     }
// )}

// const getCountryData = function (country) {
//     // Country 1
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`) // AMN - 1st promise...
//     .then(response => {
//         if(!response.ok)
//             throw new Error(`Country not found (${response.status})`) // AMn - own error
//         return response.json()
//     }) // AMN - ...returns data when the promise is fullfilled
//     .then(data => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];

//         // Country 2
//         return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`); // AMN - 2nd promise. The response is a promise as well that we have to manage.   
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.error(`${err} 💥 💥 💥`)
//         renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again`)
//     }) // AMN - catches errors - Catch itself returns a promise as well.
//     .finally(() => { // AMN - it doesn't matter whether the promise is fullfilled or rejected this will be always executed
//         countriesContainer.style.opacity = 1;
//     })
// };

// const getCountryData = function (country) {
//     // Country 1
//     getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
//     .then(data => {
//         renderCountry(data[0]);
//         const neighbour = data[0].borders[0];
        
//         if (!neighbour) throw new Error('No neighbour found!');

//         // Country 2
//         return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found') // AMN - 2nd promise. The response is a promise as well that we have to manage.   
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//         console.error(`${err} 💥 💥 💥`)
//         renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again`)
//     }) // AMN - catches errors - Catch itself returns a promise as well.
//     .finally(() => { // AMN - it doesn't matter whether the promise is fullfilled or rejected this will be always executed
//         countriesContainer.style.opacity = 1;
//     })
// };

// btn.addEventListener('click', function() {
//     getCountryData('portugal');
// })

//getCountryData('catalonia');

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API 
to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country 
name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. 
Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. 
Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
This is an error with the request. Remember, fetch() does NOT reject the promise in this case. 
So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, 
and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// function whereAmI (lat, lng) {
//     console.log(lat, lng)
//     return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//         if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
//         return response.json();
//     })
//     .then(data => 
//         { if(!data.latt || data.latt === "") throw new Error(`Not data found - data: ${data}`) 
//             console.log(`You are in ${data.city}, ${data.country}`)
//         getCountryData(data.country)
//     })
//     .catch(err => console.log("The error is: ", err.message));
// }

// whereAmI(52.508, 13.381) // AMN - Germany

// whereAmI(19.037, 72.873); // AMN - India

// whereAmI(-33.933, 18.474); // AMN - South Africa

// AMN - example of callback queue and microtasks queue 

// console.log('Test start'); // executes 1st
// setTimeout(() => console.log('0 sec timer'), 0); // goes to the callback queue and the event loop executes it after microtasks queue
// Promise.resolve('Resolved promise 1').then(res => console.log(res)) // goes to the microtasks queue and the event loop executes it as soon as the promise is resolved

// AMN - this promise takes time and makes the time out to delay far more than 0 seconds
// Promise.resolve('Resolved promise 2 takes time and delays setTimeout').then(res => {
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res)
// })

// console.log('Test end'); // executes 2nd

// AMN - Promise creating and test

// const lotteryPromise = new Promise(function (resolve, reject) {
    
//     console.log('Lottery draw ongoing...')

//     setTimeout(function() {
//         if (Math.random() >= 0.5) {
//             resolve('You WIN!!!')
//         } else {
//             reject(new Error('You lost your money :('))
//         }
//     }, 2000)
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// Promisifying setTimeout
const wait = function(seconds) {
    return new Promise(function(resolve) {
        setTimeout(resolve, seconds * 1000)       
    })
}

// wait(2)
//     .then(() => {
//         console.log('1 second passed')
//         return wait(1)})
//     .then(() => {
//         console.log('2 seconds passed')
//         return wait(1)})
//     .then(() => {
//         console.log('3 seconds passed')
//         return wait(1)})    
//     .then(() => console.log('4 seconds passed'))

// Promise.resolve('abc').then(x => console.log(x)) // You can inmediately resolve a promise or...
// Promise.reject('abc').catch(x => console.error(x)) // reject a promise

// AMN - example of promisifying the Geolocation API

// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.error(err))

// AMN - above prmisified
const getPosition = function() {
    return new Promise(function(resolve, reject) {
        // navigator.geolocation.getCurrentPosition(
        // position => resolve(position),
        // err => reject(err))
        navigator.geolocation.getCurrentPosition(resolve, reject) // AMN - idem as above but simpler
    })
}

//getPosition().then(pos => console.log(pos))

const getCountryData = function (country) {
    // Country 1
    getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
    .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
        
        if (!neighbour) throw new Error('No neighbour found!');

        // Country 2
        return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found') // AMN - 2nd promise. The response is a promise as well that we have to manage.   
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
        console.error(`${err} 💥 💥 💥`)
        renderError(`Something went wrong 💥 💥 💥 ${err.message}. Try again`)
    }) // AMN - catches errors - Catch itself returns a promise as well.
    .finally(() => { // AMN - it doesn't matter whether the promise is fullfilled or rejected this will be always executed
        countriesContainer.style.opacity = 1;
    })
};

const getJSON = function(url, errorMsg = 'Something went wrong') {
    return fetch(url).then(response => {
        if(!response.ok)
            throw new Error(`${errorMsg} (${response.status})`) // AMn - own error
        return response.json()
    }
)}

const renderCountry = function(data, className = '') {
<<<<<<< HEAD
    console.log("Data in renderCountry: ", data);
=======
>>>>>>> 9927473951c0a6bc1be1d877517ef08b710831d6
    const html = `
            <article class="country ${className}">
                <img class="country__img" src="${data.flag}" />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                </div>
                </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend', html)
        countriesContainer.style.opacity = 1;
}

// function whereAmI () {
//     getPosition().then(pos => {
//         const {latitude: lat, longitude: lng} = pos.coords;
//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     })
//     .then(response => {
//         if (!response.ok) throw new Error(`Problem with geocoding ${response.status}`);
//         return response.json();
//     })
//     .then(data => 
//         { if(!data.latt || data.latt === "") throw new Error(`Not data found - data: ${data}`) 
//             console.log(`You are in ${data.city}, ${data.country}`)
//         getCountryData(data.country)
//     })
//     .catch(err => console.log("The error is: ", err.message));
// }

//whereAmI(52.508, 13.381) // AMN - Mi position

//btn.addEventListener('click', whereAmI)

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image 
(use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the 
DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image 
(HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' 
in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const imagesContainer = document.querySelector('.images');
// let image;

// function createImage(imgPath) {
//     return new Promise(function(resolve, reject) {
//         if (imgPath !== null && imgPath !== "") {
//             image = document.createElement('img')
//             //image.classList.add('images')
//             image.src = imgPath
//             image.addEventListener('load', function() {
//                 imagesContainer.append(image)
//                 resolve(image)
//             })
//             image.addEventListener('error', function () {
//                 reject(new Error('Image not found'))
//             })
//         } else {
//             reject(new Error('The image url is empty'))
//         }
//     })
// }

// const main = document.querySelector('.container');

// createImage("/Users/andreumartineznuevo/OneDrive/Andreu/Udemy Javascript course/complete-javascript-course-master/16-Asynchronous/final/img/img-1.jpg")
// // .then(data => imagesContainer.append(data))
// .then(image => {return wait(2)})
// .then(() => {
//     image.style.display = "none"
//     return createImage("/Users/andreumartineznuevo/OneDrive/Andreu/Udemy Javascript course/complete-javascript-course-master/16-Asynchronous/final/img/img-2.jpg")
// })
// .then(image => {return wait(2)})
// .then(() => image.style.display = "none")
// .catch(err => console.error(err));

// AMN - Promises with async/await

const whereAmI = async function() {
    try {
        // Geolocation
        const pos = await getPosition();
        const { latitude: lat, longitude: lng } = pos.coords;

        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
        if (!resGeo.ok) throw new Error('Problem getting location data')
        
        const dataGeo = await resGeo.json();

        // Country data
        // fetch(`https://restcountries.eu/rest/v2/name/${country}`))
        // .then(res => console.log(res))
        const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`)
        if (!resGeo.ok) throw new Error('Problem getting country data')

        const data = await res.json()
        renderCountry(data[0])
        return `You are in ${dataGeo.city}, ${dataGeo.country}`
    } catch (err) {
        console.error(err);
        renderError(`Something went wrong ${err.message}`)
        // Reject promise returned from async function
        throw err;
    }
};

// whereAmI()
//     .then(city => console.log(`2: ${city}`)) // AMN - or all goes well...
//     .catch(err => console.error(`2: ${err.message}`)) // AMN - or goes bad but...
//     .finally(() => console.log('All done')) // AMN - this is always executed either the promise is fullfilled or rejected
// // whereAmI();
// // whereAmI();
// // whereAmI();

// AMN - Important note: whether you put a ; in the instruction before (async ... ) or just in front of async like this: ;(async...) otherwise it gives an error

(async function() {
    try {
        const city = await whereAmI();
        console.log(`2: ${city}`);
    } catch (err) {
        console.error(`2: ${err.message}`);
    } 
    console.log('All done');
})();

console.log('FIRST');



// AMN - explanation about try / catch bloc. 
// It is used to manage errors like in this example when a constant is modified
// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
// } catch (err) {
//     alert(err.message)   
// }

// AMN - Here we are doing 3 async calls when we could do them in paralell
const get3Countries = async function (country1, country2, country3) {
    try {
        // const [data1] = await getJSON(`https://restcountries.eu/rest/v2/name/${country1}`)
        // const [data2] = await getJSON(`https://restcountries.eu/rest/v2/name/${country2}`)
        // const [data3] = await getJSON(`https://restcountries.eu/rest/v2/name/${country3}`)
        // console.log([data1.capital, data2.capital, data3.capital]);
        const data = await Promise.all([
            getJSON(`https://restcountries.eu/rest/v2/name/${country1}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${country2}`),
            getJSON(`https://restcountries.eu/rest/v2/name/${country3}`)
        ])
        console.log(data.map(d => d[0].capital));
    } catch (err) {
        console.error(err)        
    }
}

get3Countries('portugal', 'usa', 'france')

