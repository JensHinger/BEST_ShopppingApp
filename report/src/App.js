import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import Header from './components/layout/Header'
import Report from './components/pages/Report';
import { ThemeProvider } from '@material-ui/core';
import Theme from "./Theme"
import 'firebase/auth';
import SignIn from './components/pages/SignIn';
import firebase from 'firebase/app';

class App extends Component {
    constructor(props) {
      super(props);
  
      // Init an empty state
      this.state = {
        currentUser: null,
        authError: null,
      };
    }

    #firebaseConfig = {
      apiKey: "AIzaSyA_ZrGtPOWbBlpPGuEccEGNLJS0Z6hHcig",
      authDomain: "best-it-projekt.firebaseapp.com",
      databaseURL: "https://best-it-projekt.firebaseio.com",
      projectId: "best-it-projekt",
      storageBucket: "best-it-projekt.appspot.com",
      messagingSenderId: "1070546401594",
      appId: "1:1070546401594:web:7df495697aa59d4a56b803",
      measurementId: "G-DEM2QWMQDC"
    };
    /** Handled das einloggen des Users -> schreibt ihn in den State  */

	handleAuthStateChange = user => {
		if (user) {
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
				});
			}).catch(e => {
				this.setState({
					authError: e,
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

  /** 
   * Handles the sign in request of the SignIn component uses the firebase.auth() component to sign in.
	 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
	 */
	handleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	/**
	 * Lifecycle method, which is called when the component gets inserted into the browsers DOM.
	 * Initializes the firebase SDK.
	 * 
	 * @see See Googles [firebase init process](https://firebase.google.com/docs/web/setup)
	 */
	componentDidMount() {
		firebase.initializeApp(this.#firebaseConfig);
		firebase.auth().languageCode = 'de';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }
  
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div>
        <Router basename={process.env.PUBLIC_URL}>
        {	this.state.currentUser ?
        <>
        <Header/>
        <Redirect from='/' to='/report' />
              <Route exact path='/report'>
                <Report />
              </Route>
        </>
        : <>
          <Redirect to='/index.html'/>
          <SignIn onSignIn={this.handleSignIn}/>

          </>
        }
        </Router>
        </div>
      </ThemeProvider>
    )
  }
}
export default App

