import React, { Component } from 'react'
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Button, Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShoppingAPI from '../../api/ShoppingAPI'

class UserParties extends Component{

    constructor(props){
        super(props)

        this.state = {
            parties : [],
            lists : []
        }
    }

    componentDidMount() {
        this.getPartiesByUser()
        this.getListsByParty()
    }

    getListsByParty(){
        // Hier muss bei getListsByParty noch die partyID bei dem Übergabewert ergänzt werden kann Gruppenname übergeben werden als prop??
        ShoppingAPI.getAPI().getListsByParty().then(ListBOs =>
           this.setState({
               lists: ListBOs
           }))
   }

    getPartiesByUser = () => {
        // Hier muss bei getPartiesByUser noch this.props.user.getID() bei dem Übergabewert ergänzt werden
        ShoppingAPI.getAPI().getPartiesByUser().then(PartyBOs =>
            this.setState({
                parties: PartyBOs
            }))
    }
    
    render(){
        const userParties = this.state.parties
        const lists = this.state.lists
        console.log(lists)
        return(
            <div>
                {userParties.map((party) =>
                    <ExpansionPanel key={party.getID()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            {party.getName()}
                        </ExpansionPanelSummary>
                            {lists.map((list) => 
                                <ExpansionPanelDetails>
                                    <Typography>
                                        <Button>{list.getName()}</Button>
                                    </Typography>
                                </ExpansionPanelDetails>
                            )}                  
                    </ExpansionPanel> 
                )} 
            </div>  
        )
    }

}
export default UserParties