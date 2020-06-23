import React, { Component } from 'react';
import { Typography, Grid, Card, CardMedia, Button} from '@material-ui/core';
import CreateGroupDialog from '../dialogs/CreateGroupDialog'
import UserParties from '../subcomponents/UserParties'
import ShoppingAPI from '../../api/ShoppingAPI' 
import RetailerBO from '../../api/RetailerBO'

class Overview extends Component {

    constructor(props){
        super(props)

        this.state = {
            obj : null
        }
    }

    getObj(id){
        var p = new RetailerBO()
        p.setID(9)
        p.setName("Ich bin toll! :D")

        ShoppingAPI.getAPI().updateRetailer(p).then(obj => console.log(obj))    
    }

    render() {
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
            <Grid>
                <Card variant='h3' style={{width : "50%", margin : "auto"}}>
                    <CardMedia src = 'https://cdn.discordapp.com/attachments/698171365827674117/716249049426296842/Best.png' component='img' title='BE!ST'/>
                </Card>
                <CreateGroupDialog />
                <UserParties />

                <Button  onClick = {() => this.getObj(10)}>HIER KLICKEN!!!</Button>

            </Grid>

        </Typography>
            
        )
        
    }
}
export default Overview;