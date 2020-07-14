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
            invitations : [],
            userBO : null,
            user: props.match.params.userid
        }
    }

    getUserById = () => {
        ShoppingAPI.getAPI().getUserById(this.state.user).then(UserBO =>
                this.setState({
                    userBO: UserBO
                }))
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
        //let array = this.state.users
        //let inv_array = this.state.invitations
        //array.splice(index, 1)
        //console.log("ausgewählter User:", this.state.users[index].getID())
        //let inv_del = this.state.invitations.filter((invitation) => invitation.getTargetUserId() === this.state.users[index].getID())
        //console.log("zu löschender invite:", inv_del[0])
        //let inv_pos = this.state.invitations.findIndex(inv_del)
        //inv_array.splice(inv_pos - 1 ,1)
        //console.log("index der invitation:", inv_pos)
        //this.setState({users : array})
        //console.log("neue invites:", inv_array)
        //this.setState({invitations: inv_array})
        //console.log("invitations nach dem löschen:", this.state.invitations)
        //console.log("zu löschender User", this.state.users[index])
        //console.log("users nach gelöschtem User:", this.state.users)
        
        this.setState({users: []})
        this.setState({invitations: []})
        this.getAllUsersInParty(2)
        console.log("users nach update:", this.state.users)
        console.log("invitations nach update", this.state.invitations)


    }

    render() {

        //console.log("invitations:", this.state.invitations)
        //console.log("users:", this.state.users)
        const currentParty = this.state.party
        const users = this.state.users
        return(
        <Typography variant='h6' component='h1' align='center'>
            
            <br margin-top = '20px'/>
                Gruppennamen ändern
            <Divider/>
            <TextField  id ="outlined-basic" placeholder = {currentParty ? currentParty.getName() : null} variant = "outlined"/>

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
                <br margin-top = '20px'/>
                    {/*<RemoveGroupMemberDialog invitation = {this.state.invitations.filter(invitation => invitation.getTargetUserId() === this.state.user.getID())} /> */}
                    
                <Divider/>
                <br margin-top = '20px'/>
                
        </Typography>
        )
    }
}

export default ManageGroup;