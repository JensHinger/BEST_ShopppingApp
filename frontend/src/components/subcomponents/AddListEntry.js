import React, { Component } from 'react'
import { Button, TextField, Typography, Divider, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';
import ListEntryBO from '../../api/ListEntryBO'
import ItemBO from '../../api/ItemBO';
import { Link as RouterLink } from 'react-router-dom'
import AddRetailerDialog from '../dialogs/AddRetailerDialog';


 class AddListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {

        open: false, 
        article: "",
        amount: 0,
        unit: 0,
        listid: this.props.match.params.listid,
        retailer: [],
        items: [],
        users: [],
        pickedUser: null,
        pickedRetailer: null,
        pickedItem: null,
        retailerAutoCompleteKey: 0,
        userAutoCompleteKey: 1,
        unitTextFieldKey: 2,
        itemAutoCompleteKey: 3,

        }
        



  }
    componentDidMount(){
        this.getAllItems()
        this.getAllRetailer()
        this.getListEntryPossibleUsersInvitations()
    }


    getAllRetailer() {
        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailer => this.setState({ retailer: retailer }))
    }

    getAllItems = () => {
        ShoppingAPI.getAPI().getAllItems()
        .then(items => this.setState({items: items}))
    }

    getListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getListById(this.state.listid)
            .then((list) => ShoppingAPI.getAPI().getPartyById(list.getPartylId())
                .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
                    .then((invitations) => invitations.map((inv) => this.getListEntryPossibleUsers(inv.getTargetUserId(),
                    )))))
    }

    getListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({ users: [...this.state.users, user] })
            )

    }


    
    createNewListEntry=()=>{
        var ListEntry = new ListEntryBO
        //console.log(this.state.item)
        ListEntry.setItemId(this.state.items[this.getListEntryPossibleItemNames().indexOf(this.state.pickedItem)].getID())
        ListEntry.setListId(this.state.listid)
        ListEntry.setAmount(this.state.amount)
        ListEntry.setUnit(this.state.unit)
        ListEntry.setRetailerId(this.state.retailer[this.getListEntryPossibleRetailerNames().indexOf(this.state.pickedRetailer)].getID())
        ListEntry.setUserId(this.state.users[this.getListEntryPossibleUserNames().indexOf(this.state.pickedUser)].getID())
        ListEntry.setName("Wir sind die besten!")
        console.log("der neue Entry:", ListEntry)
        ShoppingAPI.getAPI().addListEntry(ListEntry).then(
            this.emptyState()
        )

    }

    emptyState = () => {
        this.setState({
            article: "",
            amount: 0,
            unit: 0,
            listid: this.props.match.params.listid,
            pickedUser: "",
            pickedRetailer: "",
            item: null,
        })
        console.log("state nachdem er geleert wurde", this.state)
        //generating random keys to force the autocomplete boxes to re-render, thus making them empty 
        this.setState({
            retailerAutoCompleteKey: this.state.retailerAutoCompleteKey + 1,
            userAutoCompleteKey: this.state.userAutoCompleteKey + 1,
            unitTextFieldKey: this.state.unitTextFieldKey + 1,
            itemAutoCompleteKey: this.state.itemAutoCompleteKey + 1,
        })
    }

    getListEntryPossibleUserNames = () => {
        const userNames = this.state.users.map((user) => user.getName())
        //console.log("alle Usernamen:", userNames)
        return (userNames)
    }

    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.retailer.map((retailer) => retailer.getName()
        )
        console.log("namen aller Retailer:", ret_names)
        return (ret_names)
    }

    getListEntryPossibleItemNames = () => {
        var item_names = this.state.items.map((item) => item.getName()
        )
        console.log("namen aller Items:", item_names)
        return (item_names)
    }


    handleAmountChange = (value) => {
        this.setState({ amount: value })
        //console.log(this.state.amount)
    };

    handleArticleChange = (value) => {
        this.setState({ article: value })
        //console.log(this.state.article)
    };

    handleUnitChange = (value) => {
        this.setState({ unit: value })
    };

    handleClicked = () => {
        this.setState({ checked: !this.state.checked })
        //console.log("checked:", this.state.checked)
    };

    handleUserChange = (value) => {
        this.setState({ pickedUser: value })
    };


    handleNewRetailer = () => {
        this.getAllRetailer()
    };

    render() {
        console.log("user", this.state.users)
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
        const item = this.state.items
        const user = this.state.users
        //console.log(retailer)
        //console.log(user)



        return (
            <div>
                <Typography variant='h6' component='h1' align='center'>

                    <br margin-top='20px' />

                    Eintrag hinzufügen

                    <Divider />

                    <div>
                        <br margin-top='20px' />
                        <Grid container justify="center">
                            {user ?
                                <Autocomplete
                                    key={this.state.userAutoCompleteKey}
                                    id="combo-box-demo"
                                    onInputChange={(event, value) => this.handleUserChange(value)}
                                    options={user}
                                    getOptionLabel={(option) => option.getName()}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Person" />} />
                                : null}
                        </Grid>
                    </div>


                    <div>
                        <br margin-top='20px' />
                        <Grid container justify="center">
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
                        </Grid>
                    </div>

                    <div>
                        <br margin-top='20px' />
                        <Grid container justify="center">
                            <Grid>
                                <AddRetailerDialog handleNewRetailer={this.handleNewRetailer} />
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <Grid container justify= "center" >

                            <Grid xs ={4}>
                                <br margin-top='20px'/>
                                <Grid container justify="center">
                                {item ?
                                <Autocomplete
                                    key={this.state.itemAutoCompleteKey}
                                    id="combo-box-demo"
                                    onInputChange={(event, value) => this.setState({ pickedItem: value })}
                                    options={item}
                                    getOptionLabel={(option) => option.getName()}
                                    style={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} label="Artikel" />} />
                                : null}
                                </Grid>
                            </Grid>

                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <TextField
                                    label="Menge"
                                    helperText="Geben Sie eine Menge an"
                                    value = {this.state.amount}
                                    onChange={(event)=> this.handleAmountChange(event. target. value)}/>

                                
                            </Grid>



                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <TextField
                                    key={this.state.unitTextFieldKey}
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    onChange={(event) => this.handleUnitChange(event.target.value)}
                                    helperText="Please select your Unit"
                                >
                                    {units.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>


                            </Grid>
                        </Grid>
                    </div>
                    <div>
                        {/**<Grid container justify="center"> 
                    <Grid xs>
                        <br margin-top ='20px'/>
                        <Checkbox 
                        checked={this.state.checked} onClick={() => {this.handleClicked()}}
                        />
                        Standardartikel
                    </Grid>
                    </Grid>*/}
                    </div>
                    <div>
                        <br margin-top='20px' />
                        <Grid container
                            direction="row"
                            justify="center">


                            <br margin-top='20px' />
                            <Button onClick={this.createNewListEntry} variant="contained" color="primary"> Eintrag hinzufügen </Button>

                            <br margin-top='20px' />
                            <Button component={RouterLink} to={`/partyshoppinglist/${this.state.listid}`} variant="contained" color="secondary"> zurück zu meinen Einträgen </Button>

                            <br margin-top='20px' />
                            <Button component={RouterLink} to={`/partyshoppinglist/${this.state.listid}`} variant="contained" color="secondary"> abbrechen </Button>





                        </Grid>
                    </div>


                </Typography>

            </div>
        )
    }
}

export default AddListEntry

