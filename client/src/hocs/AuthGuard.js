import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";

import { UserContext } from "../context/UserContext";

import { Box, makeStyles } from "@material-ui/core";

const AuthGuard = (ComposedComponent) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: "75px",
    },
  }));

  const WithData = (props) => {
    const classes = useStyles();

    // data from context
    const { userInfo } = useContext(UserContext);

    // check if userInfo is present (user logged in)
    useEffect(() => {
      if (userInfo) {
        if (userInfo.isChef) {
          props.history.push("/chefprofile");
        } else {
          props.history.push("/profile");
        }
      } else {
        props.history.push("/");
      }
    }, [userInfo, props.history]);

    return (
      <Box className={classes.container}>
        <NavBar />
        <ComposedComponent {...props} />
      </Box>
    );
  };
  return WithData;
};

export default AuthGuard;
