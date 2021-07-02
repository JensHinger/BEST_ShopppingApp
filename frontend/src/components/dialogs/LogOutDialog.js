import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Theme from "../../Theme"
import { ThemeProvider } from "@material-ui/core"
import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * @author  Dominic
 */

class LogOutDialog extends Component {

  constructor(props) {
    super(props)

    this.state = {

      open: false
    }


  }
  /** Funktion zum Öffnen des Dialogs */
  handleClickOpen = () => {
    this.setState({ open: true });
  }
  /** Funktion zum Schließen des Dialogs */
  handleClose = () => {
    this.setState({ open: false });
  }
  /** Funktion zum Ausloggen des Users */
  signOut = () => {
    firebase.auth().signOut()
  }

  render() {

    return (
      <div>
        <ThemeProvider theme={Theme}>
          <Button onClick={() => this.handleClickOpen()}>
            Log Out
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
                Möchten Sie Ausloggen?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Nein
          </Button>
              <Button onClick={this.signOut} color="primary" autoFocus>
                Ja
          </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      </div>
    )


  }


}

export default LogOutDialog;