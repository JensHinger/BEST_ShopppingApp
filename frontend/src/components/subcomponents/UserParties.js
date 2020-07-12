import React, { Component } from 'react'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'
import ManageParty from "../pages/ManageUser"
//import ManageGroup from "./components/pages/ManageParty";
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect, } from 'react-router-dom';
import InvitationBO from '../../api/InvitationBO'
import PartyShoppingList from "../pages/PartyShoppingList"
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

class UserParties extends Component{

    constructor(props){
        super(props)

        this.state = {
            parties : [],
            lists : [],
            expanded: true 
        }
    }

    componentWillMount() {
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
        const lists = this.state.lists
        return(
            <div>
                {userParties.map((party) =>
                    <ExpansionPanel expanded = {this.state.expanded === party.getID()} onChange = {() => this.getListsByParty(party.getID())} key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            
                            {party.getName()} 
                            <IconButton component={RouterLink} to={`/manageparty/${party.getID()}`} > {party.getName()}
                                <EditIcon/>
                            </IconButton>
                            <IconButton >
                                <PlaylistAddIcon/>
                            </IconButton>
                        </ExpansionPanelSummary>
                            {lists.map((list) =>
                                <ExpansionPanelDetails>
                                        <Button  component={RouterLink} to={`/partyshoppinglist/${list.getID()}`} > {list.getName()} </Button>
                                </ExpansionPanelDetails> 
                            )}    
                    </ExpansionPanel> 
                )} 
            </div>  
        )
    }
}
export default UserParties