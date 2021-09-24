import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.
import View from './view.js'; 
import previewView from './previewView.js';

class BookmarksView extends View { // AMN - inherits all view methods
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it ;)';
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    _generateMarkup() {
        //console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    };
};

export default new BookmarksView();