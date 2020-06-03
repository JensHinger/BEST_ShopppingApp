import React,{Component} from 'react';
import MyArticle from './components/pages/MyArticle';
import Overview from './components/pages/Overview';
import About from './components/pages/About';
import CreateGroupDialog from './components/dialogs/CreateGroupDialog';
import Navbar from './components/pages/Navbar'
import Header from "./components/layout/Header"

class App extends Component {

  render(){
    return (
      <div>
        <Header  /> 
        <Overview />
        <MyArticle  />
        <CreateGroupDialog />
        <About />
        <Navbar /> 
          
      </div>
    );
  }
}

export default App;
