import React, {Component} from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import {Divider} from '@material-ui/core'
import {TextField, Collapse, IconButton} from '@material-ui/core'
import UserParties from '../subcomponents/UserParties'
import UserBO from '../../api/UserBO';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Header from '../layout/Header';
import PropTypes from 'prop-types'

class ManageUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            userBO : null,
            user: props.match.params.userid,
            newName : null,
            alertOpen : false

        }
    }

    componentDidMount() {
        this.getUserById()
    }

    getUserById = () => {
        // Hier muss bei getPartiesByUser noch this.props.user.getID() bei dem Übergabewert ergänzt werden
        ShoppingAPI.getAPI().getUserById(this.state.user).then(UserBO =>
                this.setState({
                    userBO: UserBO
                }))
    }

    updateUser = () => {
       var user = this.state.userBO
       user.setName(this.state.newName)
      ShoppingAPI.getAPI().updateUser(user)
        .then(function(){
         this.setAlertOpen(true);
      ShoppingAPI.getAPI().getUserById(user.getID())
        .then(UserBO =>
            this.setState({
                userBO: UserBO
            }),
           // this.props.onUserUpdated(),
            )
        }.bind(this))
        
        
    }

    handleUserNameChange = (event) => {
        this.setState({newName: event.target.value})
    }

    setAlertOpen = (opened) => {
        this.setState({alertOpen: opened})



    }

    render() {
        const person = this.state.userBO
        //console.log(this.state.user)
        //console.log(this.refs.newname.input.value)

        return ( 
        <Typography variant='h6' component='h1' align='center'> 
            <Grid>
                <br margin-top ='20px'/> 

                Mein Konto
                <Divider/>

                <br margin-top ='20px'/>
                
                { person ?
                    <TextField           
                        id="outlined-read-only-input"           
                        label="Name: " 
                        onChange={this.handleUserNameChange}         
                        defaultValue= {person.getName()}           
                        InputProps={{             
                        readOnly: false,           
                        }}           
                        variant="outlined"         
                    />
                    
                    :null}

                     <Button onClick={() => this.updateUser()}>Speichern</Button>
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
                        Close me!
                        </Alert>
                    </Collapse>
                
                <br/>   
                <br margin-top ='20px'/> 
                
                Gruppen
                <Divider/>

                <br margin-top ='20px'/> 
                <Grid>
                <UserParties/>
                </Grid>
            </Grid>
        </Typography>
            
        )
        
    }

}
export default ManageUser;

//gruppen fehlen noch