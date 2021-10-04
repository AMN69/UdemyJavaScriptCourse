// AMN - When this state is updated here the controller will access it becausse is exported from here to there (imported)
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { getJSON, sendJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        currentPage: 1,
        resultsPerPage: RES_PER_PAGE // AMN - 10 results per page on the search 
    },
    bookmarks: []
};

const createRecipeObject = function (data) {
    const {recipe} = data.data;
    return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key}) // AMN - If there is a key we desectructure the pair key and recipe.key otherwise there is no key in the object
    };
};

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        
        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true
        else
            state.recipe.bookmarked = false;
        console.log(state.recipe);
    } catch (error) {
        console.error(`${error}`); 
        throw error;
    }  
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;
        state.search.currentPage = 1;

        const data = await getJSON(`${API_URL}?search=${query}`);
        //console.log(data);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,   
            }
        });
    } catch (error) {
        console.error(`${error}`);
        throw error;
    }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
    state.search.currentPage = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage; 

    return state.search.results.slice(start, end);
};

export const updateServings = function(newServings) {
    console.log(newServings)
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    persistBookmarks();
};

export const deleteBookmark = function(id) {
    // Detele bookmark
    const index = state.bookmarks.findIndex(element => element.id === id);
    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}
init();

// AMN - only used when we want to clear all the bookmarks for testing or something.
const clearBookmarks = function(){
    localStorage.clear('bookmarks');
};
//clearBookmarks();

// AMN - from the form we receive an array of entries and we want the ones with 
// firt entry = 'ingredient' (to take the ingredients) and second entry <> '' 
// (empty ones are not needed)
// Once we have this for each ingr we extract the quantity, unit and description and 
// return them as an object that is what we needed.
// We needed to got from an array (form) to an object that we need to upload the data
// in the API.
export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '' )
            .map(ingr => { const ingArr = ingr[1].replaceAll(' ', '').split(',');
            // AMN - The array entered in the form for each ingredient must have three datum.
            if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)')

            const [quantity, unit, description] = ingArr;

            return { quantity: quantity ? +quantity : null, unit, description }; // AMN - quantity is converted to number
        });

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };
        console.log(recipe);
        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe)
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch(err) {
        throw err;
    }
};