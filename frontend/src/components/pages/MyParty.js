import React, { Component } from 'react';
import { Typography, Button, Grid} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'

class MyParty extends Component{
    constructor(props){
        super(props);

        this.state = {
            shoppinglists: []
        }
    }

    componentDidMount(){
        this.getListsByGroup()
    }

    getListsByGroup(){
         // Hier muss bei getListsByGroup noch die partyID bei dem Übergabewert ergänzt werden kann Gruppenname übergeben werden als prop??
         ShoppingAPI.getAPI().getListsByGroup().then(ListBOs =>
            this.setState({
                shoppinglists: ListBOs
            }))
    }
    
    render() {
        const userLists = this.state.shoppinglists
        console.log(this.props)
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
            <Grid>
                {userLists.map((list) =>
                    <Grid key={list.getID()}>
                        <Button 
                        font-size="40px"
                         variant='outlined'
                          color='primary'
                          component={RouterLink} to={`/mygroup/${list.getID()}`}
                          >
                            {list.getName()}
                        </Button>
                    </Grid>  
                )}

            </Grid>

        </Typography>
            
        )
        
    }
}
export default MyParty;
