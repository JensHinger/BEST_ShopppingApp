import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';

class ItemList extends Component {

    constructor(props) {
        super (props);
        this.state = {
            items: this.getItems()
        };
    }

    getItems = () => {
        ShoppingAPI.getAPI().getAllItems()
            .then(ItemBOs =>
                this.setState({
                    items: ItemBOs
                }), 
            )
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ItemList

