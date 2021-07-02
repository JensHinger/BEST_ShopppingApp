import React, { Component } from 'react'
import ShoppingAPI from '../../api/ShoppingAPI'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Theme from "../../Theme"
import { ThemeProvider } from "@material-ui/core"
import Button from '@material-ui/core/Button'
import ListBO from '../../api/ListBO';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from '@material-ui/core/IconButton';
import ErrorDialog from './ErrorDialog'

/**
 * @author  Dominic, Anny und Jens
 */

class AddListDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {

            open: false,
            listName: "",
            errorDialog: false

        }

    }
    /**
     * Auszuführende Anweisung beim Öffnen des Dialogs
     * Prüft ob es geöffnet ist
     */
    handleClickOpen = () => {
        this.setState({ open: true })
    };
    /**
     * Auszuführende Anweisung beim Schließen des Dialogs
     * Prüft ob es geschlossen ist 
     */
    handleClose = () => {
        this.setState({ open: false });
    };
    /**
     * Setzen des Namens
     */
    handleAddList(list) {
        this.setState({ listName: list })
    };
    /**  
     * Auszuführende Anweisung beim hinzufügen einer Liste
     */
    addList = () => {
        const list = new ListBO()
        list.setName(this.state.listName)
        list.setPartylId(this.props.partyId)
        ShoppingAPI.getAPI().addList(list)
            .then(setTimeout(() => { this.props.getListsByParty(this.props.partyId) }, 500))
        this.handleClose()
    }

      /** Setzt den errorDialog state auf false */
      handleErrorClose = () => {
        this.setState({errorDialog : false})
    }

    render() {
        return (
            <div>
                {this.state.errorDialog? 
                    <ErrorDialog errorMessage={"Der Listenname darf nicht leer sein!"} handleErrorClose={this.handleErrorClose}/>
                :null}
                <ThemeProvider theme={Theme}>
                    <IconButton onClick={() => this.handleClickOpen()}>
                        <PlaylistAddIcon fontSize='large' />
                    </IconButton>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title"> Liste hinzufügen</DialogTitle>
                        <DialogContent>

                            <TextField
                                onChange={(event) => this.handleAddList(event.target.value)}
                                margin="dense"
                                id="listName"
                                label="Geben Sie einen namen ein"
                                type="string"
                                fullWidth
                            />

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => this.state.listName === "" ? this.setState({errorDialog : true}) : this.addList()}>
                                Liste hinzufügen
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

export default AddListDialog;