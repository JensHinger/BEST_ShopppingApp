import React, { Component } from 'react';
import { Typography, makeStyles, Drawer, Button, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';



class Overview extends Component {
    render() {
  
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
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