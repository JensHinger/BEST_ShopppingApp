import React, { Component } from 'react';
import {ThemeProvider} from "@material-ui/core";
import Theme from "../../Theme";
import {Button, TextField, Typography, Divider, Grid, ListItemIcon} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'


/**
 * @author Anny und Jens
 */

class Report extends Component {
    constructor (props){
        super(props);
        this.state = {
            currentUser : null,
            mostBoughtItem : null,
            mostVisitedRetailer : null
        }
    }

    componentDidMount(){
        this.getMostBought()
        this.getMostVisited()
    }

    getMostBought = () => {
        ShoppingAPI.getAPI().getCountedRetailer(1)
        .then(retailer => this.setState({mostVisitedRetailer: retailer}))
    }

    getMostVisited = () => {
        ShoppingAPI.getAPI().getCountedItem(1)
        .then((items) => this.setState({mostBoughtItem: items}))
    }

/**
 * Stellt die Reportseite dar mit den Meistgekauften Artikeln und den meistbesuchten Läden
 */

render (){

    console.log("Item :", this.state.mostBoughtItem)
    console.log("Retailer :", this.state.mostVisitedRetailer)

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