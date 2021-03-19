import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";

import { UserContext } from "../context/UserContext";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Box, useMediaQuery } from "@material-ui/core";

const AuthGuard = (ComposedComponent) => {
  const WithDataComponent = (props) => {
    const theme = useTheme();

    const isBrowser = useMediaQuery(theme.breakpoints.up("md"));

    const useStyles = makeStyles((theme) => ({
      container: {
        // this is the height of the NavBar, adjust or remove this if you change the navbar height or position
        marginTop: "75px",
      },
    }));

    const classes = useStyles();

    // data from context
    const { userInfo } = useContext(UserContext);

    // check if userInfo is present (user logged in)
    useEffect(() => {
      const redirect = props.history.push;

      const pathName = props.history.location.history;

      if (userInfo) return redirect(pathName);

      redirect("/");
    }, [userInfo, props.history]);

    return (
      <Box className={classes.container}>
        <NavBar isBrowser={isBrowser} />
        <ComposedComponent isBrowser={isBrowser} {...props} />
      </Box>
    );
  };
  return WithDataComponent;
};

export default AuthGuard;
