import * as model from './model.js' // AMN - We import all the exported in model.js
import RecipeView from './views/recipeView';

import 'core-js/stable'; // AMN - Polyfylling rest (not async/await)
import 'regenerator-runtime/runtime'; // AMN - Polyfilling async/await
import recipeView from './views/recipeView';

///////////////////////////////////////

const messageClass = document.querySelector('div > div.message');

// AMN - We get a recipe from the API by its id accordingly with API documentation 
// (https://forkify-api.herokuapp.com/v2) 
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // AMN location is the entire url
    if (!id) return; // AMN - Guard clause just in case we don't have any id.
    // AMN - while loading the recipe show a spinner
    RecipeView.renderSpinner();

    // AMN - we load the recipe
    await model.loadRecipe(id);

    // AMN - we render the recipe 
    RecipeView.render(model.state.recipe);    
  } catch (error) {
    console.log("within controller error with error: ", error);
  }
};

// AMN - we want the controller to control the events (hash and load)
// therefore we init at the beginning the event listerers from the controller
// the event listerers are in the recipeView because are DOM but who
// invoke them is the controller who controls all.
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();