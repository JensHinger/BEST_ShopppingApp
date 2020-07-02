import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu'
import { Link as RouterLink, Router } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import {ThemeProvider} from "@material-ui/core"
import Theme from "../../Theme"
import LogOutDialog from '../dialogs/LogOutDialog'


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <ThemeProvider theme = {Theme}>
        <List> 
          <ListItem>
            <Button variant="outlined" color="primary" component={RouterLink} to={`/overview`}>Overview</Button>
          </ListItem>
          <ListItem>
              <Button variant="outlined" color="primary" component={RouterLink} to={`/myarticle`}>MyArticle</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/managegroup`}>ManageGroup</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/manageuser`}>ManageUser</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/groupshoppinglist`}>GroupShoppingList</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/shoppinglistentry`}>ShoppingListEntry</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/standardlist`}>StandardList</Button>
          </ListItem>
          <ListItem>
              <Button component={RouterLink} to={`/standardlistentry`}>StandardListEntry</Button>
          </ListItem>
          <ListItem >
              <Button component={RouterLink} to={`/about`}>About</Button>
          </ListItem>
          <Divider/>
          <ListItem>
              <LogOutDialog/>
          </ListItem>
        </List>
      </ThemeProvider>
    </div>
  );

  return (
    <div>
        <Button onClick={toggleDrawer("left", true)}>
          <MenuIcon/>
        </Button>
        <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
          {list("left")}
        </Drawer>
    </div>
  );
}