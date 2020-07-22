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


class PartyShoppingList extends Component{

    constructor(props){
        super(props)
        this.state = {
            listentries : null,
            list : null,
        }
    }

    componentDidMount(){
        this.getListEntriesByList()
        this.getListName()
        console.log("log:", this.props.match.params)

    }

    getListEntriesByList = () => {
        console.log("versuchen die List id zu loggen:", this.props.match.params)
        const {listid} =  this.props.match.params
        console.log("list?:", listid)
        ShoppingAPI.getAPI().getListEntriesByListId(listid).then(listentryBOs =>
            this.setState({  
              listentries: listentryBOs})
              )
              
    }

    getListName = () => {
        ShoppingAPI.getAPI().getListById(this.props.match.params.listid).then((mylist) => this.setState({list: mylist}))
    }
    deleteListEntryHandler = (deletedListEntry) => {
        console.log("diesen ListEntry haben wir gelöscht:", deletedListEntry.getID())
        this.setState({
            listentries: this.state.listentries.filter(listEntry => listEntry.getID() !== deletedListEntry.getID())
        })
    }

   



    render(){

        //const { classes, list } = this.props;
        const { listentries, list } = this.state;
        //console.log("aktuelle liste", this.props.match.params.listid)
        
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
                </Grid>
                <hr/>
            </div>
            {
                listentries ?
                listentries.length === 0 ? 
                 <Typography variant="h4"> {"Du hast keine Listeneinträge"} </Typography>:
                listentries.map((listentry) => <ListEntryCard  onListEntryDeleted = {this.deleteListEntryHandler} listid = {this.props.match.params} listentry = {listentry} key = {listentry.getID()}/>)
                : null
            }            
        </div>
        )
    }
}

export default PartyShoppingList