import BusinessObject from './BusinessObject'

export default class ListEntryBO extends BusinessObject{

    constructor() {
        super();
        this.item_id = 0
        this.retailer_id = 0
        this.user_id = 0
        this.list_id = 0
        this.checked = 0
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

    setListId(list_id) {
        this.list_id = list_id
    }

    getListId() {
        return this.list_id
    }

    setchecked(condition) {
        this.checked = condition
    }

    getchecked(){
        return this.checked
    }

    static fromJSON(listentries) {
        let result = [];
        
        if (Array.isArray(listentries)) {
            listentries.forEach((c) => {
                Object.setPrototypeOf(c, ListEntryBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = listentries;
            Object.setPrototypeOf(c, ListEntryBO.prototype)
            result.push(c)
        }
        return result;
    }
}
