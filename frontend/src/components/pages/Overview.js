import React, { Component } from 'react';
import { Typography, Button, Grid, Card, CardMedia } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'


class Overview extends Component {

    constructor(props){
        super(props)

        this.state = {
            parties : []
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
            
                {userParties.map((party) =>
                    <Grid key={party.getID()}>
                        <Button 
                        font-size="40px"
                         variant='outlined'
                          color='primary'
                          component={RouterLink} to={`/mygroup/${party.getID()}`}
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