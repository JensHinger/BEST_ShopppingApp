import BusinessObject from './BusinessObject'

export default class StandardListEntry extends BusinessObject{

    constructor() {
        super();
        this.item_id = 0
        this.retailer_id = 0
        this.user_id = 0
        this.list_id = 0
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


}
