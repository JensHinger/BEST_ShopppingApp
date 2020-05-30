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

    static fromJSON(items){
        let outputHTML = '';
        items = ItemBO.fromJSON(this.responseText);
        items.forEach((i) => {
            outputHTML += '<div>' + i.getid() + ' ' + i.getName() + '</div>';
        });
        return outputHTML
    }

    /* 
    static fromJSON(items) {
        let result = [];

        if (Array.isArray(items)) {
            items.forEach((a) => {
                Object.setPrototypeOf(a, ItemBO.prototype)
                result.push(a)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let a = items
            Object.setPrototypeOf(a, ItemBO.prototype)
            result.push(a)
        }

        return result;
    }
    */
}
