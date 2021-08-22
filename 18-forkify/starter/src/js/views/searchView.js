// AMN - this class doesn't render anything but controls the query input
// and the click on the button
class SearchView { // AMN - inherits all view methods
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value
        this._clearInput();
        return query;
    };

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    };

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        }); // AMN - we add the event listener to the search class (button and field) so we listen the button click or the submit on the field
    };
};

export default new SearchView();