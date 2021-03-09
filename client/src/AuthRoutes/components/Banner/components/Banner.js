import React from 'react'
import { Grid, Typography, Button, Hidden} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from '../styles/Banner.style';


const Banner = ({signUp}) => {
  const classes = useStyles();

  const text = signUp ? "Already member?" : "Don't have an account?";

  const btnText = signUp ? "Sign In" : 'Sign UP';
  
  return (
    <Hidden xsDown>
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
          <div className={classes.content}>
            <Hidden smDown>
              <Typography  className={classes.txt}>
              {text}
              </Typography>
            </Hidden>
            <Link to={signUp ? '/login' : '/signup'} className={classes.link}>
              <Button variant="contained"  color="secondary" className={classes.btn}>
              {btnText}
              </Button>
            </Link>
          </div>
      </Grid>
    </Hidden>
  )
}

export default Banner
