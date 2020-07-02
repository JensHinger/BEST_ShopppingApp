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
            lists : []
        }
    }

    componentDidMount() {
        this.getPartiesByUser()
        this.getListsByParty()
    }

    getListsByParty(){
        this.state.parties.map((party) => 
            ShoppingAPI.getAPI().getListsByPartyId(party.getId())
            .then(listBOs => this.setState({lists : listBOs}))
        )
   }

    getPartiesByUser = () => {
        console.log("halolo")
        ShoppingAPI.getAPI().getAcceptedInvitationsBySourceUserId(2)
        .then(InvitationBOs => function(){
            var partyiId = InvitationBOs.getPartyiId()
            ShoppingAPI.getAPI().getPartyById(partyiId)
            .then(partyBOs => this.setState({parties : partyBOs})
            )
        })
    }
    
    render(){
        const userParties = this.state.parties
        const lists = this.state.lists
        return(
            <div>
                {userParties.map((party) =>
                    <ExpansionPanel key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {party.getName()}
                        </ExpansionPanelSummary>
                            {lists.map((list) => 
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