import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import ShoppingAPI from '../../api/ShoppingAPI';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ListEntryBO from '../../api/ListEntryBO'

/**
 * @author Jonathan
 */

class DisplayStandardListEntry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            standardListEntry: this.props.standardListEntry,
            listId: this.props.listId,
            item: null,
            retailer: null,
            user: null,
            showDone: false,
        }
    }

    //wird nach dem rendern aufgerufen
    componentDidMount() {
        this.getItem()
    }

    //das Item wird hier geholt
    getItem = () => {
        ShoppingAPI.getAPI().getItemById(this.state.standardListEntry.getItemId())
            .then((myItem) => this.setState({ item: myItem }))

        ShoppingAPI.getAPI().getUserById(this.state.standardListEntry.getUserId())
            .then((UserBO) =>
                this.setState({
                    user: UserBO
                })
            )

        ShoppingAPI.getAPI().getRetailerById(this.state.standardListEntry.getRetailerId())
            .then(RetailerBO =>
                this.setState({
                    retailer: RetailerBO
                })
            )
    }

    //Standardlistentry werden zu dem Listentry hinzugefügt
    addStandardListEntryToListFunc = () => {
        var myListEntry = new ListEntryBO()
        myListEntry.setListId(this.state.listId)
        myListEntry.setItemId(this.state.standardListEntry.getItemId())
        myListEntry.setRetailerId(this.state.standardListEntry.getRetailerId())
        myListEntry.setUserId(this.state.standardListEntry.getUserId())
        myListEntry.setAmount(this.state.standardListEntry.getAmount())
        myListEntry.setUnit(this.state.standardListEntry.getUnit())
        myListEntry.setName("Wir sind die besten!")
        ShoppingAPI.getAPI().addListEntry(myListEntry).then(() =>
            this.setState({ showDone: true })
        )


    }

    render() {
        const units = ['St ', 'kg ', 'g ', 'L ', 'ml ', 'm ', 'cm ', 'Pckg ']
        const standardListEntry = this.state.standardListEntry
        const item = this.state.item
        const retailer = this.state.retailer
        const user = this.state.user
        const showDone = this.state.showDone
        return (
            <div> {standardListEntry && item && retailer && user ?
                <Card>
                    <CardContent>
                        {item.getName()} {standardListEntry.getAmount()} {units[standardListEntry.getUnit()]}
                        {retailer.getName()} {user.getName()}
                        <IconButton onClick={() => this.addStandardListEntryToListFunc()}>
                            <AddIcon />
                        </IconButton>
                        {this.state.showDone ?
                            <DoneIcon color={"success"} />
                            : null}

                    </CardContent>
                </Card>
                : null
            }
            </div>


        )
    }
}
export default DisplayStandardListEntry