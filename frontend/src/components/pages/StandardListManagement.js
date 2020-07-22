import React,{Component} from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import StandardListEntryCard from'../subcomponents/StandardListEntryCard';
import {Link as RouterLink} from 'react-router-dom'
import {Button, Typography} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';

class StandardListManagement extends Component {
    constructor(props){
        super(props)

        this.state = {
            partyId : this.props.match.params.partyid,
            party : null,
            stListEntries: null,
            
        }
    }

    componentDidMount(){
        this.getStandardListEntryByParty()
        this.getParty()
        console.log("log:", this.props.match.params.partyid)

    }
    getParty = () => {
        ShoppingAPI.getAPI().getPartyById(this.state.partyId)
        .then((myParty) => this.setState({party: myParty}))
    }
    updateStandardListEntryHandler = (updatedStandardListEntry) => {
        console.log("entry zum updaten:", updatedStandardListEntry)
        var myindex = this.state.stListEntries.findIndex(element => element === updatedStandardListEntry)
        console.log("position des Elements: ", myindex)
        var stCopy = this.state.stListEntries
        console.log("die Copy vom State: ", this.state.stListEntries)
        console.log("state vor dem Splice:", this.state.stListEntries)
        stCopy.splice(myindex, 1, updatedStandardListEntry)
        this.setState({
            stListEntries : stCopy
        })
        console.log("standardlistentries nach dem hinzufügen: ", this.state.stListEntries)
    }


    getStandardListEntryByParty = () => {
        //console.log("versuchen die List id zu loggen:", this.props.match.params)
        console.log("party?:", this.state.partyId)
        ShoppingAPI.getAPI().getStandardListEntryByPartyId(this.state.partyId).then(standardListentryBOs =>
            this.setState({stListEntries : standardListentryBOs})
            )
              
    }

    deleteStandardListEntryHandler = (deletedStandardListEntry) => {
        console.log("diesen StandardListEntry haben wir gelöscht:", deletedStandardListEntry)
        this.setState({
            stListEntries: this.state.stListEntries.filter(standardListEntry => standardListEntry.getID() !== deletedStandardListEntry.getID())
        })
    } 

    render(){
        console.log(this.state.partyId)
        console.log("bos?", this.state.stListEntries)
        return(
            <div style={{width : "50%", margin : "auto"}}>
                <div>
                    <Grid container direction={'row'} >
                        { this.state.party ?
                            
                                <Typography >Lieblingseinträge der Gruppe {this.state.party.getName()}               
                                </Typography>
                                
                            
                            
                            : null
                        }
                        <Button size={"small"} variant={"outlined"} component = {RouterLink} to={`/addstandardlistentry/${this.props.match.params.partyid}`} >Eintrag hinzufügen</Button>
                    </Grid>
                </div>
                <hr/>
                {
                    this.state.stListEntries ? 
                    this.state.stListEntries.map(stListEntry => <StandardListEntryCard  onStandardListEntryDeleted = {this.deleteStandardListEntryHandler} partyId = {this.state.partyId} standardListEntry = {stListEntry} key={stListEntry.getID()}/>)
                    : null 
                }
            </div>
        )
    }


}
export default StandardListManagement;