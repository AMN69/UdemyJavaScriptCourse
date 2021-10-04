import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.
import View from './view.js'; 

class AddRecipeView extends View { // AMN - inherits all view methods
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded!'

    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');    
    }

    // AMN - when we click on the add recipe button the modal appears.
    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    };

    // AMN - when we click on the close button of the modal or outside the modal window
    // we add the 'hidden' class and the modal window dissapears.
    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    }

    // AMN - The FormData return the data from an HTML form on an array of elements.
    // each element is a pair nam/value fields in another array with two elements that are the form entries.

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const dataArray = [...new FormData(this)] // AMN - This here is the form because the _parentElement is the upload button
            const data = Object.fromEntries(dataArray); // AMN - takes an array of entries an converts into an object.
            handler(data);
        })
    }

    _generateMarkup() {}
        
};

export default new AddRecipeView();