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
import LogOutDialog from "../dialogs/LogOutDialog"
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InvitationNotification from '../subcomponents/InvitationNotifications'
import firebase from 'firebase/app';
import 'firebase/auth';

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

  getCurrentUser = () => {
    ShoppingAPI.getAPI().getUserByGoogleId(firebase.auth().currentUser.uid)
    .then(UserBO =>
      this.setState({
          currentUser: UserBO
      }))
  }

  componentDidMount(){
    this.getCurrentUser()
  }

  handleProfileMenuOpen = (event) => {
    this.setState({AnchorEL : event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({AnchorEL : null})
  };

  handleUserUpdate = () => {
    this.getCurrentUser()
    console.log('Hallo')

  };

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
         {user? <MenuItem onClick={this.handleMenuClose}  component={RouterLink} to={`/manageuser/`} /*onUserUpdated = {this.handleUserUpdate}*/>My account </MenuItem> :null}
        <MenuItem onClick={this.handleMenuClose}><LogOutDialog></LogOutDialog></MenuItem> 
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
  
              {
                user ?
                <div>
                  <InvitationNotification user = {user}/>
                </div>
                : null
              }
              <IconButton
                edge="end"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
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