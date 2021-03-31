import React from "react";

import { Box, makeStyles } from "@material-ui/core";
import logo from "../assets/logo.svg";

const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: "270px",
  },
}));

const Logo = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.flexGrow} {...props}>
      <img src={logo} alt="logo" className={classes.logo} />
    </Box>
  );
};

export default Logo;
