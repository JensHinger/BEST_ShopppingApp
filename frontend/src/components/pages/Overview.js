import React, { Component } from 'react';
import { Typography, Button, Grid, Card, CardMedia, Dialog } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom'
import ShoppingAPI from '../../api/ShoppingAPI'
import CreateGroupDialog from '../dialogs/CreateGroupDialog'

class Overview extends Component {

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

    render() {
        const userParties = this.state.parties
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
            <Grid>
                <Card variant='h3' style={{width : "50%", margin : "auto"}}>
                    <CardMedia src = 'https://cdn.discordapp.com/attachments/698171365827674117/716249049426296842/Best.png' component='img' title='BE!ST'/>
                </Card>
                <CreateGroupDialog />

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

            </Grid>

        </Typography>
            
        )
        
    }
}
export default Overview;