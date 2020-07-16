import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, TextField } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import CreateGroupDialog from '../dialogs/CreateGroupDialog';
import ExitGroupDialog from '../dialogs/ExitGroupDialog';
import RemoveGroupMemberDialog from '../dialogs/RemoveGroupMemberDialog';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SaveIcon from '@material-ui/icons/Save';

//Hier muss noch das update rein sobald User gelöscht wird muss neu gerendert werden.
/**
 * @author Michael, René, Jens und Anny
 */
class ManageGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partyId: props.match.params.partyid,
            party: null,
            users: [],
            invitations: [],
            userBO: null,
            mail : "",
            emailList: [],
            user: 1, //Hier muss noch der eingeloggte User übergeben werden!
            newName: "",
        }
    }

    getCurrentUserById = () => {
        ShoppingAPI.getAPI().getUserById(this.state.user)
        .then(UserBO => this.setState({
                userBO: UserBO
            }))
    }

    componentDidMount() {
        this.getParty()
        this.getCurrentUserById()
    }

    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then(function (party) {
                this.setState({ party: party });
                this.getAllUsersInParty(party.getID())
            }.bind(this))
    }

    handleEmailChange = () => {
        this.setState({emailList : [...this.state.emailList, this.state.mail],
                       mail: ""})
    }

    handlePartyChange = () => {
        var newParty = this.state.party
        newParty.setName(this.state.newName)
        ShoppingAPI.getAPI().updateParty(newParty)
        .then (party => this.setState({party : party}))
    }

    renameParty = (event) =>{
        this.setState({newName : event.target.value})
    }
    
    getAllUsersInParty = (id) => {
        ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(id)
            .then(function (invitations) {
                this.setState({ invitations: invitations })
                invitations.map((invitation) => (
                    ShoppingAPI.getAPI().getUserById(invitation.getTargetUserId())
                        .then(user => this.setState({
                            users: [...this.state.users, user]
                        })
                        ))
                )
            }.bind(this))
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

        this.setState({ users: [] })
        this.setState({ invitations: [] })
        this.getAllUsersInParty(2)
        console.log("users nach update:", this.state.users)
        console.log("invitations nach update", this.state.invitations)

    }

    render() {

        //console.log("invitations:", this.state.invitations)
        //console.log("users:", this.state.users)
        const currentParty = this.state.party
        const users = this.state.users
        const userBO = this.state.userBO
        const invitations = this.state.invitations

        return (
            <Typography variant='h6' component='h1' align='center'>

                <br margin-top='20px' />

                Gruppennamen ändern 
                <Divider />

                <br margin-top='20px' />
               
                <Grid>
                <TextField onChange={event => this.renameParty(event)} id="outlined-basic" placeholder={currentParty ? currentParty.getName() : null} variant="outlined" />
                <Button onClick={this.handlePartyChange}>
                <SaveIcon variant ="contained" color = "primary" fontSize ="large"/> 
                </Button>
                </Grid>
              
                <br margin-top='20px' />

                Gruppenmitglieder
                <Divider/>
                <br margin-top='20px' />
                
                {users ?
                    users.map((user, index) =>
                        <Grid>
                            {user.getName()}
                            {user.getID()}
                            <RemoveGroupMemberDialog invitation={this.state.invitations.filter(invitation => invitation.getTargetUserId() === user.getID())} handleInvitationDelete={this.handleUserDelete} index={index} />
                        </Grid>
                    )
                    : null}

                <br margin-top='20px' />

                Neues Gruppenmitglied hinzufügen
                <Divider />

                <TextField
                  onChange = {(event) => this.setState({mail : event.target.value}) /*Textfield darf nicht leer sein muss geleert werden sobald email hinzugefügt wurde*/ }
                  required
                  margin="dense"
                  id="userEmail"
                  label="E-Mail"
                  type="string"
                  value = {this.state.mail}
                  fullWidth/>
                <Button onClick={() => this.state.mail == "" ? console.log("feld leer") : this.handleEmailChange()}>
                  <GroupAddIcon color = "primary" fontSize = "large"/>
                </Button>

                <br margin-top='20px' />
                {userBO && invitations.length > 0?
                    <ExitGroupDialog invitation={this.state.invitations.filter(invitation => invitation.getTargetUserId() === this.state.userBO.getID())}/>
                :null}
                <br margin-top='20px' />

               

            </Typography>
        )
    }
}

export default ManageGroup;