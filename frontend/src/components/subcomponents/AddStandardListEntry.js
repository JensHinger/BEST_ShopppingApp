import React, { Component } from 'react'
import {Button, TextField, Typography, Divider, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';
import ItemBO from '../../api/ItemBO';
import {Link as RouterLink} from 'react-router-dom'
import AddRetailerDialog from '../dialogs/AddRetailerDialog';
import StandardListEntryBO from '../../api/StandardListEntryBO';


 class AddStandardLisEntry extends Component {

  constructor(props){
    super(props);

    this.state = {

        open: false, 
        article: "",
        amount: null,
        unit: null,
        partyId: this.props.match.params.partyid,
        retailer: [],
        items: [],
        party_users: [],
        pickedUser: null,
        pickedRetailer: null,
        pickedItem: null,
        userAutoCompleteKey: 0,
        retailerAutoCompleteKey: 5,
        unitTextFieldKey: 12,
        amountTextFieldKey: 33,
        itemAutoCompleteKey: 44


    }


  }
    componentDidMount(){
        this.getAllItems()
        this.getAllRetailer()
        this.getStandardListEntryPossibleUsersInvitations()
    }
    

    getAllRetailer(){
        ShoppingAPI.getAPI().getAllRetailer()
        .then(retailer => this.setState({retailer: retailer}))
    } 

    getAllItems = () => {
        ShoppingAPI.getAPI().getAllItems()
        .then(items => this.setState({items: items}))
    }

    getStandardListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
             .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
             .then((invitations) => invitations.map((inv) => this.getStandardListEntryPossibleUsers(inv.getTargetUserId()
             ))))}
    
    getStandardListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({party_users: [...this.state.party_users, user]})
            //.then(console.log("später"))
            )    
    
    }        
    

    createNewItem = () => {
        var Item = new ItemBO()
        Item.setName(this.state.pickedItem)
        ShoppingAPI.getAPI().addItem(Item)
        .then((newItem) => {return(this.setState({items: [...this.state.items, newItem]}), 
                                   this.createNewStandardListEntry(newItem))})
    }
    
    
    createNewStandardListEntry = (oneItem) => {
        var standardListEntry = new StandardListEntryBO()
        console.log("item:", oneItem)
        standardListEntry.setItemId(oneItem.getID())
        standardListEntry.setPartyId(Number(this.state.partyId))
        standardListEntry.setRetailerId(this.state.retailer[this.getStandardListEntryPossibleRetailerNames().indexOf(this.state.pickedRetailer)].getID())
        standardListEntry.setUserId(this.state.party_users[this.getStandardListEntryPossibleUserNames().indexOf(this.state.pickedUser)].getID())
        standardListEntry.setAmount(this.state.amount)
        standardListEntry.setUnit(this.state.unit)
        standardListEntry.setName("Wir sind die besten!")
        console.log("der neue Entry:", standardListEntry)
        ShoppingAPI.getAPI().addStandardListEntry(standardListEntry).then(
            this.emptyState()
        )

    }
    
    emptyState = () => {
        this.setState({
            article: "",
            amount: null,
            unit: null,
            partyId: this.props.match.params.partyid,
            pickedUser: "",
            pickedRetailer: "",
            pickedItem: null,
        })
        console.log("state nachdem er geleert wurde", this.state)
        //generating random keys to force the autocomplete boxes to re-render, thus making them empty 
        this.setState({
            retailerAutoCompleteKey: this.state.retailerAutoCompleteKey + 1,
            userAutoCompleteKey: this.state.userAutoCompleteKey + 1,
            unitTextFieldKey: this.state.unitTextFieldKey + 1,
            amountTextFieldKey: this.state.amountTextFieldKey + 1,
            itemAutoCompleteKey: this.state.itemAutoCompleteKey + 1,
        })
        console.log("key erhöht!", this.state)
    }
    getStandardListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.retailer.map((retailer) => retailer.getName()
        )
        //console.log(ret_names)
        return (ret_names)
    }

    getStandardListEntryPossibleUserNames = () => { 
        var names = this.state.party_users.map((user) => user.getName()
                      )
        //console.log("namen:", names)
        return (names)
    }
    

    handleAmountChange  = (value) => {
        this.setState({amount:value})
        //console.log(this.state.amount)
    };
   
    handleArticleChange =  (value) => {
        this.setState({article:value})
        //console.log(this.state.article)
    };

    handleUnitChange = (value)=> {
        this.setState({unit:value})
    };
    

    handleUserChange = (value) =>{
        this.setState({pickedUser: value})
    };


    handleNewRetailer = () =>{
        this.getAllRetailer()
    };

    render() {
        console.log("user", this.state.party_users)
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

        const retailer = this.state.retailer
        const user = this.state.party_users
        //console.log(retailer)
        //console.log(user)
        //console.log("this.props.match.params.partyId", this.props.match.params.partyId) 
        //console.log("this.props.match.params",  this.props.match.params)
       
     
        return (
            <div>
                <Typography variant='h6' component='h1' align='center'>

                    <br margin-top = '20px'/>

                    Standard Eintrag hinzufügen

                    <Divider/>

                    <div>
                    <br margin-top = '20px'/>
                    <Grid container justify ="center">
                    {user?
                        <Autocomplete
                        key = {this.state.userAutoCompleteKey}
                        id="combo-box-demo"
                        onInputChange={(event, value)=> this.handleUserChange(value)}
                        options={user}
                        getOptionLabel={(option) => option.getName()}
                        style={{ width: 300 }}
                        renderInput={(params) =><TextField  {...params} label="Person"  />}/>
                    :null}
                    </Grid>
                    </div>


                    <div>
                    <br margin-top = '20px'/>
                    <Grid container justify ="center">
                    {retailer?
                        <Autocomplete
                        id="combo-box-demo"
                        key={this.state.retailerAutoCompleteKey}
                        onInputChange={(event, value)=> this.setState({pickedRetailer: value})}
                        options={retailer}
                        getOptionLabel={(option) => option.getName()}
                        style={{ width: 300 }}
                        renderInput={(params) =><TextField  {...params} label="Laden"  />}/>
                    :null}
                    </Grid>
                    </div>
                    
                    <div>
                    <br margin-top = '20px'/>
                    <Grid container justify = "center">
                    <Grid>
                    <AddRetailerDialog handleNewRetailer = {this.handleNewRetailer}/>
                    </Grid>
                    </Grid>
                    </div>

                    <div>
                    <Grid container justify = "center" spacing = {2}>
                    <Grid xs>
                        <br margin-top = '20px'/>
                        {this.state.items ?
                                <Autocomplete
                                    
                                    freeSolo
                                    key={this.state.itemAutoCompleteKey}
                                    id="combo-box-demo"
                                    onInputChange={(event, value) => this.setState({ pickedItem: value })}
                                    options={this.state.items}
                                    getOptionLabel={(option) => option.getName()}
                                    style={{ width: 200 }}
                                    renderInput={(params) => <TextField  {...params} label="Artikel" />} />
                                : null}
                        
                    </Grid>

                    <Grid xs>
                        <br margin-top = '20px'/>
                        <TextField
                        key={this.state.amountTextFieldKey}
                        label="Menge"
                        helperText="Geben Sie eine Menge an"
                        onChange = {(event) => this.handleAmountChange(event.target.value)}
                        value = {this.state.amount}/>
                    </Grid>


                    
                    <Grid xs>
                        <br margin-top = '20px'/>
                        <TextField
                        key={this.state.unitTextFieldKey}
                        id="standard-select-currency"
                        select
                        label="Select"
                        onChange = {(event) => this.handleUnitChange(event.target.value)}
                        helperText="Bitte wählen sie die Einheit"
                        >
                            {units.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                       
                    </Grid>      
                    </Grid>
                    <br margin-top = '20px'/>
                    <Grid container 
                    direction= "row"
                    justify = "center">
                        
                        
                        <br margin-top = '20px'/>
                        <Button onClick ={() => this.state.amount && this.state.pickedItem && this.state.pickedRetailer 
                                                && this.state.pickedUser && (this.state.unit == 0 |this.state.unit) ?
                                                this.createNewItem() : console.log("da stimmt was nicht")} variant = "contained" color = "primary"> Neuen Standard Eintrag Hinzufügen </Button>
                        
                        <br margin-top = '20px'/>
                        <Button component = {RouterLink} to = {`/standardlistmanagement/${this.state.partyId}`} variant = "contained" color = "secondary"> zurück zu meinen Einträgen </Button>
                        <br margin-top = '20px'/>
                        <Button component = {RouterLink} to = {`/standardlistmanagement/${this.state.partyId}`} variant = "contained" color = "secondary"> abbrechen </Button>
                       
                        
                    </Grid>
                    </div>

                    
                </Typography>
                
            </div>
        )
    }
}

export default AddStandardLisEntry