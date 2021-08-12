import * as model from './model.js' // AMN - We import all the exported in model.js
import RecipeView from './views/recipeView';

import 'core-js/stable'; // AMN - Polyfylling rest (not async/await)
import 'regenerator-runtime/runtime'; // AMN - Polyfilling async/await

//const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const messageClass = document.querySelector('div > div.message');

// AMN - We prepare the HTML code to render the recipe gotten. 

// function renderRecipe(recipe) {
//   let ingredientsList = "";
//   // AMN - another option is to use a map instead of each
//   recipe.ingredients.forEach(ingredient => {
//     ingredientsList +=`
//         <li class="recipe__ingredient">
//           <svg class="recipe__icon">
//             <use href="${icons}#icon-check"></use>
//           </svg>
//           <div class="recipe__quantity">${ingredient.quantity !== null ? ingredient.quantity : ''}</div>
//           <div class="recipe__description">
//             <span class="recipe__unit">${ingredient.unit}</span>
//             ${ingredient.description}
//           </div>
//         </li>
//       `
//   });
//   const theRecipe = `
//     <figure class="recipe__fig">
//       <img src="${recipe.image}" alt="Recipe image" class="recipe__img" />
//       <h1 class="recipe__title">
//         <span>${recipe.title}</span>
//       </h1>
//     </figure>

//     <div class="recipe__details">
//       <div class="recipe__info">
//         <svg class="recipe__info-icon">
//           <use href="${icons}#icon-clock"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
//         <span class="recipe__info-text">minutes</span>
//       </div>
//       <div class="recipe__info">
//         <svg class="recipe__info-icon">
//           <use href="${icons}#icon-users"></use>
//         </svg>
//         <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
//         <span class="recipe__info-text">servings</span>

//         <div class="recipe__info-buttons">
//           <button class="btn--tiny btn--increase-servings">
//             <svg>
//               <use href="${icons}#icon-minus-circle"></use>
//             </svg>
//           </button>
//           <button class="btn--tiny btn--increase-servings">
//             <svg>
//               <use href="${icons}#icon-plus-circle"></use>
//             </svg>
//           </button>
//         </div>
//       </div>

//       <div class="recipe__user-generated">
//         <svg>
//           <use href="${icons}#icon-user"></use>
//         </svg>
//       </div>
//       <button class="btn--round">
//         <svg class="">
//           <use href="${icons}#icon-bookmark-fill"></use>
//         </svg>
//       </button>
//     </div>

//     <div class="recipe__ingredients">
//       <h2 class="heading--2">Recipe ingredients</h2>
//       <ul class="recipe__ingredient-list">
//         ${ingredientsList}
//       </ul>
//     </div>

//     <div class="recipe__directions">
//       <h2 class="heading--2">How to cook it</h2>
//       <p class="recipe__directions-text">
//         This recipe was carefully designed and tested by
//         <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
//         directions at their website.
//       </p>
//       <a
//         class="btn--small recipe__btn"
//         href="${recipe.sourceUrl}"
//         target="_blank"
//       >
//         <span>Directions</span>
//         <svg class="search__icon">
//           <use href="${icons}#icon-arrow-right"></use>
//         </svg>
//       </a>
//     </div>
//   `;
//   console.log(theRecipe);
//   return theRecipe;
// }

// AMN - In case we don't found recipes we render an error.

// const noRecipesErr = `
//   <div class="error">
//     <div>
//       <svg>
//         <use href="${icons}#icon-alert-triangle"></use>
//       </svg>
//     </div>
//     <p>No recipes found for your query. Please try again!</p>
//   </div>
// `;

// AMN - We get a recipe from the API by its id accordingly with API documentation (https://forkify-api.herokuapp.com/v2) 
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // AMN location is the entire url
    if (!id) return; // AMN - Guard clause just in case we don't have any id.
    recipeView.renderSpinner();

    // AMN - we load the recipe
    await model.loadRecipe(id);

    // AMN - we render the recipe 
    recipeView.render(model.state.recipe);    
  } catch (error) {
    alert(error);
  }
};

//messageClass.remove(); // AMN - another option is to use innerHTML = '';
//recipeContainer.insertAdjacentHTML('afterbegin', spinner);
//const spinnerClass = document.querySelector('.spinner');

//AMN - Listening hash change on url to load a new recipe or simple the loading page first time

//window.addEventListener("hashchange", theRecipe); // AMN - change on url hast
//window.addEventListener("load", theRecipe); // AMN - first time the page loads (no hash change yet)

// AMN - this is a way of doing the same that above but once (think about having a lot of events to listen to)

['hashchange', 'load'].forEach(event => window.addEventListener(event, RecipeView.render()));

//theRecipe('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
//theRecipe('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc90b');
