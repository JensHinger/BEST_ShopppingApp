import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';

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