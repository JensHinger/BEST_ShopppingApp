import BusinessObject from './BusinessObject'

export default class User extends BusinessObject{

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

}