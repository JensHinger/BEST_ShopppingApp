import React, {Component} from 'react'
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import ListEntryCard from '../subcomponents/ListEntryCard'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import SortRetailer from '../subcomponents/SortRetailer'

/**
 * @author Jonathan, Anny und Jens
 */
class PartyShoppingList extends Component{

    constructor(props){
        super(props)
        this.state = {
            listentries : null,
            filteredEntries: null,
            list : null,
            youngestListEntry: null,
        }
    }

    componentDidMount(){
        this.getListEntriesByList()
        this.getListName()

    }

    getListEntriesByList = () => {
        const {listid} =  this.props.match.params
        ShoppingAPI.getAPI().getListEntriesByListId(listid).then(listentryBOs =>
            {return(this.findNewestListEntry(listentryBOs))})
              
    }

    findNewestListEntry = (listentryBOs) => {
            this.setState({youngestListEntry: null})
            if (listentryBOs.length !== 0){
            const youngestBO = listentryBOs.reduce((a, b) => {
                return new Date(a.creation_date) > new Date(b.creation_date) ? a : b;
              })
            this.setState({youngestListEntry: youngestBO})}
            

            var preSortEntries = listentryBOs
            preSortEntries.sort((a, b) => {
                return(
                    a.getID() - b.getID()
                )
            })
            this.setState({listentries: preSortEntries, 
                            filteredEntries: preSortEntries})
            
    }

    updateListEntryHandler = (updatedListEntry) => {
        var entries = this.state.filteredEntries
        var remainingEntries = entries.filter((entry) => entry.getID() != updatedListEntry.getID())
        ShoppingAPI.getAPI().getListEntryById(updatedListEntry.getID()).then(
            function(newEntry) {remainingEntries.push(newEntry[0])
                this.findNewestListEntry(remainingEntries)
                }.bind(this))
    }

    getListName = () => {
        ShoppingAPI.getAPI().getListById(this.props.match.params.listid).then((mylist) => this.setState({list: mylist}))
    }

    deleteListEntryHandler = (deletedListEntry) => {
        this.setState({
            listentries: this.state.listentries.filter(listEntry => listEntry.getID() !== deletedListEntry.getID())
        })
    }

   handleFilterSelected = (filteredRetailer) => {
       console.log("filteredRetailer: ", filteredRetailer)
        const filteredState =  this.state.filteredEntries.filter((listEntry) => filteredRetailer.getID() === listEntry.getRetailerId())
        console.log("filteredState: ", filteredState)
        this.setState({filteredEntries : filteredState})
   }

    handleFilterReset = () => {
        this.setState({filteredEntries: this.state.listentries})
        console.log("setzen zurück, state: ", this.state.filteredEntries)
   }


    render(){

        const { entries, filteredEntries, list, youngestListEntry } = this.state;
        console.log("FEntries laut render ", filteredEntries)
        return(
            <div style={{width : "50%", margin : "auto"}}>
            <div>
                <Grid  container direction={'row'}> 
                    { list ?
                        <div>
                            
                            <Typography  variant="h5">Einträge der Liste {list.getName()} </Typography>
                        </div>
                    : null
                    }
                    <IconButton variant ="outlined" component={RouterLink} to={`/AddListEntry/${this.props.match.params.listid}`}>
                    <PlaylistAddIcon   />
                    </IconButton>
                    <IconButton variant="outlined" component={RouterLink} to={`/addstandardlistentrytolist/${this.props.match.params.listid}`}>
                        <PlaylistAddIcon fontSize={"small"}/>
                        <FavoriteIcon />
                    </IconButton>
                    <SortRetailer onFilterSelected = {this.handleFilterSelected} onResetFilter = {this.handleFilterReset}/>
                </Grid>
                <hr/>
            </div>
            {
                filteredEntries ?
                filteredEntries.length === 0 ? 
                
                <Typography variant="h4"> {"Du hast keine Listeneinträge"} </Typography>:
                <div>
                    {youngestListEntry ?
                    <div>
                    <Typography variant="h6"> {"Eintrag mit der letzten Änderung"} </Typography>
                    <ListEntryCard  onListEntryUpdated={this.updateListEntryHandler} onListEntryDeleted = {this.deleteListEntryHandler} listid = {this.props.match.params} listentry = {youngestListEntry}/>
                    </div>
                    :null}
                <hr />
                {filteredEntries.map((listentry) => <ListEntryCard  onListEntryUpdated={this.updateListEntryHandler} onListEntryDeleted = {this.deleteListEntryHandler} listid = {this.props.match.params} listentry = {listentry} key = {listentry.getID()}/>)}
                </div>
                : null
            }            
        </div>
        )
    }
}

export default PartyShoppingList