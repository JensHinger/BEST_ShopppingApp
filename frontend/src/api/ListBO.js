import BusinessObject from './BusinessObject'

export default class ListBO extends BusinessObject{

    constructor() {
        super();
        this.partyl_id = 0
    }

    setPartylId(partyl_id) {
        this.partyl_id = partyl_id
    }

    getPartylId() {
        return this.partyl_id
    }

    // Returns an Array of ListBOs from a given JSON structure
    static fromJSON(lists) {
        let result = [];

        if (Array.isArray(lists)) {
            lists.forEach((c) => {
                Object.setPrototypeOf(c, ListBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = lists;
            Object.setPrototypeOf(c, ListBO.prototype)
            result.push(c)
        }
        return result;
    }

}

