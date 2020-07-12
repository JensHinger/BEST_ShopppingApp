import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Overview from './components/pages/Overview';
import About from './components/pages/About';
import ManageParty from "./components/pages/ManageParty";
import ManageUser from "./components/pages/ManageUser"
import MyArticle from './components/pages/MyArticle';
import PartyShoppingList from "./components/pages/PartyShoppingList";
import AddListEntry from "./components/subcomponents/AddListEntry";
import StandardListManagement from "./components/pages/StandardListManagement";
import Header from "./components/layout/Header";
import { ThemeProvider } from '@material-ui/core';
import Theme from "./Theme"

class App extends Component {

  render(){
    return (
      <ThemeProvider theme = {Theme}>
        <div>
        
            <Router basename={process.env.PUBLIC_URL}>
              <Header />
              <>
                <Redirect from='/' to='/overview' />
                <Route exact path='/overview'>
                    <Overview />
                </Route>
                <Route path='/myarticle'>
                    <MyArticle />
                </Route>
                <Route path={'/manageparty/:partyid'} component={ManageParty}>
                  
                </Route>
                <Route path={'/manageuser/:userid'} component={ManageUser}>
                    
                </Route>
                <Route path={`/partyshoppinglist/:listid`} component={PartyShoppingList}>
                    
                </Route>
                <Route path={'/AddListEntry/:listid'} component={AddListEntry}>
                  
                </Route>
                
                <Route path='/standardlistmanagement/:listid' component= {StandardListManagement}>
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
              </>  
            </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
