import React, { Component } from 'react';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import {ThemeProvider} from "@material-ui/core"
import Theme from "../../Theme"
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'



class ExitGroupDialog extends Component{

    constructor(props){
        super(props)

        this.state = {

            open: false
        }


    }

    handleClickOpen = () => {
       this.setState({open: true});}

    handleClose = () => {
        this.setState({open: false});}

    render (){

        return (
    <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
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
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ja
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )


    }


}

export default ExitGroupDialog;