import React, { Component } from 'react';
import ShoppingAPI from '../../api/ShoppingAPI';
import ItemBO from '../../api/ItemBO';

class ItemList extends Component {

    constructor(props) {
        super (props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        ShoppingAPI.getAPI().getAllItems().then(ItemBOs =>
                this.setState({
                    items: ItemBOs
                }))
    }

    render() {
        const items = this.state.items
        return (
            <div>
                <ol className="kek">
                    { 
                        items.map(item => (
                            <li key={item.id} align="start">
                                <p className="title">{item.creation_date}</p>
                                <p className="body">{item.name}</p>
                                <p className="body">{item.amount}</p>
                                <p className="body">{item.unit}</p>
                            </li>
                        ))
                    }
                </ol>
            </div>
        );
    }
}

export default ItemList

