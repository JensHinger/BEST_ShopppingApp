import BusinessObject from './BusinessObject'

export default class ItemBO extends BusinessObject{

    constructor() {
        super();
        this.amount = 0
        this.unit = 0
    }

    setAmount(amount) {
        this.amount = amount
    }

    getAmount() {
        return this.amount
    }

    setUnit(unit) {
        this.unit = unit
    }

    getUnit() {
        return this.unit
    }

    static fromJSON(items) {
        let result = [];

        if (Array.isArray(items)) {
            items.forEach((c) => {
                Object.setPrototypeOf(c, ItemBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = items;
            Object.setPrototypeOf(c, ItemBO.prototype)
            result.push(c)
        }
        return result;
    }

}
