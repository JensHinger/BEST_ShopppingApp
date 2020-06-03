import React, { Component } from 'react';
import { Typography, makeStyles, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';



class Overview extends Component {
    render() {
  
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
         <div>
        <Typography variant='h3' component='h1' align='center'>
          <img src = 'https://cdn.discordapp.com/attachments/698171365827674117/716249049426296842/Best.png' width ='600' ></img>
        </Typography>
        </div>
            Übersicht
            <div>
            <Button> Meine Artikel </Button> <br></br>
            <Button> Familie </Button> <br></br>
            <Button> WG </Button>
            </div>
         
        </Typography>
            
        )
        
    }
}
export default Overview;