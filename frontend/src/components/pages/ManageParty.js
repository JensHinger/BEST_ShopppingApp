import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, TextField} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import CreateGroupDialog from '../dialogs/CreateGroupDialog';
import ExitGroupDialog from '../dialogs/ExitGroupDialog';

class ManageGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            party : null,
            users : null
        }
    }

    componentDidMount(){
        this.getParty()
        this.getAllUsers()
    }

    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(2)
        .then(party => this.setState({party : party}))
    }

    getAllUsers = () => {
        ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(2)
        .then(invitations => invitations.map = (invitation) => (
            ShoppingAPI.getAPI().getUserById(invitation.getID())
            .then(user => this.setState(state => state.users.push(user)))
        ))

    }

    render() {

        const currentParty = this.state.party

        return(
        <Typography variant='h6' component='h1' align='center'>
            <br margin-top = '20px'/>
            Gruppe verwalten
            <Divider/>
            <CreateGroupDialog/>
            <br margin-top = '20px'/>
            Gruppennamen ändern
            <Divider/>
            <TextField id ="outlined-basic" label = "Name ändern" variant = "outlined"/>
            <br margin-top = '20px'/>
            Gruppenmitglieder
            <Divider/>
            <br margin-top = '20px'/>
            <ExitGroupDialog/>
        </Typography>
        )
    }
}

export default ManageGroup;