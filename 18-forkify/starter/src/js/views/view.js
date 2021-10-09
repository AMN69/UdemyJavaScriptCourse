// AMN - contrary to other classes we export this inmediately because we
// are not going to create any instance of this view. 
// The other views will extend from this view.

import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.

export default class View {
    _data;

    // AMN - This method renders the complete DOM for each change.

    /**
     * Render the recieve object to the DOM
     * @param {Object || Object[]} data The data to be rendered (e.g. recipe)
     * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM 
     * @returns {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author AMN (copying Joans Schmedtmann javascript course)
     * @todo Finish implementation
    */
    render(data, render = true) {
      // AMN - guard clause if no data (one recipe) or array (several recipes) is empty we render a message
      if (!data || (Array.isArray(data) && data.length === 0)) 
        return this.renderError();
      
      this._data = data;
      const markup = this._generateMarkup();

      if (!render) return markup;

      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // AMN - This method instead of rendering all the views only updates what has changed.
    // This is comparing real DOM with the new DOM we want to update. It only changes the
    // text and attributes that have changed on the real DOM instead of, as the above method
    // does updating always the entire real DOM for any simple change.

    update(data) {
     
      this._data = data;
      const newMarkup = this._generateMarkup();

      const newDOM = document.createRange().createContextualFragment(newMarkup); // AMN - converts the string into a new real DOM object
      const newElements = Array.from(newDOM.querySelectorAll('*')); // AMN - new DOM
      const curElements = Array.from(this._parentElement.querySelectorAll('*')); // AMN - old DOM

      newElements.forEach((newElement, index) => {
        const curEl = curElements[index];

        // AMN - Updates changed TEXT
        if (!newElement.isEqualNode(curEl) && newElement.firstChild?.nodeValue.trim() !== '') {
          curEl.textContent = newElement.textContent;
        };

        // AMN - Updates changed ATTRIBUTES
        if (!newElement.isEqualNode(curEl)) {
          Array.from(newElement.attributes).forEach(attribute => 
            curEl.setAttribute(attribute.name, attribute.value)) // AMN - we replace each attribute coming from the new element to the current element
        };
      })
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