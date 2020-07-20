import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI';
import DisplayStandardListEntry from '../subcomponents/DisplayStandardListEntry'

class AddStandardListEntryToList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            relevantStandardListEntries: [],
            listId : this.props.match.params.listid

        }
    }

    componentDidMount(){
        this.getStandardListEntries()
    }

    getStandardListEntries = () => {
        console.log(this.state.listId)    
        ShoppingAPI.getAPI().getListById(this.state.listId).then((mylist) => 
            ShoppingAPI.getAPI().getStandardListEntryByPartyId(mylist.getPartylId())
            .then((myListEntries) => this.setState({relevantStandardListEntries: myListEntries})))
    }


    render(){
        console.log("entries für die party: ", this.state.relevantStandardListEntries)
        const relevantStandardListEntries = this.state.relevantStandardListEntries
        return(
            <div>
                { relevantStandardListEntries ?
                    relevantStandardListEntries.map((standardListEntry) => 
                    <DisplayStandardListEntry key={standardListEntry.getID()} listId={this.state.listId} standardListEntry={standardListEntry} /> ) : null
                }
            </div>


        )
    }
}
export default AddStandardListEntryToList