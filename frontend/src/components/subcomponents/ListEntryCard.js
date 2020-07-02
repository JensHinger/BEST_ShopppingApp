import React, { Component } from 'react'
import ArticleAmountUnit from './AddListEntry'
import {Button, ThemeProvider, Grid} from '@material-ui/core'
import Theme from "../../Theme"

 class ShoppingListEntry extends Component {

   constructor(props){
        super(props);

        this.state = {


         }

   }


    render() {
        return (
            <ThemeProvider theme = {Theme}>
            <div align = "center">
            <ArticleAmountUnit/>
            <br margin-top = '100px'/>
            <Grid container justify = "center">
            
            <Button variant = "contained" color = "primary"> fertig </Button>
            
            </Grid>   
            </div>
            </ThemeProvider>
           
        )
    }
    
}

export default ShoppingListEntry
