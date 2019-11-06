import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '4e917f1dfe7390b046fd8ae39c2bfa83';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipe = res.data.recipes;
            // console.log(this.recipe);
        } catch (err) {
            alert(err);
        }
    }
}