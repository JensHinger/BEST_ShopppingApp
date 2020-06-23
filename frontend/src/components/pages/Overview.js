import React, { Component } from 'react';
import { Typography, Grid, Card, CardMedia, Button} from '@material-ui/core';
import CreateGroupDialog from '../dialogs/CreateGroupDialog'
import UserParties from '../subcomponents/UserParties'
import ShoppingAPI from '../../api/ShoppingAPI' 
import StandardListentryBO from '../../api/StandardListEntryBO'
class Overview extends Component {

    constructor(props){
        super(props)

        this.state = {
            obj : null
        }
    }

    getObj(id){
        ShoppingAPI.getAPI().getStandardListEntryByUserId(id).then(obj => console.log(obj))    
    }

    manipulateObj(){
        var mybo = new StandardListentryBO()
        mybo.setID(8)
        mybo.setItemId(76)
        mybo.setName("MaMama")
        mybo.setRetailerId(6)
        mybo.setUserId(7)
        mybo.set_PartyId(3)
        console.log(mybo)
        ShoppingAPI.getAPI().updateStandardListEntry(mybo).then(obj => console.log(obj))    
    }

    deleteObj(id){
        ShoppingAPI.getAPI().deleteStandardListEntry(id).then(obj => console.log(obj))    

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

                <Button  onClick = {() => this.deleteObj(8)}>HIER KLICKEN!!!</Button>

            </Grid>

        </Typography>
            
        )
        
    }
}
export default Overview;