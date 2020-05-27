import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

/**
 * Shows the about page with the impressum
 */
function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          Shoppinglist BE!ST
        </Typography>
        <br />
        <Typography>
          Database written by <Link href='https://github.com/JensHinger'>Jens Hinger</Link>
          Database written by <Link href='https://github.com/JonathanKessel'>Jonathan Kessel</Link>
        </Typography>
        <Typography>
          React Frontend written by <Link href='https://github.com/DominicHaffner'>Dominic Haffner</Link>
          React Frontend written by <Link href='https://github.com/JensHinger'>Jens Hinger</Link>
          React Frontend written by <Link href='https://github.com/JonathanKessel'>Jonathan Kessel</Link>
          React Frontend written by <Link href='https://github.com/AnnyThai'>Anny Thai</Link>
        </Typography>
        <Typography>
          Python Backend written by <Link href='https://github.com/MichaHofmann'>Michael Hofmann</Link>
          Python Backend written by <Link href='https://github.com/ReneHofmann'>Renè Hofmann</Link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien 2020, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

export default About;