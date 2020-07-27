import React, { Component } from 'react'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListIcon from '@material-ui/icons/List';
import AddListDialog from '../dialogs/AddListDialog';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateListDialog from '../dialogs/UpdateListDialog';
import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * @author Michael, René, Jens und Anny
 */

class UserParties extends Component {

    constructor(props) {
        super(props)

        this.state = {

            user: null,
            parties: [],
            lists: [],
            expanded: true

        }
    }
    //** Wird auf Client und Server vor dem Rendering einmalig aufgerufen */
    componentWillMount() {
        this.getCurrUser()
    }


    //** Die Funktion holt uns den eingeloggten User und dessen Partys  */
    getCurrUser = () => {

        ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
            .then((returnedUser) => {
                return (this.setState({ user: returnedUser }),
                    this.getPartiesByUser())
            }

            )
    }

    //** Alle Listen einer bestimmten Party */
    getListsByParty = (party_id) => {
        ShoppingAPI.getAPI().getListsByPartyId(party_id)
            .then(function (list) {
                this.setState({ lists: list });
                this.setState({ expanded: this.state.expanded !== party_id ? party_id : false })
            }.bind(this)
            )
    }
    //** Alle Parties eines Users */
    getPartiesByUser = () => {

        ShoppingAPI.getAPI().getAcceptedInvitationsByTargetUserId(this.state.user.getID())
            .then(invitations => this.getPartyByInvitations(invitations))

    }
    
    //** Für jede Invitation die Party herausfiltern */r
    getPartyByInvitations = (invitations) => {
        invitations.forEach(invitation => {
            ShoppingAPI.getAPI().getPartyById(invitation.getPartyiId())
                .then(function (party) {
                    this.setState({
                        parties: [...this.state.parties, party]
                    })
                }.bind(this))
        });
    }
    //** Löschen einer Liste */
    deleteList = (listId) => {
        ShoppingAPI.getAPI().deleteList(listId)
            .then(this.setState({
                lists: this.state.lists.filter(list => list.getID() !== listId)
            }
            ))

    }
    //** Das neue (geupdatete) Listenobjekt wird in der Liste ersetzt */
    replaceNewList = (list) => {

        var Liste = this.state.lists

        var TargetList = Liste.filter(singleList => singleList.getID() === list.getID())

        Liste[Liste.indexOf(TargetList)] = list

        this.setState({ lists: Liste })

    }



    render() {
        const userParties = this.state.parties
        const lists = this.state.lists
        return (

            <div>
                {userParties.map((party) =>
                    <ExpansionPanel style={{ width: "50%", margin: "auto" }} expanded={this.state.expanded === party.getID()} onChange={() => this.getListsByParty(party.getID())} key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >

                            {party.getName()}
                            <AddListDialog partyId={party.getID()} getListsByParty={this.getListsByParty} ></AddListDialog>
                            <IconButton component={RouterLink} to={`/standardlistmanagement/${party.getID()}`}>
                                <FavoriteIcon />
                                <ListIcon />
                            </IconButton>
                            <div style={{ alignSelf: "right" }}>
                                <IconButton component={RouterLink} to={`/manageparty/${party.getID()}`} >
                                    <EditIcon />
                                </IconButton>
                            </div>
                        </ExpansionPanelSummary>
                        
                        {lists.length === 0 ?   
                            <Typography variant="h4"> In dieser Party gibt es keine Listen!</Typography>
                        
                        :
                        lists.map((list) =>

                            <ExpansionPanelDetails key={list.getID()}>

                                <Button component={RouterLink} to={`/partyshoppinglist/${list.getID()}`} > {list.getName()} </Button>
                                <UpdateListDialog list={list} replaceNewList={this.replaceNewList}></UpdateListDialog>
                                <IconButton onClick={() => this.deleteList(list.getID())}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            </ExpansionPanelDetails>
                        )}
                    </ExpansionPanel>
                )}
            </div>
        )
    }
}
export default UserParties