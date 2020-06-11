import React, { Component } from 'react';
import { Typography, Button, Grid, Divider, TextField} from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI'
import CreateGroupDialog from '../dialogs/CreateGroupDialog';
import ExitGroupDialog from '../dialogs/ExitGroupDialog';

class ManageGroup extends Component{
    constructor(props){
        super(props);

        this.state = {
            user: []
        }
    }

    componentDidMount(){
        this.getUser()
    }
    getUser = () =>{
        ShoppingAPI.getAPI().getUser().then(UserBO =>
            this.setState({
                user: UserBO
            }))
    }

    render() {
        const person = this.state.user
            return(
            <Typography variant='h6' component='h1' align='center'>
                <br margin-top = '20px'/>
                Gruppe verwalten
                <Divider/>
                <CreateGroupDialog/>
                <br margin-top = '20px'/>
                Gruppennamen ändern
                <Divider/>
                <TextField id ="outlined-basic" label = "Name ändern" variant = "outlined"/>
                <br margin-top = '20px'/>
                Gruppenmitglieder
                <Divider/>
                <ExitGroupDialog/>
            </Typography>
            )



    }
}

export default ManageGroup;