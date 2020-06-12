import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Overview from './components/pages/Overview';
import About from './components/pages/About';
import ManageGroup from "./components/pages/ManageGroup";
import ManageUser from "./components/pages/ManageUser"
import MyArticle from './components/pages/MyArticle';
import GroupShoppingList from "./components/pages/GroupShoppingList";
import ShoppingListEntry from "./components/pages/ShoppingListEntry";
import StandardList from "./components/pages/StandardList";
import StandardListEntry from "./components/pages/StandardListEntry"
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
                <Redirect from='/' to='overview' />
                <Route exact path='/overview'>
                    <Overview />
                </Route>
                <Route path='/myarticle'>
                    <MyArticle />
                </Route>
                <Route path='/managegroup'>
                    <ManageGroup />
                </Route>
                <Route path='/manageuser'>
                    <ManageUser />
                </Route>
                <Route path='/groupshoppinglist'>
                    <GroupShoppingList />
                </Route>
                <Route path='/shoppinglistentry'>
                    <ShoppingListEntry />
                </Route>
                <Route path='/standardlist'>
                    <StandardList />
                </Route>
                <Route path='/standardlistentry'>
                    <StandardListEntry />
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
