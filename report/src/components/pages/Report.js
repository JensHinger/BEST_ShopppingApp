import React, { Component } from 'react';
import {ThemeProvider, Button} from "@material-ui/core";
import Theme from "../../Theme";
import {Typography, Divider, Grid, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Paper, TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import ShoppingAPI from '../../api/ShoppingAPI'
import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * @author Anny und Jens
 */

class Report extends Component {
    constructor (props){
        super(props);
        this.state = {
            currentUser : null, 
            filteredListentries : null,
            listentries: null,
            retailer : null,
            pickedRetailer : null,
            end_date : null,
            start_date : null,
            items : null
        }
    }

    //wird nach dem rendern aufgerufen
    componentDidMount(){
        this.getCurrentUser()
        this.getAllRetailer()
        this.getAllItems()   
    }

    //holt sich den User 
    getCurrentUser = () => {
        ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
        .then(UserBO => {return(
          this.setState({
            currentUser: UserBO
          })
          ,this.getCheckedListentries())})
      }
    
    //holt sich die checked Listeneinträge
    getCheckedListentries = () => {
        ShoppingAPI.getAPI().getCheckedListentriesByUser(this.state.currentUser.getID())
        .then(listentries => this.setState({listentries : listentries,
                                            filterListentrys : listentries}))
    }

    //holt sich alle Retailer
    getAllRetailer = () => {
        ShoppingAPI.getAPI().getAllRetailer()
        .then(retailer => this.setState({retailer : retailer}))
    }

    //holt sich alle Items
    getAllItems = () => {
        ShoppingAPI.getAPI().getAllItems()
        .then(items => this.setState({items : items}))
    }

    //filtert die Listeneinträge
    filterListentrys = () => {
        var retailerBO = this.state.retailer.filter(retailer => retailer.getName() === this.state.pickedRetailer)


        if (retailerBO.length < 1 && this.state.end_date !== null && this.state.start_date !== null){
            //Wenn nur ein Start und End Datum angegeben wurden
            var filteredListentries = this.state.listentries.filter(listentry => listentry.getCreationDate() <= this.state.end_date && listentry.getCreationDate() >= this.state.start_date)
            this.setState({filteredListentries: filteredListentries})   
        }else if (retailerBO.length > 0 && this.state.end_date === null && this.state.start_date === null){
            //wenn nur ein Retailer angegeben wurde
            var filteredListentries = this.state.listentries.filter(listentry => listentry.getRetailerId() === retailerBO[0].getID())
            this.setState({filteredListentries: filteredListentries})
        }else if (retailerBO.length > 0 && this.state.end_date !== null && this.state.start_date !== null){
            //Wenn alle Felder ausgefüllt wurden
            var filteredListentries = this.state.listentries.filter(listentry => listentry.getRetailerId() === retailerBO[0].getID())
            filteredListentries = filteredListentries.filter(listentry => listentry.getCreationDate() <= this.state.end_date && listentry.getCreationDate() >= this.state.start_date)
            this.setState({filteredListentries: filteredListentries})
        }else{
            //Wenn kein Feld ausgefüllt wurde
            this.setState({filteredListentries: this.state.listentries})
        }
    }
   
/**
 * Stellt die Reportseite dar mit den Meistgekauften Artikeln und den meistbesuchten Läden
 */

render (){

    const listentries = this.state.filteredListentries
    const retailer = this.state.retailer
    const items = this.state.items

    const units = [
        {
            value: 0,
            label: 'St',
        },
        {
            value: 1,
            label: 'kg',
        },
        {
            value: 2,
            label: 'g',
        },
        {
            value: 3,
            label: 'L',
        },
        {
            value: 4,
            label: 'ml',
        },
        {
            value: 5,
            label: 'm',
        },
        {
            value: 6,
            label: 'cm',
        },
        {
            value: 7,
            label: 'Pckg',
        },
    ];

    return(
        <ThemeProvider theme={Theme}>
            <Typography variant='h6' component='h1' align='center'>
                <Grid container justify="center">
                    <div>
                        <br margin-top= '20px'/>
                        Report
                        <Divider/>
                        <br margin-top ='20px'/>
                        Gekaufte Artikel
                        <TableHead>
                            <TableCell>
                                {retailer ?
                                    <Autocomplete
                                        key={this.state.retailerAutoCompleteKey}
                                        id="combo-box-demo"
                                        onInputChange={(event, value) => this.setState({ pickedRetailer: value })}
                                        options={retailer}
                                        getOptionLabel={(option) => option.getName()}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Laden" />} />
                                : null}
                                
                                <TableCell>
                                    <TextField
                                        id="datetime-local"
                                        label="Start Datum"
                                        type="datetime-local"
                                        onChange={event => this.setState({start_date : event.target.value})}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />

                                    <TableCell/>

                                    <TextField
                                        id="datetime-local"
                                        label="End Datum"
                                        type="datetime-local"
                                        onChange={event => this.setState({end_date : event.target.value})}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </TableCell>

                                <Button onClick={this.filterListentrys}>
                                    Filter anwenden
                                </Button>
                            </TableCell>
                        </TableHead>
                            {listentries? 
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Verkäufer</TableCell>
                                            <TableCell>Produktname</TableCell>
                                            <TableCell>Menge</TableCell>
                                            <TableCell>Einheit</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {listentries.map((listentry) => (
                                            <TableRow key={listentry.getID()}>
                                                <TableCell>
                                                    {retailer.filter(ret => ret.getID() === listentry.getRetailerId())[0].getName()}
                                                </TableCell>
                                                <TableCell>
                                                    {items.filter(item => item.getID() === listentry.getItemId())[0].getName()}
                                                </TableCell>
                                                <TableCell>
                                                    {listentry.getAmount()}
                                                </TableCell>
                                                <TableCell>
                                                    {units.filter(unit => unit.value === listentry.getUnit())[0].label}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer> 
                            :null}
                    </div>
                </Grid>
            </Typography>
        </ThemeProvider>
    )
}


}
export default Report