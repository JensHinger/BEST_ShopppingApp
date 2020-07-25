import BusinessObject from './BusinessObject'

export default class UserBO extends BusinessObject{

    constructor() {
        super();
        this.email = ""
        this.google_id = ""
    }

    setEmail(email) {
        this.email = email
    }

    getEmail() {
        return this.email
    }

    setGoogleId(google_id) {
        this.google_id = google_id
    }

    getGoogleId() {
        return this.google_id
    }
    // Returns an Array of UserBOs from a given JSON structure
    static fromJSON(users) {
        let result = [];
        
        if (Array.isArray(users)) {
            users.forEach((c) => {
                Object.setPrototypeOf(c, UserBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = users;
            Object.setPrototypeOf(c, UserBO.prototype)
            result.push(c)
        }
        return result;
    }

}