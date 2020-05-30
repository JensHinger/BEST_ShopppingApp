import ItemBO from './ItemBO'

export default class ShoppingAPI {

    // Singelton instance
    static #api = null;

    #shoppingServerBaseURL = '/shopping';

    //Item related
    #getAllItemsURL = () => `${this.#shoppingServerBaseURL}/items`;

    static getAPI() {
        if (this.#api == null) {
            this.#api = new ShoppingAPI();
        }
        return this.#api;
    }

    /**
    *  Returns a Promise which resolves to a json object.
    *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
    *  fetchAdvanced throws an Error also an server status errors
    */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

    getAllItems() {
        return this.#fetchAdvanced(this.#getAllItemsURL()).then((responseJSON) => {
            let ItemBOs = ItemBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(ItemBOs)
            })
        })

    }

}