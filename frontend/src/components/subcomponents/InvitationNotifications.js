import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI'
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton'
import { Menu, Grid, MenuItem } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';

/**
 * @author Jens
 */

class InvitationNotifications extends Component {

    constructor(props) {
        super(props)

        this.state = {
            invitations: [],
            currentUser: this.props.user,
            AnchorEl: null,
            parties: [],
        }
    }
    //** Wird ausgeführt nachdem der Client gerendert wird */
    componentDidMount() {
        this.getOpenInvitations(this.state.currentUser.getID())
    }
    //** Holt sich alle offenen Einladungen eines Users */
    getOpenInvitations = (userId) => {
        ShoppingAPI.getAPI().getPendInvitationsByTargetUserId(userId)
            .then((pendInvitations) => {
                return (this.setState({ invitations: pendInvitations }),
                    this.state.invitations.map(invitation => this.getPartyByInvitation(invitation.getPartyiId())))
            })

    }

    //holt sich die Partyinvitation
    getPartyByInvitation = (partyId) => {
        this.setState({ parties: [] })
        ShoppingAPI.getAPI().getPartyById(partyId)
            .then(party => this.setState({ parties: [...this.state.parties, party] }))
    }

    //accept wird geprüft
    handleAccepted = (invite, index) => {
        const updatedInvitations = this.state.invitations
        const updatedParties = this.state.parties
        invite.setIsAccepted(1)
        updatedInvitations.splice(index, 1)
        updatedParties.splice(index, 1)

        ShoppingAPI.getAPI().updateInvitation(invite)
            .then(() => {
                return (this.setState({
                    invitations: updatedInvitations,
                    parties: updatedParties
                }
                ))
            })

    }

    //invite wird abgelehnt
    handleDecline = (invite, index) => {
        const updatedInvitations = this.state.invitations
        const updatedParties = this.state.parties
        updatedInvitations.splice(index, 1)
        updatedParties.splice(index, 1)

        ShoppingAPI.getAPI().deleteInvitation(invite.getID())
            .then(this.setState({
                invitations: updatedInvitations,
                parties: updatedParties
            }))
    }

    /**
    * Auszuführende Anweisung beim Öffnen des Dialogs
    * Prüft ob es geöffnet ist
    */
    handleOpen = (event) => {
        this.setState({ AnchorEl: event.currentTarget })
    }

    /**
    * Auszuführende Anweisung beim Schließen des Dialogs
    * Prüft ob es geschlossen ist 
    */
    handleClose = () => {

        this.setState({AnchorEl : null})
        window.location.reload(true)

    }

    //** Den Namen der Party holen */
    getPartyName = (invite) => {
        const myparty = this.state.parties.filter((party) => party.getID() === invite.getPartyiId())
        return (myparty[0].getName())

    }


    render() {

        const parties = this.state.parties
        const invitations = this.state.invitations
        const isMenuOpen = Boolean(this.state.AnchorEl)

        return (
            <Grid>
                <IconButton aria-controls="invitation-list" aria-haspopup="true" onClick={(event) => this.handleOpen(event)}>
                    <Badge badgeContent={parties.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>

                <Menu
                    anchorEl={this.state.AnchorEl}
                    keepMounted
                    id="invitation-list"
                    open={isMenuOpen}
                    onClose={() => this.handleClose()}>

                    {invitations && parties.length === invitations.length ?
                        parties.length === 0 ? "Du hast keine Einladungen" :
                            invitations.map((invite, index) =>
                                <MenuItem key={invite.getID()}>
                                    {this.getPartyName(invite)}
                                    <Grid>
                                        <IconButton onClick={() => this.handleAccepted(invite, index)}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton onClick={() => this.handleDecline(invite, index)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Grid>

                                </MenuItem>
                            )

                        : null}

                </Menu>
            </Grid>
        )
    }
}

export default InvitationNotifications