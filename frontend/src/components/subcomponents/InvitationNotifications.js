import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI'
import NotificationsIcon from '@material-ui/icons/Notifications';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import { Menu, Grid, MenuItem } from '@material-ui/core';

class InvitationNotifications extends Component{

    constructor(props){
        super(props)

        this.state = {
            invitations : [],
            currentUser : this.props.user,
            AnchorEl: null,
            party: []
        }
    }

    componentDidMount(){
        this.getOpenInvitations(this.state.currentUser.getID())
    }

    getOpenInvitations = (userId) => {
        ShoppingAPI.getAPI().getPendInvitationsByTargetUserId(userId)
        .then(pendInvitations => this.setState({invitations : pendInvitations}))
    }

    getPartyByInvitation = (partyId) => {
        ShoppingAPI.getAPI().getPartyById(partyId)
        .then(party => this.setState({party : party}))
    }

    handleAccepted = (invite, index) => {
        var updatedInvitations = this.state.invitations
        invite.setIsAccepted(1)

        ShoppingAPI.getAPI().updateInvitation(invite)
        .then(updatedInvitations.splice(index, 1), this.setState({invitations : updatedInvitations}))
    }

    handleDecline = (invite, index) => {
        var updatedInvitations = this.state.invitations

        ShoppingAPI.getAPI().deleteInvitation(invite.getID())
        .then(updatedInvitations.splice(index, 1), this.setState({invitations : updatedInvitations}))
    }

    handleOpen = (event) => {
        this.setState({AnchorEl : event.currentTarget})
    }

    handleClose = () => {
        this.setState({AnchorEl : null})
    }

    render(){

        const party = this.state.party
        const invitations = this.state.invitations
        const isMenuOpen = Boolean(this.state.AnchorEl)

        return(
            <Grid>
                <IconButton aria-controls="invitation-list" aria-haspopup="true" onClick = {(event) => this.handleOpen(event)}>
                    <NotificationsIcon/>
                </IconButton>

                <Menu
                anchorEl={this.state.AnchorEl}
                keepMounted
                id="invitation-list"
                open={isMenuOpen}
                onClose={() => this.handleClose()}>

                    {invitations?
                        invitations.map((invite, index) =>
                        <MenuItem key={invite.getID()}>
                            {invite.getID()}
                                <Grid>
                                    <IconButton onClick = {() => this.handleAccepted(invite, index)}>
                                        <CheckIcon/>
                                    </IconButton>
                                    <IconButton onClick = {() => this.handleDecline(invite, index)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Grid>
                            
                        </MenuItem>
                        )

                    :null}

                </Menu>
            </Grid>
        )
    }
}

export default InvitationNotifications