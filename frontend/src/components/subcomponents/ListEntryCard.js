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
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ItemBO from '../../api/ItemBO'
import ErrorDialog from '../dialogs/ErrorDialog'

/**
 * @author Jonathan
 */

class ListEntryCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listentry: props.listentry,
            checked: props.listentry.getchecked(),
            listid: props.listid.listid,
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
            errorDialog: false,

        }
    }

    //wird nach dem rendern aufgerufen
    componentDidMount() {
        this.getListentryInformation()
        this.getListEntryPossibleUsersInvitations()

    }

    /**
     * holt sich die Informationen für den Listeneintrag
     * holt sich hier die ItemId, die UserId, die RetailerId und alle Retailer
     */
    getListentryInformation = () => {
        ShoppingAPI.getAPI().getItemById(this.state.listentry.getItemId())
            .then(ItemBO =>
                this.setState({
                    item: ItemBO
                })
            )

        ShoppingAPI.getAPI().getUserById(this.state.listentry.getUserId())
            .then(UserBO =>
                this.setState({
                    user: UserBO
                })
            )

        ShoppingAPI.getAPI().getRetailerById(this.state.listentry.getRetailerId())
            .then(RetailerBO =>
                this.setState({
                    retailer: RetailerBO
                })
            )

        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailerBOs => retailerBOs.map((retailerBO) => this.setState({ all_retailers: [...this.state.all_retailers, retailerBO] }))
            )
    }

    //holt sich die Listeneinträge der möglichen Usereinladungen
    getListEntryPossibleUsersInvitations = () => {
        ShoppingAPI.getAPI().getListById(this.state.listid)
            .then((list) => ShoppingAPI.getAPI().getPartyById(list.getPartylId())
                .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
                    .then((invitations) => invitations.map((inv) => this.getListEntryPossibleUsers(inv.getTargetUserId(),
                    )))))
    }

    //holt sich die Listeneinträge des Users
    getListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({ party_users: [...this.state.party_users, user] })
            )
    }

    //holt sich den Retailer Namen und gibt es der Variablen ret_names zurück
    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        return (ret_names)
    }

    //holt sich den Usernamen und gibt es den Variablen names zurück
    getListEntryPossibleUserNames = () => {
        var names = this.state.party_users.map((user) => user.getName()
        )
        return (names)
    }

    //der expanded Status wird hier umgedreht
    expandHandler = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    //geht durch den Handler und prüft den Stand
    scoreThroughHandler = () => {
        this.setState({ checked: !this.state.checked })
        if (this.state.expanded === true) {
            this.setState({ expanded: !this.state.expanded })
        }
        const mylistentry = this.state.listentry
        mylistentry.setchecked(this.state.checked ? 0 : 1)
        ShoppingAPI.getAPI().updateListEntry(this.state.listentry).then(() => this.props.onListEntryUpdated(this.state.listentry))

    }

    //Item wird geupdatet; neuer Name wird gesetzt
    updateItem = () => {
        var myitem = new ItemBO
        myitem.setName(this.state.sel_item_name ? this.state.sel_item_name : this.state.item.getName())
        ShoppingAPI.getAPI().addItem(myitem)
            .then((newItem) => {
                return (this.setState({ item: newItem }),
                    this.updateListEntry(newItem))
            }
            )
    }

    //Listeneinträge werden geupdatet
    updateListEntry(item) {
        const mylistentry = this.state.listentry
        mylistentry.setItemId(item.getID())
        //find retailer Id corresponding to retailer ID
        mylistentry.setRetailerId(this.state.all_retailers[this.getListEntryPossibleRetailerNames().indexOf(this.state.sel_retailer)].getID())
        // find user Id corresponding to User Id
        mylistentry.setUserId(this.state.party_users[this.getListEntryPossibleUserNames().indexOf(this.state.sel_user)].getID())
        //mylistentry.setchecked(this.convertChecked())
        mylistentry.setchecked(this.state.checked ? 1 : 0)
        mylistentry.setAmount(this.state.sel_amount ? this.state.sel_amount : this.state.listentry.getAmount())
        mylistentry.setUnit(this.state.units.indexOf(this.state.sel_unit))
        this.props.onListEntryUpdated(this.state.listentry)
        ShoppingAPI.getAPI().updateListEntry(mylistentry)
            .then(ShoppingAPI.getAPI().getUserById(this.state.listentry.getUserId())
                .then(UserBO =>
                    this.setState({
                        user: UserBO
                    })
                ),

                ShoppingAPI.getAPI().getRetailerById(this.state.listentry.getRetailerId())
                    .then(RetailerBO =>
                        this.setState({
                            retailer: RetailerBO
                        })
                    ),
                this.props.onListEntryUpdated(this.state.listentry)

            )
    }

    //Listeneinträge werden gelöscht
    deleteLEntry = () => {
        ShoppingAPI.getAPI().deleteListEntry(this.state.listentry.getID()).then(
            () => {
                this.props.onListEntryDeleted(this.state.listentry)
            }
        )

    }

    render() {
        const units = ['St ', 'kg ', 'g ', 'L ', 'ml ', 'm ', 'cm ', 'Pckg ']
        const { classes } = this.props;
        //console.log("eine Card: ", this.props)
        return (
            <div>

            {this.state.errorDialog?
                <ErrorDialog errorMessage="Irgendetwas stimmt hier nicht :c" handleErrorClose={this.handleErrorClose}/>
            : null}
                

            { 
                this.state.item && this.state.user && this.state.retailer && this.state.all_retailers_name && this.state.party_users  ? 
                <div>
                    <Card >
                    
                    <CardContent disabled = {true} style={{ textDecoration : this.state.checked ? 'line-through' : null}} >
                    
                    <Checkbox checked={this.state.checked} onClick ={() => {this.scoreThroughHandler()}}/>
                    
                    {this.state.item.getName()}  {this.state.listentry.getAmount()}   {units [this.state.listentry.getUnit()]}  
                    {this.state.user.getName()} {this.state.retailer.getName()} 
                   
                        <IconButton  disabled = {this.state.checked ? true : false} justify ="right" onClick = {() => {this.expandHandler()}} 
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    
                    </CardContent>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <Card>
                            <CardContent>
                                <TextField onChange = {(e) => {this.setState({sel_item_name: e.target.value })}} required id="standard-required" label="Name" defaultValue = {this.state.item.getName()} />
                                <TextField onChange = {(e)=> {this.setState({sel_amount: e.target.value })}} required id="standard-required" label="Menge" defaultValue = {this.state.listentry.getAmount()} />
                                <Autocomplete
                                id="combo-box-demo"
                                options={units}
                                defaultValue = {units[this.state.listentry.getUnit()]}
                                onInputChange = {(event, value) => this.setState({sel_unit: value})}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Einheit" />}/>

                                <Autocomplete
                                id="combo-box-demo"
                                options={this.getListEntryPossibleRetailerNames()}
                                defaultValue = {this.state.retailer.getName()}
                                onInputChange = {(event, value) => this.setState({sel_retailer: value})}
                                //getOptionSelected	= {(option, value) => console.log("value:",value , "optionn", option)} 
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Laden" />}/>
                                
                                <Autocomplete
                                id="combo-box-demo"
                                options={this.getListEntryPossibleUserNames()}
                                onInputChange = {(event, value) => this.setState({sel_user: value})}
                                defaultValue={this.state.user.getName()}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params}  label="User"  />}/>
                                
                                <Button onClick={() => this.state.sel_retailer && this.state.sel_user && (this.state.sel_amount === null ||  this.state.sel_amount != "" && Math.sign(parseFloat(this.state.sel_amount)) === 1) 
                                                       && this.state.sel_unit && (this.state.sel_item_name != "" || this.state.sel_item_name === null || this.state.sel_item_name) ?
                                    this.updateItem() : this.setState({errorDialog : true})} size ="large" color="primary" startIcon={< CheckCircleOutlineIcon/>} />
                                <Button onClick={() => this.deleteLEntry()} size="large" color="primary" startIcon={<DeleteForeverIcon/>}/>          
                                

                            </CardContent>
                        </Card>
                    </Collapse>
                </Card> 
                </div>    
                : null 
            }    
            </div>
        )
    }
}



export default ListEntryCard