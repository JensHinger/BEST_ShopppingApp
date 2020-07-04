import React, {Component} from 'react'
import { List, Typography } from '@material-ui/core'
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import ListEntryCard from '../subcomponents/ListEntryCard'

class PartyShoppingList extends Component{

    constructor(props){
        super(props)
        this.state = {
            listentries : []
        }
    }

    componentDidMount(){
        this.getListEntriesByList()
        console.log("log:",this.props.match.params)

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

    render(){

        //const { classes, list } = this.props;
        const { listentries } = this.state;
        console.log("render ausgeführt!", this.state)
        return(
        <div >
            {
                listentries ?
                listentries.map(listentry => <ListEntryCard listentry = {listentry} key = {listentry.getID()}/>)
                : null 
            }            
        </div>
        )
    }
}

export default PartyShoppingList