import BusinessObject from './BusinessObject'

export default class RetailerBO extends BusinessObject{
    // Returns an Array of RetailerBOs from a given JSON structure
    static fromJSON(retailer) {
        let result = [];

        if (Array.isArray(retailer)) {
            retailer.forEach((c) => {
                Object.setPrototypeOf(c, RetailerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = retailer;
            Object.setPrototypeOf(c, RetailerBO.prototype)
            result.push(c)
        }
        return result;
    }
}