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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
/**
 * @author  Dominic, Jens, anny
 */
class UpdateListDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {

            open: false,
            listBO: this.props.list,
            newName: null,
            list: "",
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleListNameChange = (event) => {
        this.setState({ newName: event.target.value })
    };

    updateList = () => {
        var list = this.state.listBO
        list.setName(this.state.newName)
        ShoppingAPI.getAPI().updateList(list)
            .then(this.handleClose(), this.props.replaceNewList(list))

    }

    render() {
        const list = this.state.listBO


        return (
            <div>
                <ThemeProvider theme={Theme}>
                    <IconButton onClick={() => this.handleClickOpen()}>
                        <EditIcon />
                    </IconButton>

                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">

                        <DialogTitle id="form-dialog-title"> Liste bearbeiten</DialogTitle>
                        <DialogContent>
                            {list ?
                                <TextField
                                    onChange={this.handleListNameChange}
                                    defaultValue={list.getName()}
                                    margin="dense"
                                    id="outlined-read-only-input"
                                    label="Listenname"
                                    type="string"
                                    fullWidth
                                />
                                : null}

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => this.updateList()}>
                                Speichern
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

export default UpdateListDialog;






