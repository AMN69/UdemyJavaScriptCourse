'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// AMN - Classes definition

class App {

    // AMN - private instance properties
    #workouts = [];
    #map; 
    #mapEvent;
    #mapZoomLevel = 18;
    
    constructor() { // AMN - We attach the event listener in the constructor to activate them from the beginning
        this._getPosition(); // AMN - This is like an event and detects the current position of the user  
        inputType.addEventListener('change', this._toggleElevationField)
        form.addEventListener('submit', this._newWorkout.bind(this)); // We listen when the form is submitted
    }

    // AMN - explanation about why we use bind to make things work.
    // The getCurrentPosition method is calling a normal function call _loadMap
    // it is NOT calling a method and therefore the this keyword is undefined
    // within _loadMap when called like on this way. 
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

    _hideForm() {
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }
    
    _toggleElevationField() { // We listen when the type of workout changes
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(event) {       
        event.preventDefault();
        if (!this._isDataOk()) return;

        const { lat, lng} = this.#mapEvent.latlng
        let workout = {};
        if (inputType.value === 'running') {
            workout = this._newRunning(lat, lng);
        } else {
            workout = this._newCycling(lat, lng);
        }
        this._renderingWorkout(workout); // not necessary bind because it's NOT a callback function and we call the function with this keyword
        
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''; // We need to clear the form fields
        this._hideForm();        
        this._listingWorkout(workout)
    }

    _renderingWorkout(workout) {
        L.marker(workout.coords).addTo(this.#map)
        .bindPopup(
            L.popup({ // Leaflet map popup (as well as other components) are configurable - see documentation
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
        }))
        .setPopupContent(workout.message)                                        
        .openPopup();
    }

    _listingWorkout(workout) {
        let htmlWorkouts = '';
        
        htmlWorkouts = htmlWorkouts + 
        `
        <li class="workout workout--${workout.type === 'Running' ? 'running' : 'cycling'}" data-id=${workout.id}>
            <h2 class="workout__title">${workout.message}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'Running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance.toFixed(2)}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration.toFixed(2)}</span>
                <span class="workout__unit">min</span>
            </div>
        `
        if (workout.type === 'Running') {
            htmlWorkouts = htmlWorkouts +
            `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(2)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence.toFixed(2)}</span>
                <span class="workout__unit">spm</span>
            </div>
            `
        } else {
            htmlWorkouts = htmlWorkouts +
            `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.speed.toFixed(2)}</span>
                    <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.elevationGain.toFixed(2)}</span>
                    <span class="workout__unit">m</span>
                </div>
            </li>
            `
        }
        form.insertAdjacentHTML('afterend', htmlWorkouts); // AMN - adds workouts after the form
        console.log("I'm injecting...");
    }

    _isDataOk() {
        const distance = parseFloat(inputDistance.value);
        const duration = parseFloat(inputDuration.value);
        const cadence = parseFloat(inputCadence.value);
        const elevation = parseFloat(inputElevation.value);
        
        if (isNaN(distance)) {
            alert('Distance must be a valid number.')
            return false;
        }
        if (distance <= 0) {
            alert('Distance must be greater than 0');
            return false;
        } 
        if (isNaN(duration)) {
            alert('Duration must be a valid number.')
            return false;
        }
        if (duration <= 0) {
            alert('Duration must be greater than 0');
            return false;
        }
        if (inputType.value === 'running' && isNaN(cadence)) {
            alert('Cadence must be a valid number.')
            return false;
        }
        if (inputType.value === 'running' && cadence <= 0) {
            alert('Cadence must be greater than 0');
            return false;
        }
        if (inputType.value === 'cycling' && isNaN(elevation)) {
            alert('Elevation gain must be a valid number.')
            return false;
        }
        return true;
    }

    _newRunning(lat, lng) {
        console.log("You clicked on running event");
        const newWorkout = new Running(
            parseFloat(inputDistance.value), 
            parseFloat(inputDuration.value), 
            [lat, lng], 
            parseFloat(inputCadence.value))
        this.#workouts.push(newWorkout);
        console.log("New Running: ", newWorkout);
        console.log("Current app: ", myApp);
        return newWorkout;
    }

    _newCycling(lat, lng) {
        console.log("You clicked on cycling event");
        const newWorkout = new Cycling(
            parseFloat(inputDistance.value), 
            parseFloat(inputDuration.value), 
            [lat, lng], 
            parseFloat(inputElevation.value))
        this.#workouts.push(newWorkout);
        console.log("New Cycling: ", newWorkout);
        console.log("Current app: ", myApp);
        return newWorkout;
    }
}

class Workout {
    id = (Date.now() + '').slice(-10); // AMN - Solution to get by. In reality we should look for a way to get a unique id.
    date = new Date();

    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

    settingWorkoutMsg(type) {
        if (type === 'Running') {
            return `${type} 🏃‍♂️ on ${months[this.date.getMonth()]} ${this.date.getDate()}`
        } else {
            return `${type} 🚴‍♀️ on ${months[this.date.getMonth()]} ${this.date.getDate()}`
        }
    }
}

class Running extends Workout {
    type = 'Running';

    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
        this.message = this.settingWorkoutMsg(this.type);
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'Cycling';

    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this.message = this.settingWorkoutMsg(this.type);
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed;
    }
}

const myApp = new App();
console.log("This is myApp: ", myApp);


