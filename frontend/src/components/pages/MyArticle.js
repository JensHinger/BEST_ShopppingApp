import React, { Component } from 'react';
import { ShoppingAPI } from './api';

class ItemList extends Component {

    constructor(props) {
        super (props);
         this.state = {
                items: []
         };
    }


}

    getItems = () => {
        ShoppingAPI.getAPI().getItems()
            .then(ItemBOs =>
                this.setState({
                    items: ItemBOs
                })
            )
    }

    componentDidMount() {
        this.getItems();
    }

    render() {
        return (
            <div>

            </div>
        )
    }