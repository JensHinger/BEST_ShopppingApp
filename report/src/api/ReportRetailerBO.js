import BusinessObject from './BusinessObject'

export default class ReportRetailerBO extends BusinessObject{

    constructor() {
        super();
        this.commonness = 0
    }
    
    setCommonness(commonness) {
        this.commonness = commonness
    }

    getCommonness() {
        return this.commonness
    }

    static fromJSON(reportRetailer) {
        let result = [];

        if (Array.isArray(reportRetailer)) {
            reportRetailer.forEach((c) => {
                Object.setPrototypeOf(c, ReportRetailerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = reportRetailer;
            Object.setPrototypeOf(c, ReportRetailerBO.prototype)
            result.push(c)
        }
        return result;
    }
}