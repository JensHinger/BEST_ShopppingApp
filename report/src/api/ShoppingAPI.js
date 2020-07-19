import ItemBO from './ItemBO'
import PartyBO from './PartyBO'
import UserBO from './UserBO'
import ListBO from './ListBO'
import ListEntryBO from './ListEntryBO'
import StandardListEntryBO from './StandardListEntryBO'
import RetailerBO from './RetailerBO'
import InvitationBO from './InvitationBO'

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
    #updateInvitationURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`
    #deleteInvitationURL = (id) => `${this.#shoppingServerBaseURL}/invitation/${id}`

    //Item related
    #getAllItemsURL = () => `${this.#shoppingServerBaseURL}/item`
    #getItemByIdURL = (id) => `${this.#shoppingServerBaseURL}/item/${id}`
    #addItemURL = () => `${this.#shoppingServerBaseURL}/item`
    #updateItemURL = (id) => `${this.#shoppingServerBaseURL}/item/${id}`
    #deleteItemURL = (id) => `${this.#shoppingServerBaseURL}/item/${id}`

    //List related
    #getListByIdURL = (id) => `${this.#shoppingServerBaseURL}/list/${id}`
    #getListsByPartyIdURL = (id) => `${this.#shoppingServerBaseURL}/list-by-party/${id}`
    #addListURL = () => `${this.#shoppingServerBaseURL}/list`
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
    #getAllRetailerURL = () => `${this.#shoppingServerBaseURL}/retailer`
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
    #getUserByGoogleIdURL = (googleId) => `${this.#shoppingServerBaseURL}/user-by-google-id/${googleId}`
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

    getInvitationById(id){
        return this.#fetchAdvanced(this.#getInvitationByIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getPendInvitationsBySourceUserId(id){
        return this.#fetchAdvanced(this.#getPendInvitationsBySourceUserIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getPendInvitationsByTargetUserId(id){
        return this.#fetchAdvanced(this.#getPendInvitationsByTargetUserIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getAcceptedInvitationsBySourceUserId(id){
        return this.#fetchAdvanced(this.#getAcceptedInvitationsBySourceUserIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getAcceptedInvitationsByTargetUserId(id){
        return this.#fetchAdvanced(this.#getAcceptedInvitationsByTargetUserIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getPendInvitationsByPartyId(id){
        return this.#fetchAdvanced(this.#getPendInvitationsByPartyIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    getAcceptedInvitationsByPartyId(id){
        return this.#fetchAdvanced(this.#getAcceptedInvitationsByPartyIdURL(id)).then((responseJSON) => {
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseInvitationBO)
                })
        })
    }

    addInvitation(invitationBO){
        return this.#fetchAdvanced(this.#addInvitiationURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(invitationBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseInvitationBO);
            })
        })
    }

    updateInvitation(invitationBO){
        return this.#fetchAdvanced(this.#updateInvitationURL(invitationBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(invitationBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseInvitationBO);
            })
        })
    }

    deleteInvitation(InvitationID){
        return this.#fetchAdvanced(this.#deleteInvitationURL(InvitationID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseInvitationBO = InvitationBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseInvitationBO);
            })
        })
    }


    //Item related
    getAllItems(){
        return this.#fetchAdvanced(this.#getAllItemsURL()).then((responseJSON) => {
            let responseItemBO = ItemBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseItemBO)
                })
        })
    }
    
    getItemById(id){
        return this.#fetchAdvanced(this.#getItemByIdURL(id)).then((responseJSON) => {
            let responseItemBO = ItemBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseItemBO)
                })
        })
    }

    addItem(itemBO){
        return this.#fetchAdvanced(this.#addItemURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(itemBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseItemBO = ItemBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            console.log(responseItemBO)
            return new Promise(function (resolve) {
                resolve(responseItemBO);
            })
        })
    }

    updateItem(itemBO){
        return this.#fetchAdvanced(this.#updateItemURL(itemBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(itemBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseItemBO = ItemBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseItemBO);
            })
        })
    }

    deleteItem(itemID){
        return this.#fetchAdvanced(this.#deleteItemURL(itemID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseItemBO = ItemBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseItemBO);
            })
        })
    }

    //List related
    
    getListById(id){
        return this.#fetchAdvanced(this.#getListByIdURL(id)).then((responseJSON) => {
            let responseListBO = ListBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseListBO)
                })
        })
    }

    getListsByPartyId(id){
        return this.#fetchAdvanced(this.#getListsByPartyIdURL(id)).then((responseJSON) => {
            let responseListBO = ListBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseListBO)
                })
        })
    }

    addList(listBO){
        return this.#fetchAdvanced(this.#addListURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseListBO = ListBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseListBO);
            })
        })
    }

    updateList(listBO){
        return this.#fetchAdvanced(this.#updateListURL(listBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(listBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseListBO = ListBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseListBO);
            })
        })
    }

    deleteList(listID){
        return this.#fetchAdvanced(this.#deleteListURL(listID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseListBO = ListBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseListBO);
            })
        })
    }

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

    getPartyById(id){
        return this.#fetchAdvanced(this.#getPartyByIdURL(id)).then((responseJSON) => {
            let responsePartyBO = PartyBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responsePartyBO)
                })
        })
    }

    addParty(partyBO){
        return this.#fetchAdvanced(this.#addPartyURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partyBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responsePartyBO = PartyBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responsePartyBO);
            })
        })
    }

    updateParty(partyBO){
        return this.#fetchAdvanced(this.#updatePartyURL(partyBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partyBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responsePartyBO = PartyBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responsePartyBO);
            })
        })
    }

    deleteParty(partyID){
        return this.#fetchAdvanced(this.#deletePartyURL(partyID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responsePartyBO = PartyBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responsePartyBO);
            })
        })
    }

    //Retailer related

    getAllRetailer(){
        return this.#fetchAdvanced(this.#getAllRetailerURL()).then((responseJSON) => {
            let responseRetailerBO = RetailerBO.fromJSON(responseJSON);
                return new Promise(function(resolve){
                    resolve(responseRetailerBO)
                })
        })
    }

    getRetailerById(id){
        return this.#fetchAdvanced(this.#getRetailerByidURL(id)).then((responseJSON) => {
            let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseRetailerBO)
                })
        })
    }

    addRetailer(retailerBO){
        return this.#fetchAdvanced(this.#addRetailerURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(retailerBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseRetailerBO);
            })
        })
    }

    updateRetailer(retailerBO){
        return this.#fetchAdvanced(this.#updateRetailerURL(retailerBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(retailerBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseRetailerBO);
            })
        })
    }

    deleteRetailer(retailerID){
        return this.#fetchAdvanced(this.#deleteRetailerURL(retailerID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseRetailerBO = RetailerBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseRetailerBO);
            })
        })
    }

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
            let responseStandardListEntryBO = StandardListEntryBO.fromJSON(responseJSON);
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
          
//User related
    
    //#getUserByIdURL = (id) => `${this.#shoppingServerBaseURL}/user/${id}`
    getUserById(id){
        return this.#fetchAdvanced(this.#getUserByIdURL(id)).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseUserBO)
                })
        })
    }

    getUserByEmail(email){
        return this.#fetchAdvanced(this.#getUserByEmailURL(email)).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseUserBO)
                })
        })
    }

    getUserByGoogleId(googleId) {
        return this.#fetchAdvanced(this.#getUserByGoogleIdURL(googleId)).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
                return new Promise(function(resolve){
                    resolve(responseUserBO)
                })
        })
    }
    
    updateUser(userBO){
        return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
                }).then((responseJSON) => {
                    // We always get an array of CustomerBOs.fromJSON
                    let responseUserBO = UserBO.fromJSON(responseJSON)[0];
                    // console.info(accountBOs);
                    return new Promise(function (resolve) {
                        resolve(responseUserBO);
            })
        })
    }

    deleteUser(userID){
        return this.#fetchAdvanced(this.#deleteUserURL(userID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseUserBO);
            })
        })
    }
}
