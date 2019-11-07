export const variables = {
    searchInput: document.querySelector('.search__field'),
    searchBtn: document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
}

export const elememntStrings = {
    loader: 'loader',
};

export const renderLoader = parent => {
    const loader = `
        <div class='${elememntStrings.loader}'>
            <svg>
                <use href="img/icons.svg#icon-cw"
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elememntStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};