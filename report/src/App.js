import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './components/layout/Header'
import Report from './components/pages/Report';
import { ThemeProvider } from '@material-ui/core';
import Theme from "./Theme"

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Header/>
        <>
        <Redirect from='/' to='/report' />
              <Route exact path='/report'>
                <Report />
              </Route>
        </>
        </Router>
        </div>
      </ThemeProvider>
    )
  }
}
export default App

