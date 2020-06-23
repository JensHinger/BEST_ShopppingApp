import ItemBO from './ItemBO'
import PartyBO from './PartyBO'
import UserBO from './UserBO'
import ListBO from './ListBO'
import ListEntryBO from './ListEntryBO'
import StandardListEntryBO from './StandardListEntryBO'

export default class ShoppingAPI {

    // Singelton instance
    static #api = null;

    //Standard URL für MySQL Backend
    #shoppingServerBaseURL = '/shopping';

    //URL für Fakebackend
    //#shoppingServerBaseURL = '/api/shopping';

    //Invitation related
    #getInvitationByIdURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`
    #getPendInvitationsBySourceUserIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitation-by-source-user/${id}`
    #getPendInvitationsByTargetUserIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitation-by-target-user/${id}`
    #getAcceptedInvitationsBySourceUserIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitation-by-source-user/${id}`
    #getAcceptedInvitationsByTargetUserIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitation-by-target-user/${id}`
    #getPendInvitationsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/pending-invitations-by-user-in-party/${id}`
    #getAcceptedInvitationsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/accepted-invitations-by-user-in-party/${id}`
    #addInvitiationURL = () => `${this.#shoppingServerBaseURL}/invitation`
    #updateInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`
    #deleteInvitaitonURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`

    //Item related


    //List related
    #getListByIdURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`
    #getListsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/list-by-party/${id}`
    #addListnURL = () => `${this.#shoppingServerBaseURL}/list`
    #updateListURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`
    #deleteListURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`

    //Listentry related
    #getListEntryByIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    #getListEntriesByListIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-list/${id}`
    #getListEntriesByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-user/${id}`
    #addListEntryURL = () => `${this.#shoppingServerBaseURL}/listentry`
    #updateListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    #deleteListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`

    //Party related
    #getPartyByIdURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`
    #addPartyURL = () => `${this.#shoppingServerBaseURL}/party`
    #updatePartyURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`
    #deletePartyURL = (id) => `${this.#shoppingServerBaseURL}/party/${id}`

    
    //Retailer related
    #getRetailerByidURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`
    #addRetailerURL = () => `${this.#shoppingServerBaseURL}/retailer`
    #updateRetailerURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`
    #deleteRetailerURL = (id) => `${this.#shoppingServerBaseURL}/retailer/${id}`


    //StandardListEntry related
    #getStandardListEntrybyIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    #getStandardListEntryByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-party/${id}`
    #getStandardListEntryByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-user/${id}`
    #addStandardListEntryURL = () => `${this.#shoppingServerBaseURL}/standardlistentry`
    #updateStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    #deleteStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`

    //User related
    #getUserByIdURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}` 
    #getUserByEmailURL = (email) => `${this.#shoppingServerBaseURL}/user-by-email/${email}`
    #updateUserURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}`
    #deleteUserURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}`

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


    //Invitation related


    //Item related


    //List related
    

    //Listentry related
    //#getListEntryByIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    getListEntryById(id){
        return this.#fetchAdvanced(this.#getListEntryByIdURL(id)).then((responseJSON) => {
            let responseListEntryBO = ListEntryBO.fromJSON(responseJSON[0]);
                return new Promise(function(resolve){
                    resolve(responseListEntryBO)
                })
        })
    }
    //#getListEntryByListIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-list/${id}`
    getListEntriesByListId(id){
        return this.#fetchAdvanced(this.#getListEntriesByListIdURL(id)).then((responseJSON) => {
            let responseListEntryBOs = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseListEntryBOs)
                })
        })
    }
    //#getListEntriesByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/listentry-by-user/${id}`
    getListEntriesByUserId(id){
        return this.#fetchAdvanced(this.#getListEntriesByUserIdURL(id)).then((responseJSON) => {
            let responseListEntryBOs = ListEntryBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseListEntryBOs)
                })
        })
    }
    //#addListEntryURL = () => `${this.#shoppingServerBaseURL}/listentry`
    addListEntry(listEntryBO) {
        return this.#fetchAdvanced(this.#addListEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listEntryBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseListEntryBO = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }

    //#updateListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    updateListEntry(listEntryBO) {
        return this.#fetchAdvanced(this.#updateListEntryURL(listEntryBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listEntryBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseListEntryBO = ListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }
    
    //#deleteListEntryURL = (id) => `${this.#shoppingServerBaseURL}/listentry/${id}`
    deleteListEntry(id) {
        return this.#fetchAdvanced(this.#deleteListEntryURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseListEntryBO = ListEntryBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }
    //Party related

    
    //Retailer related


    //StandardListEntry related
    //#getStandardListEntrybyIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    getStandardListEntrybyId(id){
        return this.#fetchAdvanced(this.#getStandardListEntrybyIdURL(id)).then((responseJSON) => {
            let responseStandardListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseStandardListEntryBO)
                })
        })
    }
    //#getStandardListEntryByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-list/${id}`
    getStandardListEntryByPartyId(id){
        return this.#fetchAdvanced(this.#getStandardListEntryByPartyIdURL(id)).then((responseJSON) => {
            let responseStandardListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseStandardListEntryBO)
                })
        })
    }
    //#getStandardListEntryByUserIdURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry-by-user/${id}`
    getStandardListEntryByUserId(id){
        return this.#fetchAdvanced(this.#getStandardListEntryByUserIdURL(id)).then((responseJSON) => {
            let responseStandardListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseStandardListEntryBO)
                })
        })
    }
    //#addStandardListEntryURL = () => `${this.#shoppingServerBaseURL}/standardlistentry`
    addStandardListEntry(standardListEntryBO) {
        return this.#fetchAdvanced(this.#addStandardListEntryURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(standardListEntryBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }

    //#updateStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    updateStandardListEntry(listEntryBO) {
        return this.#fetchAdvanced(this.#updateStandardListEntryURL(listEntryBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listEntryBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }
    //#deleteStandardListEntryURL = (id) => `${this.#shoppingServerBaseURL}/standardlistentry/${id}`
    deleteStandardListEntry(id) {
        return this.#fetchAdvanced(this.#deleteStandardListEntryURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseListEntryBO = StandardListEntryBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseListEntryBO);
            })
        })
    }
}