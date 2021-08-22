import icons from 'url:../../img/icons.svg'; // Parcel 2 - path to the icons file.
import View from './view.js'; 

class PaginationView extends View { // AMN - inherits all view methods
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const currentPage = this._data.currentPage;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // AMN - We are in page 1 and there are other pages forward
        if(currentPage === 1 && numPages > 1) {
            return `
                <button class="btn--inline pagination__btn--next">
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
                <button class="btn--inline pagination__btn--prev">
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
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next">
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