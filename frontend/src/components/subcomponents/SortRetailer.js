import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';

/**
 * @author Anny, Jonathan und Jens
 */

class SortRetailer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            all_retailers: [],
            sel_retailer: null,
            autocompleteFieldKey: 0,

        }
    }

    //wird nach dem rendern aufgerufen
    componentDidMount() {
        this.getAllRetailer()
    }

    //holt sich alle Retailer
    getAllRetailer = () => {
        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailer => this.setState({ all_retailers: retailer })
            )
    }

    //holt sich die Namen aller Retailer
    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        return (ret_names)
    }

    //filtert die Retailer
    filtered = () => {
        const filteredRetailer = this.state.all_retailers.filter((retailer) => retailer.getName() == this.state.sel_retailer)
        this.props.onFilterSelected(filteredRetailer[0])
    }

    //reset vom Filter
    resetFilter = () => {
        this.setState({
            autocompleteFieldKey: this.state.autocompleteFieldKey + 1,
        })
        this.props.onResetFilter()
    }

    render() {

        return (
            <div>
                <Autocomplete
                    key={this.state.autocompleteFieldKey}
                    id="combo-box-demo"
                    options={this.getListEntryPossibleRetailerNames()}
                    onInputChange={(event, value) => this.setState({ sel_retailer: value })}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Laden" />} />
                <Button onClick={this.filtered}>Filter anwenden</Button>
                <Button onClick={this.resetFilter}>Filter löschen</Button>
            </div>
        )
    }
}
export default SortRetailer