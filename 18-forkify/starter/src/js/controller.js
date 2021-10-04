// AMN - As we use the MVC (Model View Controller) we call these functions 
// controllers but they could be perfectly called handlers because it
// what they are, they are handlers controlling events.

import * as model from './model.js' // AMN - We import all the exported in model.js
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

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

    // AMN - update results view to mark selected search result and bookmarks view
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
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

// AMN - This controller is called when the user clicks the +/- buttons
// on the screen to increase or decrease the servings.
// Here we will update the state servings and the recipe view.
const controlServings = function(newServings) {
  model.updateServings(newServings);
//  recipeView.render(model.state.recipe);
// Instead of rendering all the view each time we will only update what has changed.  
  recipeView.update(model.state.recipe);  
}

const controlAddBookmark = function(){
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Render recipe
    recipeView.render(model.state.recipe);
    // Success message
    addRecipeView.renderMessage();
    // Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch(err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
  
}

// AMN - we want the controller to control the events (hash and load)
// therefore we init at the beginning the event listerers from the controller
// the event listerers are in the recipeView because are DOM but who
// invoke them is the controller who controls all.
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks); // AMN - Handles the loading of the bookmarks when the page is loaded 
  recipeView.addHandlerRender(controlRecipes); // AMN - Handles changes in the recipe through url
  searchView.addHandlerSearch(controlSearchResults); // AMN - Handles changes in the search area
  recipeView.addHandlerAddBookmark(controlAddBookmark); // AMN - Handles clicks on the bookmark to mark unmark
  paginationView.addHandlerClick(controlPagination); // AMN - Handles clicks on the pagination buttons to go forward or backward
  recipeView.addHandlerUpdateServings(controlServings); // AMN - Handles clicks on the +/- buttons to increase or decrease servings
  addRecipeView.addHandlerUpload(controlAddRecipe); // AMN - Handles clicks on the add Recipe button
};
init();