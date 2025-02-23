import { variables } from './base';

export const renderItem = item => {
    const markup = `
                <li class="shopping__item" data-itemid=${item.id}>
                    <div class="shopping__count">
                        <input type="number" class="shopping__count-value" value="${item.count}" step="${item.count}">
                        <p>${item.unit}</p>
                    </div>
                    <p class="shopping__description">${item.ingredient}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    `;

    variables.shopping.insertAdjacentHTML('beforeend', markup);
}

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
}