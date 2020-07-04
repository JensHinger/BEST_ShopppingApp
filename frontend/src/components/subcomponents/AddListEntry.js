import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Button, TextField, Typography, Divider, Grid} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';


 class ArticleAmountUnit extends Component {

  constructor(props){
    super(props);

    this.state = {

        article: "",
        amount: 0,
        unit: 0,
        retailer: [],
        users: [],
        
    }

    

  }
    componentDidMount(){
        this.getAllRetailer()
        this.getAcceptedInvitationsByParty()
    }
    handleAmountChange (value) {
        this.setState({amount:value})
        console.log(this.state.amount)
    };
   
    handleUnitChange (value) {
        this.setState({unit:value})
    };

    getAllRetailer(){
        ShoppingAPI.getAPI().getAllRetailer()
        .then(retailer => this.setState({retailer: retailer}))
    } 

    getAcceptedInvitationsByParty(){
        ShoppingAPI.getAPI().getAcceptedInvitationsByPartyId(2)
        .then(invitations => this.getUserById(invitations))
    }

    getUserById = (invitations) => {
        invitations.forEach(invitation => {
            ShoppingAPI.getAPI().getUserById(invitation.getTargetUserId())
            .then(function(user){ 
                this.setState({
                 users: [...this.state.users, user]
            })
         }.bind(this))
        });
     }

    /*createNewListEntry(){
        //hier fehlt noch die Prop Übergabe
        ShoppingAPI.getAPI().addListEntry(this.props.list.getID())
    }*/
    

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
        const user = this.state.users
        console.log(retailer)
        console.log(user)

        return (
            <div>
                <Typography variant='h6' component='h1' align='center'>

                    <br margin-top = '20px'/>

                    Eintrag hinzufügen

                    <Divider/>

                    <div>
                    <br margin-top = '20px'/>
                    <Grid container justify ="center">
                    {user?
                        <Autocomplete
                        id="combo-box-demo"
                        options={user}
                        getOptionLabel={(option) => option.getName()}
                        style={{ width: 300 }}
                        renderInput={(params) =><TextField {...params} label="Person"  />}/>
                    :null}
                    </Grid>
                    </div>


                    <div>
                    <br margin-top = '20px'/>
                    <Grid container justify ="center">
                    {retailer?
                        <Autocomplete
                        id="combo-box-demo"
                        options={retailer}
                        getOptionLabel={(option) => option.getName()}
                        style={{ width: 300 }}
                        renderInput={(params) =><TextField {...params} label="Laden"  />}/>
                    :null}
                    </Grid>
                    </div>
                    

                    <div>
                    <Grid container justify = "center" spacing = {2}>
                    <Grid xs>
                        <br margin-top = '20px'/>
                        <TextField
                        label="Artikel"
                        helperText="Geben Sie einen Artikel ein"
                        onChange = {(event) => this.handleAmountChange(event.target.value)}/>
                    </Grid>

                    <Grid xs>
                        <br margin-top = '20px'/>
                        <TextField
                        label="Menge"
                        helperText="Geben Sie eine Menge an"
                        onChange = {(event) => this.handleAmountChange(event.target.value)}/>
                    </Grid>


                    
                    <Grid xs>
                        <br margin-top = '20px'/>
                        <TextField
                        id="standard-select-currency"
                        select
                        label="Select"
                        
                        onChange = {(event) => this.handleUnitChange(event.target.value)}
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
                    <br margin-top = '20px'/>
                    <Grid container 
                    direction= "row"
                    justify = "center">
                        
                        
                        <br margin-top = '20px'/>
                        <Button onClick = {} variant = "contained" color = "primary"> fertig </Button>
                       
                        <br margin-top = '20px'/>
                        <Button  variant = "contained" color = "secondary"> abbrechen </Button>
                        
                       
                        
                    </Grid>
                    </div>
                    
                </Typography>
                
            </div>
        )
    }
}

export default ArticleAmountUnit

