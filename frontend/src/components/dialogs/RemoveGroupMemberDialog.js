import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ThemeProvider, Input} from "@material-ui/core"
import Theme from "../../Theme"
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

 class RemoveGroupMemberDialog extends Component {

    constructor(props){
        super(props);

         this.state = {
            open: false,
         }

    }
    /** Funktion für Mitglied entfernen fehlt noch, wie Umsetzen ? */
    handleClickOpen = () => {
        this.setState ({open: true});
    };

    handleClose = () => {
        this.setState ({open: false});
    };

    render() {
        return (
            <div>
                <ThemeProvider theme = {Theme}>

                    <Button onClick = {this.handleClickOpen}>
                        <IndeterminateCheckBoxIcon  fontSize='large' color='primary'/>
                        
                    </Button>

                    <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Mitglied entfernen</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Möchten Sie das Gruppenmitglied wirklich entfernen?
                </DialogContentText>
  
              </DialogContent>

              <DialogActions>
                <Button>
                  Ja
                </Button>
                <Button>
                  Nein
                </Button>
              </DialogActions>
            </Dialog>

                    
                </ThemeProvider>
            </div>
        )
    }
}

export default RemoveGroupMemberDialog
