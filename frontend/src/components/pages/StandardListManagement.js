import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import StandardListEntryCard from '../subcomponents/StandardListEntryCard';
import { Link as RouterLink } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { spacing } from '@material-ui/system';

/**
 * @author  Jonathan
 */

class StandardListManagement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //** Übergabe der props durch UserParties */
            partyId: this.props.match.params.partyid,
            party: null,
            stListEntries: null,

        }
    }
    /** Wird nach dem Rendering des Clients ausgeführt */
    componentDidMount() {
        this.getStandardListEntryByParty()
        this.getParty()


    }
    /** Fetcht die Party */
    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
            .then((myParty) => this.setState({ party: myParty }))
    }

    /** Ein StandardListEntry wird geupdatet */
    updateStandardListEntryHandler = (updatedStandardListEntry) => {
        var myindex = this.state.stListEntries.findIndex(element => element === updatedStandardListEntry)
        var stCopy = this.state.stListEntries
        stCopy.splice(myindex, 1, updatedStandardListEntry)
        this.setState({
            stListEntries: stCopy
        })
    }

    //** Einen StandardListEntry einer bestimmten Party fetchen */
    getStandardListEntryByParty = () => {
        ShoppingAPI.getAPI().getStandardListEntryByPartyId(this.state.partyId).then(standardListentryBOs =>
            this.setState({ stListEntries: standardListentryBOs })
        )

    }
    //** Handler zum Löschen eines StandardListEntrys */
    deleteStandardListEntryHandler = (deletedStandardListEntry) => {

        this.setState({
            stListEntries: this.state.stListEntries.filter(standardListEntry => standardListEntry.getID() !== deletedStandardListEntry.getID())
        })
    }

    render() {
        return (
            <div style={{ width: "50%", margin: "auto" }}>
                <div>
                    <Grid container direction={'row'} >

                        { this.state.party ?
                            
                                <Typography >Lieblingseinträge der Gruppe {this.state.party.getName()}               
                                </Typography>
                            : null
                        }
                        <IconButton size={"small"} variant={"outlined"} component = {RouterLink} to={`/addstandardlistentry/${this.props.match.params.partyid}`} >
                            <PlaylistAddIcon/>
                        </IconButton>

                    </Grid>
                </div>
                <hr />
                {

                    this.state.stListEntries ? 
                    this.state.stListEntries.length === 0 ?
                        <Typography>Du hast keine Lieblingseinträge</Typography>:
                    this.state.stListEntries.map(stListEntry => <StandardListEntryCard  onStandardListEntryDeleted = {this.deleteStandardListEntryHandler} partyId = {this.state.partyId} standardListEntry = {stListEntry} key={stListEntry.getID()}/>)
                    : null 

                }
            </div>
        )
    }


}
export default StandardListManagement;