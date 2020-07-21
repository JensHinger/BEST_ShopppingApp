import React, { Component } from 'react';
import {ThemeProvider} from "@material-ui/core";
import Theme from "../../Theme";
import {Typography, Divider, Grid, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Paper} from '@material-ui/core';
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

    const items = this.state.mostBoughtItem
    const retailer = this.state.mostVisitedRetailer

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
                            {items? 
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Produktname</TableCell>
                                            <TableCell>Häufigkeit</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.getID()}>
                                                <TableCell>
                                                    {item.getName()}
                                                </TableCell>
                                                <TableCell>
                                                    {item.getCommonness()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> 
                            :null}
                        <Divider/>
                        <br margin-top ='20px'/>
                        Meist besuchter Laden
                        {retailer? 
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Ladenname</TableCell>
                                            <TableCell>Häufigkeit</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {retailer.map((retailer) => (
                                            <TableRow key={retailer.getID()}>
                                                <TableCell>
                                                    {retailer.getName()}
                                                </TableCell>
                                                <TableCell>
                                                    {retailer.getCommonness()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> 
                            :null}
                        <Divider/>
                    </div>
                </Grid>
            </Typography>
        </ThemeProvider>
    )
}


}
export default Report