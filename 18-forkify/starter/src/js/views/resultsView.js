import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.
import View from './view.js'; 
import previewView from './previewView.js';

class ResultsView extends View { // AMN - inherits all view methods
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please, try again!';
    _message = '';

    _generateMarkup() {
        //console.log(this._data);
        return this._data.map(result => previewView.render(result, false)).join('');
    };
};

export default new ResultsView();