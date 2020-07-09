import React, {Component} from 'react'
import { List, Typography } from '@material-ui/core'
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import ListEntryCard from '../subcomponents/ListEntryCard'
import Button from '@material-ui/core/Button';

class PartyShoppingList extends Component{

    constructor(props){
        super(props)
        this.state = {
            listentries : []
        }
    }

    componentDidMount(){
        this.getListEntriesByList()
        console.log("log:", this.props.match.params)

    }

    getListEntriesByList = () => {
        //console.log("versuchen die List id zu loggen:", this.props.match.params)
        const {listid} =  this.props.match.params
        console.log("list?:", listid)
        ShoppingAPI.getAPI().getListEntriesByListId(listid).then(listentryBOs =>
            this.setState({  
              listentries: listentryBOs})
              )
              
    }

    deleteListEntryHandler = (deletedListEntry) => {
        console.log("diesen ListEntry haben wir gelöscht:", deletedListEntry.getID())
        this.setState({
            listentries: this.state.listentries.filter(listEntry => listEntry.getID() !== deletedListEntry.getID())
        })

    }


    render(){

        //const { classes, list } = this.props;
        const { listentries } = this.state;
        //console.log("aktuelle liste", this.props.match.params.listid)
        
        return(
        <div >
            <Button component={RouterLink} to={`/AddListEntry/${this.props.match.params.listid}`} >Eintrag hinzufügen</Button>
            {
                listentries ?
                listentries.map(listentry => <ListEntryCard onListEntryDeleted = {this.deleteListEntryHandler} listid = {this.props.match.params} listentry = {listentry} key = {listentry.getID()}/>)
                : null 
            }            
        </div>
        )
    }
}

export default PartyShoppingList