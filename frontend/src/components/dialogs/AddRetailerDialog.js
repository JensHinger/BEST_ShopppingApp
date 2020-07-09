import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import AddBoxIcon from '@material-ui/icons/AddBox'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Theme from "../../Theme"
import { ThemeProvider } from "@material-ui/core"
import RetailerBO from '../../api/RetailerBO';
import ShoppingAPI from '../../api/ShoppingAPI';

class AddRetailerDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            retailerName: "",

        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAddRetailer(retailer) {
        this.setState({ retailerName: retailer })
    };

    addRetailer = () => {
        const retailer = new RetailerBO
        retailer.setName(this.state.retailerName)
        ShoppingAPI.getAPI().addRetailer(retailer)
            .then(setTimeout(() => { this.props.handleNewRetailer() }, 500))
        this.handleClose()
    }


    render() {
        return (
            <div>
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
                            <Button onClick={() => this.addRetailer()}>
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
