import React, { Component } from 'react'
import { Button, TextField, Typography, Divider, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';
import ItemBO from '../../api/ItemBO';
import { Link as RouterLink } from 'react-router-dom'
import AddRetailerDialog from '../dialogs/AddRetailerDialog';
import ErrorDialog from '../dialogs/ErrorDialog'
import StandardListEntryBO from '../../api/StandardListEntryBO';

/**
 * @author Dominic, Anny, Jens, Jonathan
 */

class AddStandardLisEntry extends Component {

    constructor(props) {
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
            itemAutoCompleteKey: 44,
            errorDialog: false

        }

    }

    // wird nach der rendern aufgerufen 
    componentDidMount() {
        this.getAllItems()
        this.getAllRetailer()
        this.getStandardListEntryPossibleUsersInvitations()
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
     * partyId wird in state gesetzt
     * von der Party die Id holen
     */
    getStandardListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
                .then((invitations) => invitations.map((inv) => this.getStandardListEntryPossibleUsers(inv.getTargetUserId()
                ))))
    }

    //holt sich die UserId von dem eingeloggten User
    getStandardListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({ party_users: [...this.state.party_users, user] })
            )

    }

    //neues Item wird erzeugt
    createNewItem = () => {
        var Item = new ItemBO()
        Item.setName(this.state.pickedItem)
        ShoppingAPI.getAPI().addItem(Item)
            .then(function(newItem){
                var check = this.state.items.filter(item => item.getName() === newItem.getName())
                if (check.length < 1){
                    this.setState({ items: [...this.state.items, newItem]})
                }
                this.createNewStandardListEntry(newItem)
            }.bind(this))
    }

    //neue StandardlistenEinträge werden erstellt
    createNewStandardListEntry = (oneItem) => {
        var standardListEntry = new StandardListEntryBO()
        standardListEntry.setItemId(oneItem.getID())
        standardListEntry.setPartyId(Number(this.state.partyId))
        standardListEntry.setRetailerId(this.state.retailer[this.getStandardListEntryPossibleRetailerNames().indexOf(this.state.pickedRetailer)].getID())
        standardListEntry.setUserId(this.state.party_users[this.getStandardListEntryPossibleUserNames().indexOf(this.state.pickedUser)].getID())
        standardListEntry.setAmount(this.state.amount)
        standardListEntry.setUnit(this.state.unit)
        standardListEntry.setName("Wir sind die besten!")
        ShoppingAPI.getAPI().addStandardListEntry(standardListEntry).then(
            this.emptyState()
        )

    }

    //neue Keys werden erstellt
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
        //generating random keys to force the autocomplete boxes to re-render, thus making them empty 
        this.setState({
            retailerAutoCompleteKey: this.state.retailerAutoCompleteKey + 1,
            userAutoCompleteKey: this.state.userAutoCompleteKey + 1,
            unitTextFieldKey: this.state.unitTextFieldKey + 1,
            amountTextFieldKey: this.state.amountTextFieldKey + 1,
            itemAutoCompleteKey: this.state.itemAutoCompleteKey + 1,
        })
    }

    //holt sich die StandardlistEnty Retailer Namen und gibt diese an die ret_names zurück
    getStandardListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.retailer.map((retailer) => retailer.getName()
        )
        return (ret_names)
    }

    //holt sich die StandardlistEntry User Namen und gibt diese an die Variable names zurück
    getStandardListEntryPossibleUserNames = () => {
        var names = this.state.party_users.map((user) => user.getName()
        )
        return (names)
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


    //Value wird hier übergeben und setzt den State.pickedUser auf value
    handleUserChange = (value) => {
        this.setState({ pickedUser: value })
    };

    //holt sich alle Retailer
    handleNewRetailer = () => {
        this.getAllRetailer()
    };

    //Setz errorDialog auf false 
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
        const user = this.state.party_users



        return (
            <div>
                {this.state.errorDialog?
                    <ErrorDialog errorMessage="Irgendetwas stimmt hier nicht :c" handleErrorClose={this.handleErrorClose}/>
                : null}
                <Typography variant='h6' component='h1' align='center'>

                    <br margin-top='20px' />

                    Standard Eintrag hinzufügen

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
                                    renderInput={(params) => <TextField  {...params} label="Person" />} />
                                : null}
                        </Grid>
                    </div>


                    <div>
                        <br margin-top='20px' />
                        <Grid container justify="center">
                            {retailer ?
                                <Autocomplete
                                    id="combo-box-demo"
                                    key={this.state.retailerAutoCompleteKey}
                                    onInputChange={(event, value) => this.setState({ pickedRetailer: value })}
                                    options={retailer}
                                    getOptionLabel={(option) => option.getName()}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField  {...params} label="Laden" />} />
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
                            </Grid>

                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <TextField
                                    key={this.state.amountTextFieldKey}
                                    label="Menge"
                                    helperText="Geben Sie eine Menge an"
                                    onChange={(event) => this.handleAmountChange(event.target.value)}
                                    value={this.state.amount} />
                            </Grid>



                            <Grid xs={4}>
                                <br margin-top='20px' />
                                <TextField
                                    key={this.state.unitTextFieldKey}
                                    id="standard-select-currency"
                                    select
                                    label="Select"
                                    onChange={(event) => this.handleUnitChange(event.target.value)}
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
                        <br margin-top='20px' />
                        <Grid container
                            direction="row"
                            justify="center">


                            <br margin-top='20px' />
                            <Button onClick={() => this.state.amount && this.state.pickedItem && this.state.pickedRetailer
                                && this.state.pickedUser && (this.state.unit == 0 | this.state.unit) && Math.sign(parseFloat(this.state.amount)) === 1 ?
                                this.createNewItem() : this.setState({errorDialog : true})} variant="contained" color="primary"> Neuen Standard Eintrag Hinzufügen </Button>

                        </Grid>
                    </div>

                    <div>
                        <Grid justify="center">
                            <br margin-top='20px' />
                            <Button component={RouterLink} to={`/standardlistmanagement/${this.state.partyId}`} variant="contained" color="secondary"> zurück zu meinen Einträgen </Button>
                        </Grid>
                    </div>

                    <div>
                        <Grid justify="center">
                            <br margin-top='20px' />
                            <Button component={RouterLink} to={`/standardlistmanagement/${this.state.partyId}`} variant="contained" color="secondary"> abbrechen </Button>
                        </Grid>
                    </div>

                </Typography>

            </div>
        )
    }
}

export default AddStandardLisEntry