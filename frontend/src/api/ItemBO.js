import BusinessObject from './BusinessObject'

export default class ItemBO extends BusinessObject{

    constructor() {
        super();
        
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
