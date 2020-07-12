import React,{Component} from 'react';
import StandardListEntryBO from '../../api/StandardListEntryBO';
import ShoppingAPI from '../../api/ShoppingAPI'

class StandardListManagement extends Component {
    constructor(props){
        super(props)

        this.state = {
            listid : this.props.match.params.listid,
            stlistentries: [],
            
        }
    }

    componentDidMount(){
        this.getStandardListEntriesByList()
        console.log("log:", this.props.match.params)

    }
    
    getStandardListEntriesByList = () => {
        //console.log("versuchen die List id zu loggen:", this.props.match.params)
        console.log("list?:", this.state.listid)
        ShoppingAPI.getAPI().getStandardListEntriesByList(this.state.listid).then(standardListentryBOs =>
            this.setState({  
              stListEntries: standardListentryBOs})
              )
              
    }

    render(){
        console.log(this.state.listid)
        console.log("stentries", this.state.stlistentries)
        return(
            <div>hallo</div>

        )
    }


}
export default StandardListManagement;