import React, { Component } from 'react'
import {Button, Grid} from '@material-ui/core'
import {Link as RouterLink} from 'react-router-dom'
import ShoppingAPI from '../../api/ShoppingAPI'

class UserParties extends Component{

    constructor(props){
        super(props)

        this.state = {
            parties : [],
        }
    }

    componentDidMount() {
        this.getPartiesByUser()
    }

    getPartiesByUser = () => {
        // Hier muss bei getPartiesByUser noch this.props.user.getID() bei dem Übergabewert ergänzt werden
        ShoppingAPI.getAPI().getPartiesByUser().then(PartyBOs =>
                this.setState({
                    parties: PartyBOs
                }))
    }
    
    render(){
        const userParties = this.state.parties
        return(
            <div>
                {userParties.map((party) =>
                    <Grid key={party.getID()}>
                        <Button 
                        font-size="40px"
                        variant='outlined'
                        color='primary'
                        component={RouterLink} to={`/myparty/${party.getID()}`}
                        >
                            {party.getName()}
                        </Button>
                 </Grid> 
                )} 
            </div>  
        )
    }

}
export default UserParties