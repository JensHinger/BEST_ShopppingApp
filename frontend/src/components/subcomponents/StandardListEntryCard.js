import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShoppingAPI from '../../api/ShoppingAPI'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListEntryBO from '../../api/ListEntryBO'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class StandardListEntryCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            standardListEntry : props.standardListEntry,
            partyId: props.partyId,
            item : null, 
            user: null, 
            retailer: null,
            expanded : null,
            all_retailers: [],
            all_retailers_name: [],
            party_users: [],
            party_user_names: [],
            sel_retailer: null, 
            sel_user: null,
            sel_item_amount: null,
            sel_item_unit: null,
            sel_item_name: null,
            units : ['St', 'kg', 'g', 'L', 'ml', 'm', 'cm', 'Pckg'] 
        }
    }

    componentDidMount(){
        this.getStandardListEntryInformation()
        this.getStandardListEntryPossibleUsersInvitations()

    }


    getStandardListEntryInformation = () => {
            // Informationen über die Listeneinträge  erhalten 
            // -> Item(id) -> Menge und ArtikelName, User(id), Retailer(id) 
            ShoppingAPI.getAPI().getItemById(this.state.standardListEntry.getItemId()) 
            .then(ItemBO =>
                this.setState({  
                  item : ItemBO})
                  )
            
            ShoppingAPI.getAPI().getUserById(this.state.standardListEntry.getUserId()) 
            .then(UserBO =>
                this.setState({  
                user : UserBO})
                )
            
            ShoppingAPI.getAPI().getRetailerById(this.state.standardListEntry.getRetailerId()) 
            .then(RetailerBO =>
                this.setState({  
                  retailer : RetailerBO})
                )
            
            ShoppingAPI.getAPI().getAllRetailer()
            .then(retailerBOs => retailerBOs.map((retailerBO) => this.setState({all_retailers: [...this.state.all_retailers, retailerBO]}))
                )
            
        }
    
    getStandardListEntryPossibleUsersInvitations = () => {
       ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
            .then((invitations) => invitations.map((inv) => this.getStandardListEntryPossibleUsers(inv.getTargetUserId(),
            ))))}

    getStandardListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({party_users: [...this.state.party_users, user]})
            //.then(console.log("später"))
            )    
    
    }

    getStandardListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        //console.log(ret_names)
        return (ret_names)
    }

    getStandardListEntryPossibleUserNames = () => { 
        var names = this.state.party_users.map((user) => user.getName()
                      )
        return (names)
    }

    expandHandler = () => {
        this.setState({expanded : !this.state.expanded})
    }


    updateItem = () => {
        
        const myitem = this.state.item; 
        console.log(this.state.sel_item_amount)
        myitem.setName(this.state.sel_item_name ? this.state.sel_item_name : this.state.item.getName())
        myitem.setAmount(this.state.sel_item_amount ? this.state.sel_item_amount : this.state.item.getAmount())
        myitem.setUnit(this.state.units.indexOf(this.state.sel_item_unit))
        console.log("item zum updaten:", myitem)
        ShoppingAPI.getAPI().updateItem(myitem)
        .then(ShoppingAPI.getAPI().getItemById(this.state.item.getID())
              .then(
                  (updateditem) => this.setState({item: updateditem}),
                  //console.log("itemstate:", )
                  this.updateStandardListEntry()
              )
              
            )
    }

    updateStandardListEntry(){
        const myStandardListEntry = this.state.standardListEntry
        console.log("myStandardListEntry", myStandardListEntry)
        //myStandardListEntry.setItemId(this.state.item.getID())
        //find retailer Id corresponding to retailer ID
        myStandardListEntry.setRetailerId(this.state.all_retailers[this.getStandardListEntryPossibleRetailerNames().indexOf(this.state.sel_retailer)].getID())
        // find user Id corresponding to User Id
        myStandardListEntry.setUserId(this.state.party_users[this.getStandardListEntryPossibleUserNames().indexOf(this.state.sel_user)].getID())
        console.log("Listentry zum updaten:", myStandardListEntry)
        ShoppingAPI.getAPI().updateStandardListEntry(myStandardListEntry)
        .then(ShoppingAPI.getAPI().getStandardListEntrybyId(this.state.standardListEntry.getID())
              .then(() => this.props.onStandardListEntryUpdated(this.state.standardListEntry)

              )
        )
    }

    matchRetailerNameToId = () => {
        const my_retailer_name = this.state.sel_retailer
        const ret_name_arr = this.geStandardtListEntryPossibleRetailerNames()
        const target_index = ret_name_arr.indexOf(this.state.sel_retailer)
        //console.log(this.state.all_retailers[target_index].getName())
    }
    

    deleteLEntry = () => {
        
        ShoppingAPI.getAPI().deleteStandardListEntry(this.state.standardListEntry.getID()).then(() => {  
            this.props.onStandardListEntryDeleted(this.state.standardListEntry)
            }
        )
        console.log("versuche einen Eintrag zu löschen:", this.state.standardListEntry)
    }

    render(){
        const units = ['St', 'kg', 'g', 'L', 'ml', 'm', 'cm', 'Pckg']   
        //console.log("sel_retailer:", this.state.sel_retailer)
        //console.log("state.sel_user",this.state.sel_user)
        //console.log("this.state.sel_item_amount", this.state.sel_item_amount)
        //console.log("this.state.sel_item_unit", this.state.sel_item_unit)
        //console.log("this.state.sel_item_name", this.state.sel_item_name)
        //console.log("item:", this.state.item)

        return(

            <div>
                

            { 
                this.state.item && this.state.user && this.state.retailer && this.state.all_retailers_name && this.state.party_users  ? 
                <Card>
                    
                    <CardContent  >
                        {this.state.item.getName()} {this.state.item.getAmount()}  {units[this.state.item.getUnit()]} 
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
                                <TextField onChange = {(e)=> {this.setState({sel_item_amount: e.target.value })}} required id="standard-required" label="Menge" defaultValue = {this.state.item.getAmount()} />
                                <Autocomplete
                                id="combo-box-demo"
                                options={units}
                                defaultValue = {units[this.state.item.getUnit()]}
                                onInputChange = {(event, value) => this.setState({sel_item_unit: value})}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Einheit" />}/>

                                <Autocomplete
                                id="combo-box-demo"
                                options={this.getStandardListEntryPossibleRetailerNames()}
                                defaultValue = {this.state.retailer.getName()}
                                onInputChange = {(event, value) => this.setState({sel_retailer: value})}
                                //getOptionSelected	= {(option, value) => console.log("value:",value , "optionn", option)} 
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Laden" />}/>
                                
                                <Autocomplete
                                id="combo-box-demo"
                                options={this.getStandardListEntryPossibleUserNames()}
                                onInputChange = {(event, value) => this.setState({sel_user: value})}
                                defaultValue={this.state.user.getName()}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params}  label="User"  />}/>
                                
                                <Button onClick={() => this.updateItem()} size ="large" color="primary" startIcon={< CheckCircleOutlineIcon/>} />
                                <Button onClick={() => this.deleteLEntry()} size="large" color="primary" startIcon={<DeleteForeverIcon/>}/>          
                                

                            </CardContent>
                        </Card>
                    </Collapse>
                </Card> 
                : null 
            }    
            </div>
        ) 
    }
}

export default StandardListEntryCard