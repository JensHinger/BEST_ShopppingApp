import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

/**
 * @author  Jonathan
 */

class SignIn extends Component {

    //** SignIn Funktion; Prop Übergabe von App.js */
    handleSignInButton = () => {
        this.props.onSignIn()
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Typography className={classes.root} align='center' variant='h6'>Willkommen in der Anwendung von Team 5</Typography>
				<Typography className={classes.root} align='center'>Es schein als wärst du nicht eingeloggt</Typography>
				<Typography className={classes.root} align='center'>Um unsere Anwendung zu nutzen melde dich doch bitte an</Typography>


                <Grid  container justify="center"> 
                            <Button variant='contained' color='primary' onClick={this.handleSignInButton}>
                                        Einloggen mit Google
                            </Button>
                </Grid>





            </div>
        )
    }
}

const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});


export default withStyles(styles)(SignIn)