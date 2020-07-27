import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, TextField } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import ExitGroupDialog from '../dialogs/ExitGroupDialog';
import RemoveGroupMemberDialog from '../dialogs/RemoveGroupMemberDialog';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SaveIcon from '@material-ui/icons/Save';
import InvitationBO from '../../api/InvitationBO';
import firebase from 'firebase/app';
import 'firebase/auth';


/**
 * @author Michael, René, Jens und Anny
 */
class ManageGroup extends Component {
    constructor(props) {
        super(props);
        //** Prop Übergabe von User Parties */
        this.state = {
            partyId: props.match.params.partyid,
            party: null,
            users: [],
            invitations: [],
            userBO: null,
            mail: "",
            user: null,
            newName: "",
        }
    }
    //** User anhand der Google Id aus dem Backend holen */
    getCurrentUserByGoogleId = () => {
        ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
            .then(UserBO => this.setState({
                userBO: UserBO
            }))
    }
    //** Wird auf dem Client nach dem Rendering einmal aufgerufen */
    componentDidMount() {
        this.getParty()
        this.getCurrentUserByGoogleId()
    }
    //** Funktion zum Fetchen der Party */
    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then(function (party) {
                this.setState({ party: party });
                this.getAllUsersInParty(party.getID())
            }.bind(this))
    }
    //** Das updaten eines PartyBOs  */
    handlePartyChange = () => {
        var newParty = this.state.party
        newParty.setName(this.state.newName)
        ShoppingAPI.getAPI().updateParty(newParty)
    }
    //** Party umbenennen */
    renameParty = (event) => {
        this.setState({ newName: event.target.value })
    }
    //** Alle User in eine Party */
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
    //** Funktion zum Löschen eines Users */
    handleUserDelete = () => {

        this.setState({ users: [] })
        this.setState({ invitations: [] })
        this.getAllUsersInParty(this.state.partyId)


        // Hier noch ein router auf die Overview page

    }
    //** Jemanden zur Gruppe hinzufügen */
    addMemberToGroup = () => {

        ShoppingAPI.getAPI().getUserByEmail(this.state.mail)
            .then(function (user) {
                const new_invitation = new InvitationBO()
                new_invitation.setTargetUserId(user.getID())
                new_invitation.setSourceUserId(this.state.user)
                new_invitation.setPartyiId(this.state.partyId)

                ShoppingAPI.getAPI().addInvitation(new_invitation).then(this.setState({ mail: "" }))
            }.bind(this))
    }

    render() {

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
                        <SaveIcon variant="contained" color="primary" fontSize="large" />
                    </Button>
                </Grid>

                <br margin-top='20px' />

                Gruppenmitglieder
                <Divider />
                <br margin-top='20px' />

                {users ?
                    users.map((user, index) =>
                        <Grid>
                            {user.getName()}
                            <RemoveGroupMemberDialog invitation={this.state.invitations.filter(invitation => invitation.getTargetUserId() === user.getID())} handleInvitationDelete={this.handleUserDelete} index={index} />
                        </Grid>
                    )
                    : null}

                <br margin-top='20px' />

                Neues Gruppenmitglied hinzufügen
                <Divider />

                <TextField
                    onChange={(event) => this.setState({ mail: event.target.value })}
                    required
                    margin="dense"
                    id="userEmail"
                    label="E-Mail"
                    type="string"
                    value={this.state.mail} />
                <br margin-top='20px' />
                <Button onClick={this.addMemberToGroup}>
                    <GroupAddIcon color="primary" fontSize="large" />
                </Button>

                <br margin-top='20px' />
                {userBO && invitations.length > 0 ?
                    <ExitGroupDialog invitation={this.state.invitations.filter(invitation => invitation.getTargetUserId() === this.state.userBO.getID())} />
                    : null}
                <br margin-top='20px' />



            </Typography>
        )
    }
}

export default ManageGroup;