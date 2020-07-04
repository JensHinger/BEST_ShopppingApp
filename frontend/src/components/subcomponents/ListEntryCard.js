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
            all_retailers_name: [],
            party_users: [],
            party_user_names: []

        }
    }
    
    componentDidMount(){
        this.getListentryInformation()
        this.getListEntryPossibleUsersInvitations()

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
            .then(retailerBOs => retailerBOs.map((retailerBO) => this.setState({all_retailers_name: [...this.state.all_retailers_name, retailerBO.getName()]}))
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
        console.log("checked:", this.state.checked)
    }
    
    updateLEntry = () => {
        console.log("update")
    }

    deleteLEntry = () => {
        console.log("versuche einen Eintrag zu löschen")
        ShoppingAPI.getAPI().deleteListEntry(this.state.listentry.getID())

    }
    
    render(){
        const units = ['St', 'kg', 'g', 'L', 'ml', 'm', 'cm', 'Pckg']   
        //console.log("checked?:", this.state.checked)
       

        return(

            <div>
                <Checkbox checked={this.state.checked} onClick ={() => {this.scoreThroughHandler()}}/>

            { 
                this.state.item && this.state.user && this.state.retailer && this.state.all_retailers_name && this.state.party_users  ? 
                <Card>
                    
                    <CardContent disabled = {true} style={{ textDecoration : this.state.checked ? 'line-through' : null}} >{this.state.item.getName()} {this.state.item.getAmount()}  {units[this.state.item.getUnit()]} 
                    {this.state.user.getName()} {this.state.retailer.getName()} 
                        <IconButton  disabled = {this.state.checked ? true : false} justify ="right" onClick = {() => {this.expandHandler()}}
                                     
                        
                        
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardContent>
                    <Collapse in={this.state.expanded } timeout="auto" unmountOnExit>
                        <Card>
                            <CardContent>
                                <TextField required id="standard-required" label="Name" defaultValue = {this.state.item.getName()} />
                                <TextField required id="standard-required" label="Menge" defaultValue = {this.state.item.getAmount()} />
                                <Autocomplete
                                id="combo-box-demo"
                                options={units}
                                defaultValue = {units[this.state.item.getUnit()]}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Einheit" />}/>

                                <Autocomplete
                                id="combo-box-demo"
                                options={this.state.all_retailers_name}
                                defaultValue = {this.state.retailer.getName()}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="Laden" />}/>
                                
                                <Autocomplete
                                id="combo-box-demo"
                                options={this.getListEntryPossibleUserNames()}
                                defaultValue={this.state.user.getName()}
                                style={{ width: 300 }}
                                renderInput={(params) =><TextField {...params} label="User"  />}/>
        
                                <Button onClick={() => this.updateLEntry()} size ="large" color="primary" startIcon={< CheckCircleOutlineIcon/>} />
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
