import React, { Component } from 'react'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'
import InvitationBO from '../../api/InvitationBO'

class UserParties extends Component{

    constructor(props){
        super(props)

        this.state = {
            parties : [],
            listPartyDic : []
        }
    }

    componentWillMount() {
        this.getPartiesByUser()
    }

    getListsByParty(){
        var parties = this.state.parties
        parties.forEach(party => {
            ShoppingAPI.getAPI().getListsByPartyId(party.getID())
            .then(partyLists => partyLists.forEach(list => {
                this.setState(state => this.state.listPartyDic.push({key: party.getID(), value: list}))
            }))
        });
   }

    getPartiesByUser = () => {
        ShoppingAPI.getAPI().getAcceptedInvitationsBySourceUserId(2)
        .then(invitations => this.getPartyByInvitations(invitations))
    }
    
    getPartyByInvitations = (invitations) => {
       invitations.forEach(invitation => {
           ShoppingAPI.getAPI().getPartyById(invitation.getPartyiId())
           .then(function(party){ 
               this.setState({
                parties: [...this.state.parties, party]
           })
        }.bind(this))
       });
    }
    
    render(){
        const userParties = this.state.parties
        const listPartyDic = this.state.listPartyDic

        return(
            <div>
                {userParties.map((party) =>
                    <ExpansionPanel key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {party.getName()}
                        </ExpansionPanelSummary>
                            {listPartyDic.map((party,list) => 
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <Button>{list.getName()}</Button>
                                    </Typography>
                                </ExpansionPanelDetails>
                            )}                  
                    </ExpansionPanel> 
                )} 
            </div>  
        )
    }

}
export default UserParties