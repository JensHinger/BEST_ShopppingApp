import ItemBO from './ItemBO'
import PartyBO from './PartyBO'
import UserBO from './UserBO'
import ListBO from './ListBO'


export default class ShoppingAPI {

    // Singelton instance
    static #api = null;

    //Standard URL für MySQL Backend
    #shoppingServerBaseURL = '/shopping';

    //URL für Fakebackend
    //#shoppingServerBaseURL = '/api/shopping';

    //Item related
    #getAllItemsURL = () => `${this.#shoppingServerBaseURL}/item`;

    //Party related
    #getAllPartiesByUserURL = () => `${this.#shoppingServerBaseURL}/party`;


    //User related
    #getUserURL = () => `${this.#shoppingServerBaseURL}/user8`;

    //Shoppinglist related
    #getAllListsByPartyURL = () => `${this.#shoppingServerBaseURL}/list`


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
    #fetchAdvanced = (url, init) => fetch(url, init).then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        }
    )

    //Items

    getAllItems() {
        return this.#fetchAdvanced(this.#getAllItemsURL()).then((responseJSON) => {
            let ItemBOs = ItemBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(ItemBOs)
            })
        })
    }

    //Parties

    getPartiesByUser(id) {
        return this.#fetchAdvanced(this.#getAllPartiesByUserURL()).then((responseJSON) => {
            let PartyBOs = PartyBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(PartyBOs)
            })
        })
    }


    //User

    getUser() {
        return this.#fetchAdvanced(this.#getUserURL()).then((responseJSON) => {
            let UserBOs = UserBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(UserBOs)
            })
        })
    }


    //ShoppingList

    getListsByParty(id) {
        return this.#fetchAdvanced(this.#getAllListsByPartyURL()).then((responseJSON) => {
            let ListBOs = ListBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(ListBOs)
            })
        })
    }
}