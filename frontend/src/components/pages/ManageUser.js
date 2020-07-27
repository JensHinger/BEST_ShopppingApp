import React, { Component } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import { Divider } from '@material-ui/core'
import { TextField, Collapse, IconButton } from '@material-ui/core'
import UserParties from '../subcomponents/UserParties'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import firebase from 'firebase/app';
import 'firebase/auth';
import DeleteUserAccountDialog from '../dialogs/DeleteUserAccountDialog'
/**
 * @author Jens, Jonathan, Dominic, Anny
 */

class ManageUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userBO: null,
            newName: null,
            alertOpen: false

        }
    }
    //** Einmaliges aufrufen nach dem Rendering */
    componentDidMount() {
        this.getUserByGoogleId()
    }
    //** Fetch den User aus dem Backend */
    getUserByGoogleId = () => {
        // Hier muss bei getPartiesByUser noch this.props.user.getID() bei dem Übergabewert ergänzt werden
        ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
            .then(UserBO =>
                this.setState({
                    userBO: UserBO
                }))
    }
    //** updaten des Users */
    updateUser = () => {
        var user = this.state.userBO
        user.setName(this.state.newName)
        ShoppingAPI.getAPI().updateUser(user)
            .then(function () {
                this.setAlertOpen(true);
                ShoppingAPI.getAPI().getUserById(user.getID())
                    .then(UserBO =>
                        this.setState({
                            userBO: UserBO
                        }),

                    )
            }.bind(this))


    }

    

    //** Funktion für die Namensändeurng eines Users */
    handleUserNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    setAlertOpen = (opened) => {
        this.setState({ alertOpen: opened })
    }

    render() {
        const person = this.state.userBO

        return (
            <Typography variant='h6' component='h1' align='center'>
                <Grid>
                    <br margin-top='20px' />

                Mein Konto
                <Divider />

                    <br margin-top='20px' />

                    {person ?
                        <TextField
                            id="outlined-read-only-input"
                            label="Name: "
                            onChange={this.handleUserNameChange}
                            defaultValue={person.getName()}
                            InputProps={{
                                readOnly: false,
                            }}
                            variant="outlined"
                        />

                        : null}

                    <Button onClick={() => this.state.newName != "" && this.state.newName != null ? this.updateUser() : console.log("da stimmt was ned")}>Speichern</Button>
                    <Collapse in={this.state.alertOpen}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Du heißt jetzt {this.state.newName}!
                        </Alert>
                    </Collapse>
                    <br />
                    <br margin-top='20px' />
                    {person ? 
                        
                        
                        <DeleteUserAccountDialog user={person}/> : null }
                    <br />
                    <br margin-top='20px' />

                
                    Gruppen
                <Divider />

                    <br margin-top='20px' />
                    <UserParties />

                </Grid>
            </Typography>

        )

    }

}
export default ManageUser;