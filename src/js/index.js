import axios from 'axios';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/SearchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import * as listView from './views/listView';
import { variables, renderLoader, elememntStrings, clearLoader } from './views/base';
import Likes from './models/Likes';



/** Global State of the app
 * 
 * Search object
 * Shopping list
 * Current recipe object
 * liked items object
 */



const state = {};


window.state = state;

/********************************************* */
/** SEARCH CONTROLLER */
/********************************************* */
const controlSearch = async() => {

    // 1. Get query from the view

    // const query = 'pizza';
    const query = searchView.getInput();


    // console.log(query);


    if (query) {

        // 2. New search object and add it to the state
        state.search = new Search(query);

        //3. Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(variables.searchRes);

        try {
            //4. Search for recipes
            await state.search.getResults();

            //5. Render it on the UI
            clearLoader();
            searchView.renderResults(state.search.recipe);
            // console.log(state.search.recipe);
        } catch (err) {
            clearLoader();
            alert('Something went wrong while searching...');
            console.log(err);
        }

    }
}


/********************************************* */
/** RECIPE CONTROLLER */
/********************************************* */

const controlRecipe = async() => {

    //Get ID from URL
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepaare UI for changes

        recipeView.clearRecipe();
        renderLoader(variables.recipe);
        //Create new recipe object
        state.recipe = new Recipe(id);


        try {

            //Get recipe data and parse ing

            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServing();

            //Render recipe
            clearLoader();
            console.log((state.recipe));

            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (err) {
            alert('Error processing the recipe.');
            console.log(err);
        }




    }

}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
window.addEventListener('load', controlSearch);





/********************************************* */
/** LIST CONTROLLER */
/********************************************* */

const controlList = () => {
    //create new if none 
    if (!state.list) state.list = new List();

    //add ingredients to the list

    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        console.log(item);

        listView.renderItem(item);
    });
}

//Handling deletion and updation

variables.shopping.addEventListener('click', el => {
    const id = el.target.closest('.shopping__item').dataset.itemid;

    if (el.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);

        //delete from UI
        listView.deleteItem(id);
    } else if (el.target.matches('.shopping__count-value')) {
        const val = parseFloat(el.target.value, 10);
        state.list.updateCount(id, val);
    }
})


/********************************************* */
/** LIKE BTNS */
/********************************************* */

state.likes = new Likes();

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;


    //user has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        //Add like to state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        //toggle btn
        likesView.toggleLikeButton(true);

        //add like to UI list

        likesView.renderLike(newLike);
        console.log(state.likes);


        //user has NOT yet liked current recipe
    } else {
        //remove like to state
        state.likes.deleteLike(currentID);

        //toggle btn
        likesView.toggleLikeButton(false);


        //remove like to UI list
        likesView.deleteLike(currentID);
        console.log(state.likes);
    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


/********************************************* */
/** HANDLING RECIPE BTNS */
/********************************************* */

variables.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
    // console.log(state.recipe);

});



/********************************************* */
/** EVENT LISTENERS */
/********************************************* */

variables.searchBtn.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



variables.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    // console.log(e.target);


    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipe, goToPage);
        // console.log(goToPage);
    }

});
// const search = new Search('Burger');
// console.log(search);