import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from "@material-ui/core"
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import Theme from "../../Theme"
import ShoppingAPI from "../../api/ShoppingAPI"
import PartyBO from "../../api/PartyBO"
import InvitationBO from "../../api/InvitationBO"
import firebase from 'firebase/app';
import 'firebase/auth';
import ErrorDialog from '../dialogs/ErrorDialog'

/**
 * @author  Jens
 */

class CreateGroupDialog extends Component {

  constructor(props) {
    super(props);


      this.state = {
        open: false,
        partyName: "",
        emailList: [],
        mail : "",
        currentUser : null, //Hier fehlt noch die props übergabe des eingeloggten Users sowie unten muss noch ein getID() hinzugefügt werden
        errorEmailDialog: false,
        errorNameDialog: false,
      }

  }

  componentDidMount() {
    this.getCurrentUser()
  }

  /** Eingeloggter User in den State holen */
  getCurrentUser = () => {
    ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
      .then(UserBO =>
        this.setState({
          currentUser: UserBO
        }))
  }

  /** Das Erstellen einer Party  */
  handleGroupCreation = () => {
    const new_party = new PartyBO()
    new_party.setName(this.state.partyName)
    ShoppingAPI.getAPI().addParty(new_party)
    .then(party => this.handleInvitationCreation(party.getID()))  

  }
  /** Das Erstellen einer Invitation */
  handleInvitationCreation = (partyId) => {
    const mailList = this.state.emailList
    const new_invitation = new InvitationBO()

    new_invitation.setSourceUserId(this.state.currentUser.getID())
    new_invitation.setTargetUserId(this.state.currentUser.getID())
    new_invitation.setPartyiId(partyId)
    new_invitation.setIsAccepted(1)

    ShoppingAPI.getAPI().addInvitation(new_invitation).then(() =>
    {return (
    new_invitation.setSourceUserId(1),
    new_invitation.setTargetUserId(1),
    new_invitation.setPartyiId(partyId),
    new_invitation.setIsAccepted(1),
    ShoppingAPI.getAPI().addInvitation(new_invitation))})
    
    //Falls die MailListe leer ist können User nicht hinzugefügt werden der Originale User muss aber immer hinzugefügt werden
    //User ist nicht in der Database
    // -> this.emailList[0] == "" ? dann...
    //2 Mal gleicher User einladen ist doof ;-;


    if(mailList.length > 0){
      const async = mailList.map((mail) =>
      ShoppingAPI.getAPI().getUserByEmail(mail)
      .then(function(user) {
        new_invitation.setTargetUserId(user.getID());
        new_invitation.setSourceUserId(this.state.currentUser.getID())
        new_invitation.setPartyiId(partyId)
        ShoppingAPI.getAPI().addInvitation(new_invitation)
        .then(this.handleClose())

      }.bind(this))) 
    }
    else{
      this.handleClose()
    }

  }
  /** Funktion zum Öffnen des Dialogs */
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  /** Schließen des Dialogs und reset des States */
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ emailList: [] })
  };
  /** update */
  handleNameChange = (name) => {
    this.setState({ partyName: name })
  };
  /** update */
  handleEmailChange = () => {
    this.setState({
      emailList: [...this.state.emailList, this.state.mail],
      mail: ""
    })
  };
  /** delete */
  handleEmailDelete(index) {
    let array = this.state.emailList

    array.splice(index, 1)
    this.setState({ emailList: array })
  }

  /** Setz errorEmailDialog auf false */
  handleEmailErrorClose = () =>{
    this.setState({errorEmailDialog : false})
  }

  /** Setz errorNameDialog auf false */
  handleNameErrorClose = () =>{
    this.setState({errorNameDialog : false})
  }

  render(){
    let emailList = this.state.emailList;
    return (
      <div>
        {this.state.errorEmailDialog?
          <ErrorDialog errorMessage="Emailfeld darf nicht leer sein!" handleErrorClose={this.handleEmailErrorClose}/>
        : null}
        {this.state.errorNameDialog? 
          <ErrorDialog errorMessage="Partyname darf nicht leer sein!" handleErrorClose={this.handleNameErrorClose}/>
        :null}
        <ThemeProvider theme = {Theme}>


          <Button onClick={() => this.handleClickOpen()}>
            <GroupAddIcon fontSize='large' color='primary' />
          </Button>

          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Gruppe erstellen</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Geben sie einen Gruppennamen ein !!
                </DialogContentText>
              <TextField
                onChange={(event) => this.handleNameChange(event.target.value) /*Name der Gruppe darf nicht leer sein*/}
                margin="dense"
                id="partyName"
                label="Gruppenname"
                type="string"
                fullWidth
              />

              <DialogContentText>
                <br margin-top='20px' />
                  Fügen Sie Gruppenmitglieder hinzu!
                </DialogContentText>

                  
                <TextField
                  onChange = {(event) => this.setState({mail : event.target.value}) /*Textfield darf nicht leer sein muss geleert werden sobald email hinzugefügt wurde*/ }
                  required
                  margin="dense"
                  id="userEmail"
                  label="E-Mail"
                  type="string"
                  value = {this.state.mail}
                  fullWidth/>
                <Button onClick={() => this.state.mail === "" ? this.setState({errorEmailDialog: true}): this.handleEmailChange()}>
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
                <Button onClick={() => this.state.partyName === "" ? this.setState({errorNameDialog: true}) : this.handleGroupCreation()}>
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
