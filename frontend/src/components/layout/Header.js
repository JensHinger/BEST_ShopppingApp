import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

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
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          BE!ST /n
          Don't be stressed, shop with BE!ST.
        </Typography>
        <Typography variant='h4' component='h2' align='center'>
          Client Advisor Home
        </Typography>
        {
          user ?
          //bezeichnungen ändern{`/`}
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Create Group ' component={RouterLink} to={`/createGroup`} />
              <Tab label='Group' component={RouterLink} to={`/group`} />
              <Tab label='Report' component={RouterLink} to={`/report`} />
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            : null
        }
      </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;