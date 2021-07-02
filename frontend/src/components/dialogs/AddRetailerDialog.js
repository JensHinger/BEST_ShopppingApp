import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Theme from "../../Theme"
import { ThemeProvider } from "@material-ui/core"
import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import ErrorDialog from '../../components/dialogs/ErrorDialog'
/**
 * @author  Dominic, Anny und Jens
 */

class AddRetailerDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            retailerName: "",
            errorDialog: false,

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
    /** Setzen des Namens im State */
    handleAddRetailer(retailer) {
        this.setState({ retailerName: retailer })
    };
    /**  
    * Auszuführende Anweisung beim hinzufügen eines Retailers
    */
    addRetailer = () => {
        const retailer = new RetailerBO()
        retailer.setName(this.state.retailerName)
        ShoppingAPI.getAPI().addRetailer(retailer)
            .then(setTimeout(() => { this.props.handleNewRetailer() }, 500))
        this.handleClose()
    }

    handleErrorClose = () => {
        this.setState({errorDialog: false})
    }

    render() {
        return (
            <div>

                { this.state.errorDialog ? 
                    <ErrorDialog errorMessage={"Gib einen Namen für den Laden ein!"} handleErrorClose={this.handleErrorClose}/>:null}
                <ThemeProvider theme={Theme}>
                    <Button onClick={() => this.handleClickOpen()}>
                        <AddBoxIcon fontSize='large' color='primary' /> Laden hinzufügen
                    </Button>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title"> Laden hinzufügen</DialogTitle>
                        <DialogContent>

                            <TextField
                                onChange={(event) => this.handleAddRetailer(event.target.value)}
                                margin="dense"
                                id="retailerName"
                                label="Geben Sie einen Laden ein"
                                type="string"
                                fullWidth
                            />

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => this.state.retailerName != "" ?  this.addRetailer() : this.setState({errorDialog: true}) }>
                                Laden hinzufügen
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

export default AddRetailerDialog;
