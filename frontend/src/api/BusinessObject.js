export default class BusinessObject {

   constructor() {
        this.name = "";
        this.id = 0;
        this.creation_date = new Date()
   }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }

    setID(id) {
        this.id = id
    }

    getID() {
        return this.id
    }

    setCreationDate(creation_date) {
        this.creation_date = creation_date
    }

    getCreationDate() {
        return this.creation_date
    }

    toString() {
        let result = ''
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }

}