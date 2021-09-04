// AMN - When this state is updated here the controller will access it becausse is exported from here to there (imported)
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

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

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);
        
        const {recipe} = data.data;
        state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        };
        console.log(recipe);
        console.log(state.recipe);
    } catch (error) {
        console.error(`${error}`); 
        throw error;
    }  
};

export const loadSearchResults = async function(query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

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
}