import { variables } from './base';



export const getInput = () => variables.searchInput.value;

export const clearInput = () => {
    variables.searchInput.value = '';
};

export const clearResults = () => {
    variables.searchResultList.innerHTML = '';
    variables.searchResPages.innerHTML = '';
};

// export const highlightSelected = id => {
//     document.querySelector(`a[href="#${id}']`).classList.add('results__link--active');
// };

//paneer butter masala extra spicy
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }

    return title;
};

const renderRecipe = recipe => {
    const markup = `
            <li>
                <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    variables.searchResultList.insertAdjacentHTML('beforeend', markup);


};

const createBtn = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page + 1}">
       <span>Page ${type === 'prev' ? page-1 : page + 1}</span> 
       <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>
    `;


const renderButtons = (page, numResults, recPerPage) => {
    const pages = Math.ceil(numResults / recPerPage);

    let button;

    if (page === 1 && pages > 1) {
        button = createBtn(page, 'next');
    } else if (page === pages && pages > 1) {
        button = createBtn(page, 'prev');
    } else {
        button = `${createBtn(page, 'prev')} ${createBtn(page, 'next')}`;
        //both btn
    }

    variables.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, recPerPage = 10) => {

    //page division
    const start = (page - 1) * recPerPage;
    const end = page * recPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page, recipes.length, recPerPage);
};