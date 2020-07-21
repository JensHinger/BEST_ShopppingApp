import BusinessObject from './BusinessObject'

export default class ReportItemBO extends BusinessObject{

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

    static fromJSON(reportItems) {
        let result = [];

        if (Array.isArray(reportItems)) {
            reportItems.forEach((c) => {
                Object.setPrototypeOf(c, ReportItemBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = reportItems;
            Object.setPrototypeOf(c, ReportItemBO.prototype)
            result.push(c)
        }
        return result;
    }

}
