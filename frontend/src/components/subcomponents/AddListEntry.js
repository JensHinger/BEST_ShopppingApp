import React, { Component } from 'react'
import { Button, TextField, Typography, Divider, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';
import ListEntryBO from '../../api/ListEntryBO'
import { Link as RouterLink } from 'react-router-dom'
import AddRetailerDialog from '../dialogs/AddRetailerDialog';
import ItemBO from '../../api/ItemBO';
import ErrorDialog from '../dialogs/ErrorDialog'

/**
 * @author Anny, Dominic, Jens, Jonathan
 */
class AddListEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {

            open: false,
            article: "",
            amount: null,
            unit: null,
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
            amountTextFieldKey: 4,

        }
    }
    componentDidMount() {
        this.getAllItems()
        this.getAllRetailer()
        this.getListEntryPossibleUsersInvitations()
    }

    //holt sich alle Retailer und setzt diese in einen State
    getAllRetailer() {
        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailer => this.setState({ retailer: retailer }))
    }

    //holt sich alle Items und setzt sie in einen State
    getAllItems = () => {
        ShoppingAPI.getAPI().getAllItems()
            .then(items => this.setState({ items: items }))
    }

    /**
     * holt sich die ListenId
     * listId wird in state gesetzt
     * holt sich aus der Liste die PartylId
     */
    getListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getListById(this.state.listid)
            .then((list) => ShoppingAPI.getAPI().getPartyById(list.getPartylId())
                .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
                    .then((invitations) => invitations.map((inv) => this.getListEntryPossibleUsers(inv.getTargetUserId(),
                    )))))
    }

    //holt sich die UserId von dem eingeloggten User
    getListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({ users: [...this.state.users, user] })
            )

    }

    //neues Item wird erzeugt
    createItem = () => {
        var myitem = new ItemBO
        myitem.setName(this.state.pickedItem)
        ShoppingAPI.getAPI().addItem(myitem)
            .then(function(newItem){
                var check = this.state.items.filter(item => item.getName() === newItem.getName())
                if (check.length < 1){
                    this.setState({ items: [...this.state.items, newItem]})
                }
                this.createNewListEntry(newItem)
            }.bind(this))
    }

    //neue Listeneinträge werden erstellt
    createNewListEntry = (oneItem) => {
        var ListEntry = new ListEntryBO
        ListEntry.setItemId(oneItem.getID())
        ListEntry.setListId(this.state.listid)
        ListEntry.setAmount(this.state.amount)
        ListEntry.setUnit(parseInt(this.state.unit))
        ListEntry.setRetailerId(this.state.retailer[this.getListEntryPossibleRetailerNames().indexOf(this.state.pickedRetailer)].getID())
        ListEntry.setUserId(this.state.users[this.getListEntryPossibleUserNames().indexOf(this.state.pickedUser)].getID())
        ListEntry.setName("Wir sind die besten!")
        ShoppingAPI.getAPI().addListEntry(ListEntry).then(
            this.emptyState()
        )

    }

    //neue Keys werden erstellt
    emptyState = () => {
        this.setState({
            article: "",
            amount: null,
            unit: null,
            listid: this.props.match.params.listid,
            pickedUser: "",
            pickedRetailer: "",
            item: null,
            errorDialog: false
        })
        
        //generating random keys to force the autocomplete boxes to re-render, thus making them empty 
        this.setState({
            retailerAutoCompleteKey: this.state.retailerAutoCompleteKey + 1,
            userAutoCompleteKey: this.state.userAutoCompleteKey + 1,
            unitTextFieldKey: this.state.unitTextFieldKey + 1,
            itemAutoCompleteKey: this.state.itemAutoCompleteKey + 1,
            amountTextFieldKey: this.state.amountTextFieldKey + 1,
        })
    }

    //holt sich die listEntry User Namen und gibt diese an die Konstante userNames zurück
    getListEntryPossibleUserNames = () => {
        const userNames = this.state.users.map((user) => user.getName())
        return (userNames)
    }

    //holt sich die listEnty Retailer Namen und gibt diese an die ret_names zurück
    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.retailer.map((retailer) => retailer.getName()
        )
        return (ret_names)
    }

    //holt sich die StandardlistEntry User Namen und gibt diese an die Variable item_names zurück
    getListEntryPossibleItemNames = () => {
        var item_names = this.state.items.map((item) => item.getName()
        )
        return (item_names)
    }

    //Value wird hier übergeben und setzt den State.amount auf value
    handleAmountChange = (value) => {
        this.setState({ amount: value })
    };

    //Value wird hier übergeben und setzt den State.article auf value
    handleArticleChange = (value) => {
        this.setState({ article: value })
    };

    //Value wird hier übergeben und setzt den State.unit auf value
    handleUnitChange = (value) => {
        this.setState({ unit: value })
    };

    //checked Status wird hier umgedreht
    handleClicked = () => {
        this.setState({ checked: !this.state.checked })
    };

    //Value wird hier übergeben und setzt den State.pickedUser auf value
    handleUserChange = (value) => {
        this.setState({ pickedUser: value })
    };

    //holt sich alle Retailer
    handleNewRetailer = () => {
        this.getAllRetailer()
    };

    //Schließt den ErrorDialog
    handleErrorClose = () =>{
        this.setState({errorDialog : false})
      }

    render() {
        
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

        return (
            <div>
                
                {this.state.errorDialog?
                    <ErrorDialog errorMessage="Alle Felder müssen befüllt sein!" handleErrorClose={this.handleErrorClose}/>
                : null}

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
                        <Grid container justify="center" >

                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <Grid container justify="center">
                                    {item ?
                                        <Autocomplete
                                            freeSolo
                                            key={this.state.itemAutoCompleteKey}
                                            id="combo-box-demo"
                                            onInputChange={(event, value) => this.setState({ pickedItem: value })}
                                            options={item}
                                            getOptionLabel={(option) => option.getName()}
                                            style={{ width: 200 }}
                                            renderInput={(params) => <TextField  {...params} label="Artikel" />} />
                                        : null}
                                </Grid>
                            </Grid>

                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <TextField
                                    key={this.state.amountTextFieldKey}
                                    label="Menge"
                                    helperText="Geben Sie eine Menge an"
                                    value={this.state.amount}
                                    onChange={(event) => this.handleAmountChange(event.target.value)} />


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
                        <br margin-top='20px' />
                        <Grid container
                            direction="row"
                            justify="center">

                            <br margin-top='20px' />
                            <Button onClick={() => (this.state.amount &&  !isNaN(this.state.amount)) && this.state.pickedItem && this.state.pickedRetailer && this.state.pickedUser && (this.state.unit == 0 || this.state.unit) && Math.sign(parseFloat(this.state.amount)) === 1 ?
                                                   this.createItem() : this.setState({errorDialog : true})} variant="contained" color="primary"> Eintrag hinzufügen </Button>

                        </Grid>

                    </div>


                    <div>   
                        <Grid justify="center">
                            <br margin-top='20px' />
                            <Button component={RouterLink} to={`/partyshoppinglist/${this.state.listid}`} variant="contained" color="secondary"> zurück zu meinen Einträgen </Button>
                        </Grid>
                    </div>

                    <div>
                        <Grid justify="center">
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