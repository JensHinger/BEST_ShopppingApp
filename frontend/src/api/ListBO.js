import BusinessObject from './BusinessObject'

export default class List extends BusinessObject{

    constructor() {
        super();
        this.partyl_id = 0
    }

    setPartylId(partyl_id) {
        this.partyl_id = partyl_id
    }

    getPartylId() {
        return this.partyl_id
    }

