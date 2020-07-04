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

 class ListEntryCard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            listentry : props.listentry,
            listid: props.listid.listid,
            item : null, 
            user: null, 
            retailer: null,
            expanded : null,
            all_retailers:null,
            party_users: [],

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

            ShoppingAPI.getAPI().getRetailerById(this.state.listentry.getRetailerId()) 
            .then(RetailerBO =>
                this.setState({  
                retailer : RetailerBO})
                )
            
            ShoppingAPI.getAPI().getAllRetailer()
            .then(retailerBOs => 
                this.setState({
                all_retailers: retailerBOs})
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
        .then((user) => this.setState({party_users: [...this.state.party_users, user]}))    
    }
    expandHandler = () => {
        this.setState({expanded : !this.state.expanded})
    }

    render(){
        const units = ['St', 'kg', 'g', 'L', 'ml', 'm', 'cm', 'Pckg']   
        //console.log("state party users:", this.state.party_users)
       

        return(
            <div>

            { 
                this.state.item && this.state.user && this.state.retailer && this.state.all_retailers && this.state.party_users ? 
                <Card>
                    <CardContent>{this.state.item.getName()} {this.state.item.getAmount()}  {units[this.state.item.getUnit()]} 
                    {this.state.user.getName()} {this.state.retailer.getName()}
                        <IconButton  justify ="right" onClick = {() => this.expandHandler()}
                                     
                        
                        
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardContent>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Autocomplete
                    id="combo-box-demo"
                    options={this.state.all_retailers}
                    getOptionLabel={(option) => option.getName()}
                    style={{ width: 300 }}
                    renderInput={(params) =><TextField {...params} label="Laden"  />}/>
                    
                    <Autocomplete
                    id="combo-box-demo"
                    options={this.state.party_users}
                    getOptionLabel={(option) => option.getName()}
                    style={{ width: 300 }}
                    renderInput={(params) =><TextField {...params} label="User"  />}/>
                    
                    </Collapse>
                </Card> 
                : null 
            }    
            </div>
        )
        
    }





 }
export default ListEntryCard
