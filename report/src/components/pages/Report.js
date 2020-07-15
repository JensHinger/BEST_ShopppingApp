import React, { Component } from 'react';
import {ThemeProvider} from "@material-ui/core";
import Theme from "../../Theme";
import {Button, TextField, Typography, Divider, Grid, ListItemIcon} from '@material-ui/core';

class Report extends Component {
    constructor (props){
        super(props);
        this.state = {

        }
    }

render (){
    return(
        <ThemeProvider theme={Theme}>
        <Typography variant='h6' component='h1' align='center'>
        <Grid>
        <div>
        <br margin-top= '20px'/>
        Report
        <Divider/>
        <br margin-top ='20px'/>
        Meist gekaufte Produkte
        <Divider/>
        <br margin-top ='20px'/>
        Meist besuchter Laden
        <Divider/>
        </div>
        </Grid>
        </Typography>
        </ThemeProvider>
    )
}


}
export default Report