import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI';
import DisplayStandardListEntry from '../subcomponents/DisplayStandardListEntry'
import { Link as RouterLink } from 'react-router-dom'
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

/**
 * @author Jonathan
 */

class AddStandardListEntryToList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            relevantStandardListEntries: [],
            listId: this.props.match.params.listid,
            party: null

        }
    }

    // Wird auf dem Client nach dem Rendering einmal aufgerufen
    componentDidMount() {
        this.getStandardListEntries()
    }
    
    //holt sich die Standardlisteneinträge
    getStandardListEntries = () => {
        ShoppingAPI.getAPI().getListById(this.state.listId).then((mylist) =>
            ShoppingAPI.getAPI().getPartyById(mylist.getPartylId()).then((myparty) => {
                return (
                    this.setState({ party: myparty }),
                    ShoppingAPI.getAPI().getStandardListEntryByPartyId(myparty.getID())
                        .then((myListEntries) => this.setState({ relevantStandardListEntries: myListEntries })))
            }))
    }



    render() {
        const relevantStandardListEntries = this.state.relevantStandardListEntries
        const party = this.state.party
        return (

            <div style={{ width: "50%", margin: "auto" }}>
                <Grid container direction={'row'}>

                    <IconButton variant="outlined" component={RouterLink} to={`/partyshoppinglist/${this.state.listId}`}>
                        <ArrowLeftIcon />
                        <ListIcon />
                    </IconButton>

                    {party ?
                        <Typography variant="h6">Lieblingseinträge der Gruppe {party.getName()} </Typography>
                        : null
                    }

                </Grid>
                <hr />
                {relevantStandardListEntries ?
                    relevantStandardListEntries.map((standardListEntry) =>
                        <DisplayStandardListEntry key={standardListEntry.getID()} listId={this.state.listId} standardListEntry={standardListEntry} />) : null
                }

            </div>


        )
    }
}
export default AddStandardListEntryToList