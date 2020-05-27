import React, { Component } from 'react';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';


class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const {user} = this.props;

    return (
      <Paper variant='outlined' >
        <Typography variant='h3' component='h1' align='center'>
          BE!ST /n
          Don't be stressed, shop with BE!ST.
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Client Advisor Home
        </Typography>
        }
      </Paper>
    )
  }
}

export default Header;