import React, {Component} from 'react';
import { Typography, Grid } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import {Divider} from '@material-ui/core'
import {TextField} from '@material-ui/core'
import UserParties from '../subcomponents/UserParties'

class ManageUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            user : []
        }
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        // Hier muss bei getPartiesByUser noch this.props.user.getID() bei dem Übergabewert ergänzt werden
        ShoppingAPI.getAPI().getUser().then(UserBO =>
                this.setState({
                    user: UserBO
                }))
    }

    render() {
        const person = this.state.user

        return ( 
        <Typography variant='h6' component='h1' align='center'> 
            <Grid>
                <br margin-top ='20px'/> 

                Mein Konto
                <Divider/>

                <br margin-top ='20px'/>
                
                {person.map((u)=> 
                    <TextField           
                        id="outlined-read-only-input"           
                        label="Name: "           
                        defaultValue= {u.getName()}           
                        InputProps={{             
                        readOnly: true,           
                        }}           
                        variant="outlined"         
                    />
                    )}
                
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