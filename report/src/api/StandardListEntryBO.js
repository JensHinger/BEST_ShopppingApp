import BusinessObject from './BusinessObject'

export default class StandardListEntryBO extends BusinessObject{

    constructor() {
        super();
        this.item_id = 0
        this.retailer_id = 0
        this.user_id = 0
        this.party_id = 0
    }

    setItemId(item_id) {
        this.item_id = item_id
    }

    getItemId() {
        return this.item_id
    }

    setRetailerId(retailer_id) {
        this.retailer_id = retailer_id
    }

    getRetailerId() {
        return this.retailer_id
    }

    setUserId(user_id) {
        this.user_id = user_id
    }

    getUserId() {
        return this.user_id
    }

    setPartyId(party_id){
        this.party_id = party_id
    }

    getPartyId(){
        return this.party_id
    }

    static fromJSON(standardlistentries) {
        let result = [];
        
        if (Array.isArray(standardlistentries)) {
            standardlistentries.forEach((c) => {
                Object.setPrototypeOf(c, StandardListEntryBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = standardlistentries;
            Object.setPrototypeOf(c, StandardListEntryBO.prototype)
            result.push(c)
        }
        return result;
    }
}
