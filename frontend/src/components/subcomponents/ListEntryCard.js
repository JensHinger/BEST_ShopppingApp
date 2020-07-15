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
import Checkbox from '@material-ui/core/Checkbox';
import ListEntryBO from '../../api/ListEntryBO'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


 class ListEntryCard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            listentry : props.listentry,
            checked : props.listentry.getchecked(),
            listid: props.listid.listid,
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
        this.getListentryInformation()
        this.getListEntryPossibleUsersInvitations()

    }


    componentWillUnmount(){
        console.log("schließe die komponente!")
        this.setLeavingCheckState()
    }

    setLeavingCheckState = () => {
        const mylistentry = this.state.listentry
        mylistentry.setchecked(this.state.checked ? 1 : 0 )
        console.log("setze den checked state entsprechend.")
        ShoppingAPI.getAPI().updateListEntry(mylistentry)
    }


    getListentryInformation = () => {
            // Informationen über die Listeneinträge  erhalten 
            // -> Item(id) -> Menge und ArtikelName, User(id), Retailer(id) 
            ShoppingAPI.getAPI().getItemById(this.state.listentry.getItemId()) 
            .then(ItemBO =>
                this.setState({  
                  item : ItemBO})
                  )
            
            ShoppingAPI.getAPI().getUserById(this.state.listentry.getUserId()) 
            .then(UserBO =>
                this.setState({  
                user : UserBO})
                )
            
            ShoppingAPI.getAPI().getRetailerById(this.state.listentry.getRetailerId()) 
            .then(RetailerBO =>
                this.setState({  
                  retailer : RetailerBO})
                )
            
            ShoppingAPI.getAPI().getAllRetailer()
            .then(retailerBOs => retailerBOs.map((retailerBO) => this.setState({all_retailers: [...this.state.all_retailers, retailerBO]}))
                )
            
        }
    
    getListEntryPossibleUsersInvitations = () => {
       ShoppingAPI.getAPI().getListById(this.state.listid)
            .then((list) => ShoppingAPI.getAPI().getPartyById(list.getPartylId())
            .then((party) => ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(party.getID())
            .then((invitations) => invitations.map((inv) => this.getListEntryPossibleUsers(inv.getTargetUserId(),
            )))))}

    getListEntryPossibleUsers = (target_user_id) => {
        ShoppingAPI.getAPI().getUserById(target_user_id)
            .then((user) => this.setState({party_users: [...this.state.party_users, user]})
            //.then(console.log("später"))
            )    
    
    }

    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        //console.log(ret_names)
        return (ret_names)
    }

    getListEntryPossibleUserNames = () => { 
        var names = this.state.party_users.map((user) => user.getName()
                      )
        return (names)
    }

    expandHandler = () => {
        this.setState({expanded : !this.state.expanded})
    }

    scoreThroughHandler = () => {
        this.setState({checked :!this.state.checked})
        if (this.state.expanded === true){
            this.setState({expanded : !this.state.expanded})}
        console.log("checked:", this.state.checked)
    }
    
    updateItem = () => {
        
        
        const myitem = this.state.item; 
        console.log(this.state.sel_item_amount)
        myitem.setName(this.state.sel_item_name ? this.state.sel_item_name : this.state.item.getName())
        myitem.setAmount(this.state.sel_item_amount ? this.state.sel_item_amount : this.state.item.getAmount())
        myitem.setUnit(this.state.units.indexOf(this.state.sel_item_unit))
        //console.log("item zum updaten:", myitem)
        ShoppingAPI.getAPI().updateItem(myitem)
        .then(ShoppingAPI.getAPI().getItemById(this.state.item.getID())
              .then(
                  (updateditem) => this.setState({item: updateditem}),
                  //console.log("itemstate:", )
                  this.updateListEntry()
              )
              
            )
    }

    updateListEntry(){
        const mylistentry = this.state.listentry 
        mylistentry.setItemId(this.state.item.getID())
        //find retailer Id corresponding to retailer ID
        mylistentry.setRetailerId(this.state.all_retailers[this.getListEntryPossibleRetailerNames().indexOf(this.state.sel_retailer)].getID())
        // find user Id corresponding to User Id
        mylistentry.setUserId(this.state.party_users[this.getListEntryPossibleUserNames().indexOf(this.state.sel_user)].getID())
        //mylistentry.setchecked(this.convertChecked())
        mylistentry.setchecked(this.state.checked ? 1 : 0 )
        console.log("mein LENTRY:", mylistentry)
        ShoppingAPI.getAPI().updateListEntry(mylistentry)
        .then(ShoppingAPI.getAPI().getUserById(this.state.listentry.getUserId()) 
                .then(UserBO =>
                    this.setState({  
                    user : UserBO})
                    ),
                
            ShoppingAPI.getAPI().getRetailerById(this.state.listentry.getRetailerId()) 
                .then(RetailerBO =>
                    this.setState({  
                    retailer : RetailerBO})
                    )
                )
    }

    matchRetailerNameToId = () => {
        const my_retailer_name = this.state.sel_retailer
        const ret_name_arr = this.getListEntryPossibleRetailerNames()
        const target_index = ret_name_arr.indexOf(this.state.sel_retailer)
        //console.log(this.state.all_retailers[target_index].getName())
    }
    

    deleteLEntry = () => {
        console.log("versuche einen Eintrag zu löschen")
        ShoppingAPI.getAPI().deleteListEntry(this.state.listentry.getID()).then(
            () => {
                this.props.onListEntryDeleted(this.state.listentry)
            }
        )

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
                    
                    <CardContent disabled = {true} style={{ textDecoration : this.state.checked ? 'line-through' : null}} >
                    <Checkbox checked={this.state.checked} onClick ={() => {this.scoreThroughHandler()}}/>
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
export default ListEntryCard
