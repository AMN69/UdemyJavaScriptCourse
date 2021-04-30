'use strict';

// prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// AMN - Classes definition

class App {

    #workouts = [];
    #map; 
    #mapEvent;
    #mapZoomLevel = 18;
    
    constructor() {
        //this.mapEvent;
        this._getPosition();        
        inputType.addEventListener('change', this._toggleElevationField)
        form.addEventListener('submit', this._newWorkout.bind(this)); // We listen when the form is submitted
    }

    _getPosition() {
        const unknownUserPos = () => {
            alert('We could not get your position');
        }
        if (navigator.geolocation) { // Checking whether our browser allows geolocalization
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), unknownUserPos); // AMN - we call the function and passing the myApp object otherwise _loadMap wouldn't be able to use object vars. See also: https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
        } else {
            alert('Your browser does not allow geolocalization');
        }
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude]; // We need an array.
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // AMN: coords + zoom (the greater the nearest)
        
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { // AMN - Leaflet uses different maps. Here openstreet but you can use google maps or others
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // AMN - the style can be changed as well 
        }).addTo(this.#map);
    
        L.marker(coords).addTo(this.#map)
            .bindPopup('Your place')
            .openPopup();
        this.#map.on('click', this._showForm.bind(this)) // AMN - puts the cursor on the form field. We call the function and passing the myApp object otherwise _loadMap wouldn't be able to use object vars. See also: https://stackoverflow.com/questions/2236747/what-is-the-use-of-the-javascript-bind-method
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }
    
    _toggleElevationField() { // We listen when the type of workout changes
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(event) {       
        event.preventDefault();
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''; // We need to clear the form fields
        const { lat, lng} = this.#mapEvent.latlng
        L.marker([lat, lng]).addTo(this.#map)
        .bindPopup(
            L.popup({ // Leaflet map popup (as well as other components) are configurable - see documentation
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();
    }
}

class Workout {
    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

    id;
    date;
}

class Running extends Workout {
    constructor(distance, duration, coords, cadence, pace) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.pace = pace;
    }

    name;
}

class Cycling extends Workout {
    constructor(distance, duration, coords, elevationGain, speed) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.speed = speed;
    }

    name;
}

const myApp = new App();
console.log("This is myApp: ", myApp);


