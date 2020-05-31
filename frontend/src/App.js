import React,{Component} from 'react';
import Header from './components/layout/Header';
import MyArticle from './components/pages/MyArticle';
import Overview from './components/pages/Overview';
import CreateGroupDialog from './components/dialogs/CreateGroupDialog';

class App extends Component {

  render(){
    return (
      <div>
        <Header  /> 
        <Overview />
        <MyArticle  />
        <CreateGroupDialog />
      </div>
    );
  }
}

export default App;
