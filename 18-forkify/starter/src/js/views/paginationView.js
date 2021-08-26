import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.
import View from './view.js'; 

class PaginationView extends View { // AMN - inherits all view methods
    _parentElement = document.querySelector('.pagination');

    // AMN - we listen for a click on the closest element to the pagination
    // class using the html class "btn--inline". The button migth be on the 
    // left, right, migth be the user clicks on the page number or the 
    // icon and either way it has to work. This is the reason we look
    // for the closest element to the parent element.
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return;

            const goToPage = +btn.dataset.goto; // AMN - by using dataset data.goto we get the page to go
            handler(goToPage);
        })
    }

    _generateMarkup() {
        const currentPage = this._data.currentPage;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // AMN - We are in page 1 and there are other pages forward
        if(currentPage === 1 && numPages > 1) {
            return `
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // AMN - Last page
        if(currentPage === numPages && numPages > 1) {
            return `
                <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
            `;
        }
        // AMN - Other pages forward and backward
        if(currentPage < numPages) {
            return `
                <button data-goto="${currentPage - 1}"class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        // AMN - We are in page 1 and no other pages forward exist
        return '';
    }
};

export default new PaginationView();