import BusinessObject from './BusinessObject'

export default class StandardListEntryBO extends BusinessObject{

    constructor() {
        super();
        this.item_id = 0
        this.retailer_id = 0
        this.user_id = 0
        this.party_id = 0
        this.amount = 0
        this.unit = 0
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

    setAmount(amount){
        this.amount = amount
    }

    getAmount(){
        return this.amount
    }

    setUnit(unit){
        this.unit = unit
    }

    getUnit(){
        return this.unit
    }
    // Returns an Array of StandardListEntryBOs from a given JSON structure
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
