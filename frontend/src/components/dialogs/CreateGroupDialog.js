import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ThemeProvider} from "@material-ui/core"
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Theme from "../../Theme"

class CreateGroupDialog extends Component{

  constructor(props){
    super(props);

      this.state = {
        open: false,
        partyName: "",
        emailList: [],
        mail : ""
      }
  }

  

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    this.setState({emailList: []})
  };

  handleNameChange(name){
    this.setState({partyName: name})
  };

  handleEmailChange(){
    this.setState({emailList : [...this.state.emailList, this.state.mail]})
  };

  handleEmailDelete(index){
    let array = this.state.emailList

    array.splice(index, 1)
    this.setState({emailList : array})
  }

  render(){
    let emailList = this.state.emailList;
    return (
      <div>
        <ThemeProvider theme = {Theme}>

            <Button onClick={() => this.handleClickOpen()}>
              <GroupAddIcon fontSize='large' color='primary'/>
            </Button>

            <Dialog open={this.state.open} onClose={this.handleClose}  aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Gruppe erstellen</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Geben sie einen Gruppennamen ein !!
                </DialogContentText>
                <TextField
                  onChange = {(event) => this.handleNameChange(event.target.value)}
                  margin="dense"
                  id="partyName"
                  label="Gruppenname"
                  type="string"
                  fullWidth
                />

                <DialogContentText>
                <br margin-top='20px'/>
                  Fügen Sie Gruppenmitglieder hinzu!
                </DialogContentText>
                  
                <TextField
                  onChange = {(event) => this.setState({mail : event.target.value})}
                  margin="dense"
                  id="userEmail"
                  label="E-Mail"
                  type="string"
                  fullWidth/>
                <Button onClick={() => this.handleEmailChange()}>
                  <GroupAddIcon/>
                </Button>
                
                <ul>
                  {emailList.map((mail, index) => 
                    <p>
                      {mail}
                      <Button onClick = {() => this.handleEmailDelete(index)}>
                        <DeleteIcon/>
                      </Button>
                    </p>
                  )}
                </ul>

              </DialogContent>

              <DialogActions>
                <Button>
                  Gruppe erstellen
                </Button>
                <Button onClick={() => this.handleClose()}>
                  Abbrechen
                </Button>
              </DialogActions>
            </Dialog>
        </ThemeProvider>
      </div>
    );
  } 
} 

export default CreateGroupDialog;
