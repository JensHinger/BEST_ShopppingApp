import React, { Component } from 'react';
import ShoppingAPI from "../../api/ShoppingAPI"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import LogOutDialog from "../Dialogs/LogOutDialog";
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';


/**
 * @author Jens, Jonathan
 */

const styles = theme => ({

  divider: {
    flexGrow: 1
  },

  title: {
    color: "white"
  }
})

class Header extends Component{

  constructor(props){
    super(props)

    this.state = {
      AnchorEL: null,
      currentUser: null
    }
  }

  //** Der aktuelle User wird gefetched */
  getCurrentUser = () => {
    ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
    .then(UserBO =>
      this.setState({
          currentUser: UserBO
      }))
  }

  //** Wird nach dem Rendering aufgerufen */
  componentDidMount(){
    this.getCurrentUser()
  }

  //** öffnen des Menüs */
  handleProfileMenuOpen = (event) => {
    this.setState({AnchorEL : event.currentTarget});
  };

  //** Schließen des Menüs im Header */
  handleMenuClose = () => {
    this.setState({AnchorEL : null})
  };

  //** User updaten  */
  handleUserUpdate = () => {
    this.getCurrentUser()
    console.log('Hallo')

  };

   handleSiteChange = () => {
    window.location.href='https://best-it-praktikum-team-5.ey.r.appspot.com/edit'
  }


  render(){

    const { classes } = this.props;

    const isMenuOpen = Boolean(this.state.AnchorEL);
    var user = this.state.currentUser

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={this.state.AnchorEL}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
         
        <MenuItem onClick={this.handleMenuClose}><LogOutDialog></LogOutDialog></MenuItem>
        <MenuItem onClick={this.handleSiteChange}>Meine Einkaufsliste</MenuItem>
      </Menu>
    );

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button component={RouterLink} to = {'/overview'}>
              <Typography  className={classes.title} variant="h6" >
                BE!ST
              </Typography>
            </Button>

            <div className={classes.divider}/>
              <IconButton
                edge="end"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      
    );
  }
}

export default withStyles(styles) (Header); 