import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, TextField} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import CreateGroupDialog from '../dialogs/CreateGroupDialog';
import ExitGroupDialog from '../dialogs/ExitGroupDialog';
import RemoveGroupMemberDialog from '../dialogs/RemoveGroupMemberDialog'

//Hier muss noch das update rein sobald User gelöscht wird muss neu gerendert werden.

class ManageGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            party : null,
            users : [],
            invitations : []
        }
    }

    componentDidMount(){
        this.getParty()
    }

    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(2)
        .then(function(party) { 
            this.setState({party : party});
            this.getAllUsersInParty(party.getID())
        }.bind(this))
    }

    getAllUsersInParty = (id) => {
        ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(id)
        .then(function(invitations) {
            this.setState({invitations : invitations})   
            invitations.map((invitation) => (
            ShoppingAPI.getAPI().getUserById(invitation.getTargetUserId())
            .then(user => this.setState({
                users: [...this.state.users, user]
           })
           )) 
        )}.bind(this))
    }

    handleUserDelete = (index) => {
        let array = this.state.users

        array.splice(index, 1)
        this.setState({users : array})
    }

    render() {

        const currentParty = this.state.party
        const users = this.state.users
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
                {users? 
                    users.map((user, index) =>
                    <Grid>
                        {user.getName()}
                        {user.getID()}
                        <RemoveGroupMemberDialog invitation = {this.state.invitations.filter(invitation => invitation.getTargetUserId() === user.getID())} handleInvitationDelete = {this.handleUserDelete} index = {index}/>
                    </Grid>
                    )
                :null}
            <Divider/>
            <br margin-top = '20px'/>
            <ExitGroupDialog/>
        </Typography>
        )
    }
}

export default ManageGroup;