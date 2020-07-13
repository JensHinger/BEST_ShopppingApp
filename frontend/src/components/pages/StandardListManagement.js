import React,{Component} from 'react';
import StandardListEntryBO from '../../api/StandardListEntryBO';
import ShoppingAPI from '../../api/ShoppingAPI';
import StandardListEntryCard from'../subcomponents/StandardListEntryCard';
import {Link as RouterLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';

class StandardListManagement extends Component {
    constructor(props){
        super(props)

        this.state = {
            partyId : this.props.match.params.partyid,
            stListEntries: null,
            
        }
    }

    componentDidMount(){
        this.getStandardListEntryByParty()
        console.log("log:", this.props.match.params.partyid)

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
            <div>
                <Button component = {RouterLink} to={`/addstandardlistentry/${this.props.match.params.partyid}`} >Eintrag hinzufügen</Button>
                {
                    this.state.stListEntries ? 
                    this.state.stListEntries.map(stListEntry => <StandardListEntryCard onStandardListEntryDeleted = {this.deleteStandardListEntryHandler} partyId = {this.state.partyId} standardListEntry = {stListEntry} key={stListEntry.getID()}/>)
                    : null 
                }
            </div>
        )
    }


}
export default StandardListManagement;