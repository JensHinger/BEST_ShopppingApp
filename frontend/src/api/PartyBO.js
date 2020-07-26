import BusinessObject from './BusinessObject'

export default class PartyBO extends BusinessObject{
    // Returns an Array of PartyBOs from a given JSON structure
    static fromJSON(parties) {
        let result = [];

        if (Array.isArray(parties)) {
            parties.forEach((c) => {
                Object.setPrototypeOf(c, PartyBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = parties;
            Object.setPrototypeOf(c, PartyBO.prototype)
            result.push(c)
        }
        return result;
    }

}