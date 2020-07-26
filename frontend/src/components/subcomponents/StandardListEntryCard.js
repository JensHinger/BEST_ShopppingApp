import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingAPI from '../../api/ShoppingAPI'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ItemBO from '../../api/ItemBO'
import ErrorDialog from '../dialogs/ErrorDialog'

/**
 * @author Jonathan
 */

class StandardListEntryCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            standardListEntry: props.standardListEntry,
            partyId: props.partyId,
            item: null,
            user: null,
            retailer: null,
            expanded: null,
            all_retailers: [],
            all_retailers_name: [],
            party_users: [],
            party_user_names: [],
            sel_retailer: null,
            sel_user: null,
            sel_amount: null,
            sel_unit: null,
            sel_item_name: null,
            units : ['St ', 'kg ', 'g ', 'L ', 'ml ', 'm ', 'cm ', 'Pckg '],
            errorDialog: false
        }
    }

    //wird nach dem rendern aufgerufen
    componentDidMount() {
        this.getStandardListEntryInformation()
        this.getStandardListEntryPossibleUsersInvitations()
    }


    //holt sich die Information der StandardlistenEinträge
    getStandardListEntryInformation = () => {

        ShoppingAPI.getAPI().getItemById(this.state.standardListEntry.getItemId())
            .then(ItemBO =>
                this.setState({
                    item: ItemBO
                })
            )

        ShoppingAPI.getAPI().getUserById(this.state.standardListEntry.getUserId())
            .then(UserBO =>
                this.setState({
                    user: UserBO
                })
            )

        ShoppingAPI.getAPI().getRetailerById(this.state.standardListEntry.getRetailerId())
            .then(RetailerBO =>
                this.setState({
                    retailer: RetailerBO
                })
            )

        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailerBOs => retailerBOs.map((retailerBO) => this.setState({ all_retailers: [...this.state.all_retailers, retailerBO] }))
            )
    }

    //holt sich die Standardlisteneinträge der möglichen Usereinladungen
    getStandardListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
                .then((invitations) => invitations.map((inv) => this.getStandardListEntryPossibleUsers(inv.getTargetUserId(),
                ))))
    }

    //holt sich die Standardlisteneinträge des Users
    getStandardListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({ party_users: [...this.state.party_users, user] })
            )
    }

    //holt sich den Retailer Namen und gibt es der Variablen ret_names zurück
    getStandardListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        return (ret_names)
    }

    //holt sich den Usernamen und gibt es den Variablen names zurück
    getStandardListEntryPossibleUserNames = () => {
        var names = this.state.party_users.map((user) => user.getName()
        )
        return (names)
    }

    //der expanded Status wird hier umgedreht
    expandHandler = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    //Item wird geupdatet; neuer Name wird gesetzt
    updateItem = () => {
        var myitem = new ItemBO
        myitem.setName(this.state.sel_item_name ? this.state.sel_item_name : this.state.item.getName())
        ShoppingAPI.getAPI().addItem(myitem)
            .then((newItem) => {
                return (this.setState({ item: newItem }),
                    this.updateStandardListEntry(newItem))
            })
    }

    //Standardlisteneinträge werden geupdatet
    updateStandardListEntry(item) {
        const myStandardListEntry = this.state.standardListEntry
        myStandardListEntry.setItemId(item.getID())
        //find retailer Id corresponding to retailer ID
        myStandardListEntry.setRetailerId(this.state.all_retailers[this.getStandardListEntryPossibleRetailerNames().indexOf(this.state.sel_retailer)].getID())
        // find user Id corresponding to User Id
        myStandardListEntry.setUserId(this.state.party_users[this.getStandardListEntryPossibleUserNames().indexOf(this.state.sel_user)].getID())
        myStandardListEntry.setAmount(this.state.sel_amount ? this.state.sel_amount : this.state.standardListEntry.getAmount())
        myStandardListEntry.setUnit(this.state.units.indexOf(this.state.sel_unit))
        ShoppingAPI.getAPI().updateStandardListEntry(myStandardListEntry)
            .then(this.setState({ standardListEntry: myStandardListEntry }),
                ShoppingAPI.getAPI().getUserById(this.state.standardListEntry.getUserId())
                    .then(UserBO =>
                        this.setState({
                            user: UserBO
                        })
                    ),

                ShoppingAPI.getAPI().getRetailerById(this.state.standardListEntry.getRetailerId())
                    .then(RetailerBO =>
                        this.setState({
                            retailer: RetailerBO
                        })
                    )
            )
    }

    //Listeneinträge werden gelöscht
    deleteLEntry = () => {
        ShoppingAPI.getAPI().deleteStandardListEntry(this.state.standardListEntry.getID()).then(() => {
            this.props.onStandardListEntryDeleted(this.state.standardListEntry)
        }
        )

    }

    //Setz errorDialog auf false 
    handleErrorClose = () =>{
        this.setState({errorDialog : false})
    }


    render() {
        const units = ['St ', 'kg ', 'g ', 'L ', 'ml ', 'm ', 'cm ', 'Pckg ']

        return (

            <div>
            
            {this.state.errorDialog?
                <ErrorDialog errorMessage="Irgendetwas stimmt hier nicht :c" handleErrorClose={this.handleErrorClose}/>
            : null}

            { 
                this.state.item && this.state.user && this.state.retailer && this.state.all_retailers_name && this.state.party_users  ? 
                <Card>
                    
                    <CardContent  >
                        {this.state.item.getName()} {this.state.standardListEntry.getAmount()}  {units[this.state.standardListEntry.getUnit()]} 
                        {this.state.user.getName()} {this.state.retailer.getName()} 
                        <IconButton  disabled = {this.state.checked ? true : false} justify ="right" onClick = {() => {this.expandHandler()}} 
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardContent>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <Card>
                            <CardContent>
                                <TextField onChange={(e) => { this.setState({ sel_item_name: e.target.value }) }} required id="standard-required" label="Name" defaultValue={this.state.item.getName()} />
                                <TextField onChange={(e) => { this.setState({ sel_amount: e.target.value }) }} required id="standard-required" label="Menge" defaultValue={this.state.standardListEntry.getAmount()} />
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={units}
                                    defaultValue={units[this.state.standardListEntry.getUnit()]}
                                    onInputChange={(event, value) => this.setState({ sel_unit: value })}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Einheit" />} />

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.getStandardListEntryPossibleRetailerNames()}
                                    defaultValue={this.state.retailer.getName()}
                                    onInputChange={(event, value) => this.setState({ sel_retailer: value })}
                                    //getOptionSelected	= {(option, value) => console.log("value:",value , "optionn", option)} 
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Laden" />} />

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.getStandardListEntryPossibleUserNames()}
                                    onInputChange={(event, value) => this.setState({ sel_user: value })}
                                    defaultValue={this.state.user.getName()}
                                    style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="User" />} />

                                <Button onClick={() => this.state.sel_retailer && this.state.sel_user && (this.state.sel_amount === null || this.state.sel_amount != "" && Math.sign(parseFloat(this.state.sel_amount)) === 1)
                                    && this.state.sel_unit && (this.state.sel_item_name != "" || this.state.sel_item_name === null || this.state.sel_item_name) ?
                                    this.updateItem() : this.setState({errorDialog: true})} size="large" color="primary" startIcon={< CheckCircleOutlineIcon />} />
                                <Button onClick={() => this.deleteLEntry()} size="large" color="primary" startIcon={<DeleteForeverIcon />} />

                            </CardContent>
                        </Card>
                    </Collapse> 
                </Card> 
                : null}          
            </div>
        )
    }
}

export default StandardListEntryCard