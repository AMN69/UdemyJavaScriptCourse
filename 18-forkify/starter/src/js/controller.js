import * as model from './model.js' // AMN - We import all the exported in model.js
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // AMN - Polyfylling rest (not async/await)
import 'regenerator-runtime/runtime'; // AMN - Polyfilling async/await
import { async } from 'regenerator-runtime';

///////////////////////////////////////

// AMN - We get a recipe from the API by its id accordingly with API documentation 
// (https://forkify-api.herokuapp.com/v2) 
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // AMN location is the entire url
    if (!id) return; // AMN - Guard clause just in case we don't have any id.
    // AMN - while loading the recipe show a spinner
    recipeView.renderSpinner();

    // AMN - we load the recipe
    await model.loadRecipe(id);

    // AMN - we render the recipe 
    recipeView.render(model.state.recipe);    
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    
    // AMN - while loading the recipe show a spinner
    resultsView.renderSpinner();

    // AMN - we load the search
    await model.loadSearchResults(query);

    // AMN - we render the results of the search
    resultsView.render(model.getSearchResultsPage());

    // AMN - we render the pagination buttons
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function(goToPage) {
  // AMN - we render the NEW results of the search
  resultsView.render(model.getSearchResultsPage(goToPage));

  // AMN - we render the NEW pagination buttons
  paginationView.render(model.state.search)
}

// AMN - we want the controller to control the events (hash and load)
// therefore we init at the beginning the event listerers from the controller
// the event listerers are in the recipeView because are DOM but who
// invoke them is the controller who controls all.
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();