import React, { Component } from 'react'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'
import ManageGroup from "../pages/ManageUser"
//import ManageGroup from "./components/pages/ManageParty";
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, } from 'react-router-dom';
import InvitationBO from '../../api/InvitationBO'

class UserParties extends Component{

    constructor(props){
        super(props)

        this.state = {
            parties : [],
            lists : [],
            expanded: true 
        }
    }

    componentDidMount() {
        this.getPartiesByUser()
    }


    getListsByParty(party_id){
        ShoppingAPI.getAPI().getListsByPartyId(party_id)
        .then(list => 
            this.setState({lists : list}),
            this.setState({expanded: this.state.expanded != party_id ? party_id : false})
        )           
   }


    getPartiesByUser = () => {
        ShoppingAPI.getAPI().getAcceptedInvitationsBySourceUserId(1)
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
                    <ExpansionPanel expanded = {this.state.expanded === party.getID()} onChange = {() => this.getListsByParty(party.getID())} key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {party.getName()}
                        </ExpansionPanelSummary>
                            {listPartyDic.map((party,list) => 
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <Button component={RouterLink} to={`/groupshoppinglist`} >{list.getName()} </Button>
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