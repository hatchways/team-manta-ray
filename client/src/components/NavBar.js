import React, { useState, useContext } from "react";
import { UserDispatchContext } from "../context/UserContext";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  // Avatar,
  makeStyles,
  Box,
  Container,
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import plateLogo from "../assets/plate.svg";
import { logout } from "../actions/userActions";
import Logo from "./Logo";

const NavBar = ({ history, isBrowser }) => {
  const useStyles = makeStyles((theme) => ({
    toolBar: {
      minHeight: 75,
      padding: isBrowser ? "0px 16px" : "0px",
    },

    flexGrow: {
      flexGrow: 1,
    },
    appBar: {
      boxShadow: "0px 10px 30px 0px rgba(204, 204, 204, 0.5)",
    },
    drawerDiv: {
      width: 200,
    },
    plateIcon: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      minHeight: 60,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // reducer dispatch function
  const dispatch = useContext(UserDispatchContext);

  const drawerHandler = () => {
    setOpen(true);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    logout(dispatch);
    localStorage.removeItem("userInfo");
    history.replace("/login");
  };

  return (
    <Box color="white">
      <AppBar className={classes.appBar} color="inherit" position="fixed">
        <Container maxWidth="xl">
          <Toolbar className={classes.toolBar}>
            <Logo />
            {/* <Grid item>
                <Avatar src={userData.avatar} alt="user profile pic" />
              </Grid> */}

            <Box color="#000">
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={drawerHandler}
              >
                <DragHandleIcon fontSize="large" />
              </IconButton>
            </Box>
          </Toolbar>

          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className={classes.drawerDiv}>
              <List component="nav" aria-label="navigation">
                <ListItem divider className={classes.plateIcon}>
                  <img src={plateLogo} alt="plate icon" />
                </ListItem>
                <ListItem button component={Link} to="/profile" divider>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button divider onClick={logoutHandler}>
                  <ListItemText primary="Log Out" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Container>
      </AppBar>
    </Box>
  );
};

export default withRouter(NavBar);
