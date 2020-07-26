import React from 'react'
import { makeStyles, Paper, Typography, Link } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core";
import Theme from "../../Theme";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(3),
  }
}));

/**
 * @author Anny 
 * Zeigt die About Page mit den Verantwortlichen, die Autoren und ihre Bereiche an; inklusive Verlinkung in die GitHub repositories
 */
function About() {

  const classes = useStyles();

  return (
    <ThemeProvider theme={Theme}>
      <Paper elevation={0} className={classes.root}>
        <div className={classes.content}>
          <Typography variant='h6'>
            Shoppinglist BE!ST
        </Typography>
          <br />
          <Typography>
            <h4>Database</h4>
          Database written by <Link href='https://github.com/JensHinger'>Jens Hinger</Link> <br />
          Database written by <Link href='https://github.com/JonathanKessel'>Jonathan Kessel</Link> <br />
          </Typography>
          <br />
          <Typography>
            <h4> React Frontend</h4>
          React Frontend written by <Link href='https://github.com/DominicHaffner'>Dominic Haffner</Link> <br />
          React Frontend written by <Link href='https://github.com/JensHinger'>Jens Hinger</Link> <br />
          React Frontend written by <Link href='https://github.com/JonathanKessel'>Jonathan Kessel</Link> <br />
          React Frontend written by <Link href='https://github.com/AnnyThai'>Anny Thai</Link> <br />
          </Typography>
          <br />
          <Typography>
            <h4>Python Backend </h4>
          Python Backend written by <Link href='https://github.com/MichaHofmann'>Michael Hofmann</Link> <br />
          Python Backend written by <Link href='https://github.com/ReneHofmann'>Renè Hofmann</Link>
          </Typography>

          <br />
          <Typography variant='body2'>
            © Hochschule der Medien 2020, all rights reserved.
        </Typography>
        </div>
      </Paper>
    </ThemeProvider>
  )
}

export default About;