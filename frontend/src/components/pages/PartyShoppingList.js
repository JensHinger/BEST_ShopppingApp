import React, {Component} from 'react'
import ShoppingAPI from '../../api/ShoppingAPI'
import {Link as RouterLink} from 'react-router-dom'
import ListEntryCard from '../subcomponents/ListEntryCard'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class PartyShoppingList extends Component{

    constructor(props){
        super(props)
        this.state = {
            listentries : null,
            list : props.list,
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
            <Button variant ="outlined" component={RouterLink} to={`/AddListEntry/${this.props.match.params.listid}`} >Einträge hinzufügen</Button>
            <Button variant="outlined" component={RouterLink} to={`/addstandardlistentrytolist/${this.props.match.params.listid}`}>Einen Lieblings Eintrag hinzufügen</Button>
            {
                listentries ?
                listentries.length === 0 ? 
                 <Typography variant="h4"> {"Du hast keine Listeneinträge"} </Typography>:
                listentries.map(listentry => <ListEntryCard onListEntryDeleted = {this.deleteListEntryHandler} listid = {this.props.match.params} listentry = {listentry} key = {listentry.getID()}/>)
                : null
            }            
        </div>
        )
    }
}

export default PartyShoppingList