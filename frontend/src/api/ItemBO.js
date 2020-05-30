import BusinessObject from './BusinessObject'

export default class Item extends BusinessObject{

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

}
