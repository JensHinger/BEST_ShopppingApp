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


 class ListEntryCard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            listentry : props.listentry,
            item : null, 
            user: null, 
            retailer: null,
            expanded : null,
            all_retailer:null,

        }
    }
    
    componentDidMount(){
        this.getListentryInformation()
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
        }
    
    expandHandler = () => {
        this.setState({expanded : !this.state.expanded})
    }

    render(){
        const units = ['St', 'kg', 'g', 'L', 'ml', 'm', 'cm', 'Pckg']   
        console.log(this.state.expanded)
        return(
            <div>

            { 
                this.state.item && this.state.user && this.state.retailer ? 
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
                    options={retailer}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300 }}
                    renderInput={(params) =><TextField {...params} label="Laden"  />}/>
                    
                    
                    </Collapse>
                </Card> 
                : null 
            }    
            </div>
        )
        
    }





}
export default ListEntryCard
