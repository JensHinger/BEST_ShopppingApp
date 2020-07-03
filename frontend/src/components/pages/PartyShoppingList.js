import React, {Component} from 'react'
import { List, Typography } from '@material-ui/core'
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import ShoppingListEntry from '../subcomponents/ListEntryCard'

class PartyShoppingList extends Component{

    constructor(props){
        super(props)

        this.state = {
            listentries : []
            
        }
    }

    componentDidMount(){
        this.getListEntriesByList()

    }

    getListEntriesByList = () => {
        console.log("hihoho")
        ShoppingAPI.getAPI().getListEntriesByListId(this.props.List.getID()).then(listentryBOs =>
            this.setState({  
              listentries: listentryBOs}),
              
              console.log(this.state))






    }

    render(){

        const { classes, list } = this.props;

        const { listentries } = this.state;

        return(
        <div >
            <List >
            {
            listentries.map(listentry => <ShoppingListEntry key={listentry.getID()} list={list} listentry={listentry}
              show={this.props.show} />)
            }

            </List>
            
        </div>
        )
    }
}

export default PartyShoppingList