import React,{Component} from 'react';
import Header from './components/layout/Header';
import MyArticle from './components/pages/MyArticle';


class App extends Component {

  render(){
    return (
      <div>
        <Header  /> 
        <MyArticle  />
      </div>
    );
  }
}

export default App;
