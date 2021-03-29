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
  Grid,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DragHandleIcon from "@material-ui/icons/DragHandle";

import NotifsDrawer from "./NotifsDrawer";

import plateLogo from "../assets/plate.svg";
import { logout } from "../actions/userActions";
import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    minHeight: 75,
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

const NavBar = ({ history }) => {
  const classes = useStyles();
  const [navOpen, setNavOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // reducer dispatch function
  const dispatch = useContext(UserDispatchContext);

  const navDrawerHandler = () => {
    setNavOpen(true);
    if (notifsOpen) {
      setNotifsOpen(false);
    }
  };

  const notifsDrawerHandler = () => {
    setNotifsOpen(true);
    if (navOpen) {
      setNavOpen(false);
    }
    setUnreadCount(0);
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    await logout(dispatch);
    history.replace("/login");
  };

  return (
    <div>
      <AppBar className={classes.appBar} color="inherit" position="fixed">
        <Toolbar className={classes.toolBar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Logo />
            {/* <Grid item>
                <Avatar src={userData.avatar} alt="user profile pic" />
              </Grid> */}
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="navbar"
                onClick={notifsDrawerHandler}
              >
                <Badge badgeContent={unreadCount} color="secondary">
                  <NotificationsIcon fontSize="medium" />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={navDrawerHandler}
              >
                <DragHandleIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={navOpen}
        onClose={() => setNavOpen(false)}
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
      <NotifsDrawer
        notifsOpen={notifsOpen}
        setNotifsOpen={setNotifsOpen}
        setUnreadCount={setUnreadCount}
        classes={classes}
      />
    </div>
  );
};

export default withRouter(NavBar);
