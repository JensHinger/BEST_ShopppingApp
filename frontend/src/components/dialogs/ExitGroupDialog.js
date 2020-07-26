import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ShoppingAPI from '../../api/ShoppingAPI'

class ExitGroupDialog extends Component {
  /**
   * @author  Dominic, Anny 
   */
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      invitation: this.props.invitation
    }
  }
  /** Funktion zum Öffnen des Dialogs */
  handleClickOpen = () => {
    this.setState({ open: true });
  }
  /** Schließen des Dialogs */
  handleClose = () => {
    this.setState({ open: false });
  }
  /** Löschen eines InvitationBOs */
  handleInvitationDelete = () => {
    ShoppingAPI.getAPI().deleteInvitation(this.state.invitation[0].getID())
      .then(this.handleClose())
  }
  render() {

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Gruppe verlassen
      </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"TÜÜT TÜÜT"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Möchten Sie wirklich die Gruppe Verlassen ?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Nein
          </Button>
            <Button component={RouterLink} to={`/overview`} onClick={this.handleInvitationDelete} color="primary" autoFocus >
              Ja
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )


  }


}

export default ExitGroupDialog;