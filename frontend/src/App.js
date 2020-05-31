import React,{Component} from 'react';
import Header from './components/layout/Header';
import MyArticle from './components/pages/MyArticle';
import Overview from './components/pages/Overview';
import About from './components/pages/About';


class App extends Component {

  render(){
    return (
      <div>
        <Header  /> 
        <Overview />
        <MyArticle  />
        <About />

      </div>
    );
  }
}

export default App;
