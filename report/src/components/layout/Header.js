import React, { Component } from 'react';
import ShoppingAPI from "../../api/ShoppingAPI";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


const styles = theme => ({

    divider: {
        flexGrow: 1
    },

    title: {
        color: "white"
    }
})


class Header extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          AnchorEL: null,
          currentUser: null
        }
      }

    render() {
        const { classes } = this.props;

        return (
            <div>
        <AppBar position="static">
          <Toolbar>
           
            
              <Typography  variant="h6" >
                BE!ST
              </Typography>
            

           
            <div>
        
              
              {/*
                user ?
              
                <Typography>
                  user: {user.getName()}
                </Typography>
                : null
              */}
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
        
      </div>
        )
    }

}
export default Header