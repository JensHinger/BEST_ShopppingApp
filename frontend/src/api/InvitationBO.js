import BusinessObject from './BusinessObject'

export default class InvitationBO extends BusinessObject{

    constructor() {
        super();
        this.partyi_id = 0
        this.target_user_id = 0
        this.source_user_id = 0
        this.is_accepted = 0
    }

    setPartyiId(partyi_id) {
        this.partyi_id = partyi_id
    }

    getPartyiId() {
        return this.partyi_id
    }

    setTargetUserId(target_user_id) {
        this.target_user_id = target_user_id
    }

    getTargetUserId() {
        return this.target_user_id
    }
    
    setSourceUserId(source_user_id) {
        this.source_user_id = source_user_id
    }

    getSourceUserId() {
        return this.source_user_id
    }

    setIsAccepted(boolean) {
        this.is_accepted = boolean
    }

    getIsAccepted() {
        return this.is_accepted
    }
    static fromJSON(invitations) {
        let result = [];
        
        if (Array.isArray(invitations)) {
            invitations.forEach((c) => {
                Object.setPrototypeOf(c, InvitationBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = invitations;
            Object.setPrototypeOf(c, InvitationBO.prototype)
            result.push(c)
        }
        return result;
    }

}