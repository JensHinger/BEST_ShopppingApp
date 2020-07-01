import React, { Component } from 'react';
import ShoppingAPI from "../../api/ShoppingAPI"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "./Navbar"
import LogOutDialog from "../dialogs/LogOutDialog"

const styles = theme => ({

  divider: {
    flexGrow: 1
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
    ShoppingAPI.getAPI().getUserById(1)
    .then(UserBO =>
      this.setState({
          currentUser: UserBO
      }))
  }

  componentWillMount(){
    this.getCurrentUser()
  }

  handleProfileMenuOpen = (event) => {
    this.setState({AnchorEL : event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({AnchorEL : null})
  };

  render(){

    const { classes } = this.props;

    const isMenuOpen = Boolean(this.state.AnchorEL);

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
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleMenuClose}><LogOutDialog></LogOutDialog></MenuItem>
      </Menu>
    );

    
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <Navbar />
            <Typography className={classes.title} variant="h6" >
              BE!ST
            </Typography>

            <div className={classes.divider}/>
            <div>
        
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Typography>
                
              </Typography>
              <IconButton
                edge="end"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      
    );
  }
}

export default withStyles(styles) (Header); 