// AMN - contrary to other classes we export this inmediately because we
// are not going to create any instance of this view. 
// The other views will extend from this view.

import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.

export default class View {
    _data;

    render(data) {
      // AMN - guard clause if no data (one recipe) or array (several recipes) is empty we render a message
      if (!data || (Array.isArray(data) && data.length === 0)) 
        return this.renderError();
      
      this._data = data;
      const markup = this._generateMarkup();
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
      this._parentElement.innerHTML = '';
    }

    // AMN - Meanwhile we wait for taking back the recipe from the API we launch an spinner.

    renderSpinner() {
      const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderError(message = this._errorMessage) {
      const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };

    renderMessage(message = this._message) {
      const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    };
}