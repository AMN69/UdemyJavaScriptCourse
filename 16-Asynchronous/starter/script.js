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

const renderCountry = function(data, className = '') {
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

const getCountryAndNeighbour = function(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        // AMN - first the first country
        renderCountry(data);
        // AMN - Then we get the neighbour country 
        const [neighbour] = data.borders;
        if(!neighbour) return; // AMN - Some countries doens't have neighbours
        // AMN - Then we call the neighbour
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`)
        request2.send();

        request2.addEventListener('load', function() {
            const data2 = JSON.parse(this.responseText)
            console.log(data2);
            renderCountry(data2, 'neighbour');
        })
    })
}

//getCountryAndNeighbour('portugal')
getCountryAndNeighbour('usa')

