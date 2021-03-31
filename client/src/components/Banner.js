import React from "react";
import { Grid, Typography, Button, Hidden, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import banner from "../assets/banner.png";

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    color: "#fff",
    margin: theme.spacing(4, 4),
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    padding: theme.spacing(1, 4),
    borderRadius: "0",
    marginLeft: theme.spacing(3),
    textTransform: "capitalize",
  },
  txt: {
    fontWeight: "400",
    lineHeight: theme.spacing(0.3),
  },
  link: {
    textDecoration: "none",
  },
}));

const Banner = ({ signUp }) => {
  const classes = useStyles();

  const text = signUp ? "Already a member?" : "Don't have an account?";

  const btnText = signUp ? "Sign In" : "Sign Up";

  return (
    <Hidden xsDown>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.content}>
          <Hidden smDown>
            <Box color="white">
              <Typography color="inherit" className={classes.txt}>
                {text}
              </Typography>
            </Box>
          </Hidden>
          <Link to={signUp ? "/login" : "/signup"} className={classes.link}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
            >
              {btnText}
            </Button>
          </Link>
        </div>
      </Grid>
    </Hidden>
  );
};

export default Banner;
