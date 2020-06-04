import React, { Component } from 'react';
import { Typography, Grid, Card, CardMedia} from '@material-ui/core';
import CreateGroupDialog from '../dialogs/CreateGroupDialog'
import UserParties from './UserParties'

class Overview extends Component {

    render() {
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
            <Grid>
                <Card variant='h3' style={{width : "50%", margin : "auto"}}>
                    <CardMedia src = 'https://cdn.discordapp.com/attachments/698171365827674117/716249049426296842/Best.png' component='img' title='BE!ST'/>
                </Card>
                <CreateGroupDialog />
                <UserParties />
            </Grid>

        </Typography>
            
        )
        
    }
}
export default Overview;