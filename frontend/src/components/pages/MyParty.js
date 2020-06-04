import React, { Component } from 'react';
import { Typography, Button, Grid} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';

class MyParty extends Component{
    constructor(props){
        super(props);

        this.state = {
            shoppinglists: [],
            newListField: false
        }
    }

    componentDidMount(){
        this.getListsByParty()
    }

    getListsByParty(){
         // Hier muss bei getListsByParty noch die partyID bei dem Übergabewert ergänzt werden kann Gruppenname übergeben werden als prop??
         ShoppingAPI.getAPI().getListsByParty().then(ListBOs =>
            this.setState({
                shoppinglists: ListBOs
            }))
    }

    addListHandler = () => {
        console.log("React ist toll")
    }
    
    render() {
        const userLists = this.state.shoppinglists
        console.log(this.props)
        return ( 
        <Typography variant='h3' component='h1' align='center'> 
            <Grid>
                <Button onClick={this.addListHandler()}>
                    <PlaylistAddIcon fontSize='large' color='primary'/>
                </Button>

                {userLists.map((list) =>
                    <Grid key={list.getID()}>
                        <Button 
                        font-size='40px'
                         variant='outlined'
                          color='primary'
                          component={RouterLink} to={`/mylist/${list.getID()}`}
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
