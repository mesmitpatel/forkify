import axios from 'axios';
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/SearchView';
import { variables, renderLoader, elememntStrings, clearLoader } from './views/base';



/** Global State of the app
 * 
 * Search object
 * Shopping list
 * Current recipe object
 * liked items object
 */

const state = {};


/********************************************* */
/** SEARCH CONTROLLER */
/********************************************* */
const controlSearch = async() => {

    // 1. Get query from the view

    const query = searchView.getInput();
    // console.log(query);


    if (query) {

        // 2. New search object and add it to the state
        state.search = new Search(query);

        //3. Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(variables.searchRes);

        //4. Search for recipes
        await state.search.getResults();

        //5. Render it on the UI
        clearLoader();
        searchView.renderResults(state.search.recipe);
        // console.log(state.search.recipe);

    }
}


/********************************************* */
/** RECIPE CONTROLLER */
/********************************************* */

// const controlRecipe = async() => {

//     //Get ID from URL
//     const id = window.location.hash.replace('#', '');

//     if (id) {
//         // Prepaare UI for changes


//         //Create new recipe object
//         state.recipe = new Recipe(id);

//         //Get recipe data
//         await state.recipe.getRecipe();

//         //Calculate servings and time
//         state.recipe.calcTime();
//         state.recipe.calcServing();

//         //Render recipe
//         console.log(state.recipe);


//     }

// }

// window.addEventListener('hashchange', controlRecipe);


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
        console.log(goToPage);
    }

});
// const search = new Search('Burger');
// console.log(search);