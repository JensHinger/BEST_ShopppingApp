import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ShoppingAPI from '../../api/ShoppingAPI';

class SortRetailer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            all_retailers: [],
            sel_retailer: null, 


        }
    }

    componentDidMount() {
        this.getAllRetailer()
    }
    getAllRetailer = () => {
        ShoppingAPI.getAPI().getAllRetailer()
            .then(retailer => this.setState({ all_retailers: retailer })
            )
    }
    getListEntryPossibleRetailerNames = () => {
        var ret_names = this.state.all_retailers.map((retailer) => retailer.getName()
        )
        //console.log(ret_names)
        return (ret_names)
    }

    

    render() {
        //const retailer = this.getAllRetailer()
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.getListEntryPossibleRetailerNames()}
                    onInputChange={(event, value) => this.setState({ sel_retailer: value })}
                    //getOptionSelected	= {(option, value) => console.log("value:",value , "optionn", option)} 
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Laden" />} />
                <Button >Filter anwenden</Button>
            </div>
        )
    }
}
export default SortRetailer
