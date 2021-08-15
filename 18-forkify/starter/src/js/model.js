// AMN - When this state is updated here the controller will access it becausse is exported from here to there (imported)

export const state = {
    recipe: {},
};

export const loadRecipe = async function(id) {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        
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
        console.log("within model error");
        alert(error);
    };   
}