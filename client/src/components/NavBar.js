import React, { useState, useContext, useEffect, useCallback } from "react";
import { UserDispatchContext } from "../context/UserContext";
import { Link, withRouter, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Slide,
  // Avatar,
  makeStyles,
  Grid,
  Badge,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { useSocket } from "../context/SocketContext";
import NotifsDrawer from "./NotifsDrawer";
import plateLogo from "../assets/plate.svg";
import { logout } from "../actions/userActions";
import { UserContext } from "../context/UserContext";
import CartIcon from "./CartIcon";
import Logo from "./Logo";

import notificationsAPI from "../notificationsAPI";

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

const Transition = (props) => {
  return <Slide {...props} direction="left" />;
};

const NavBar = ({ history }) => {
  const classes = useStyles();
  const [navOpen, setNavOpen] = useState(false);
  const [notifsDrawerOpen, setNotifsDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const socket = useSocket();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const location = useLocation();

  console.log(location.pathname);
  console.log(typeof location.pathname);

  const handleIncomingNotification = useCallback(
    (notification) => {
      setNotifs([notification, ...notifs]);
      setUnreadCount(unreadCount + 1);
      console.log(notification.link);
      console.log(typeof notification.link);
      console.log("made it here");
      if (notification.type === "message") {
        const message = `${notification.name}: ${notification.preview}`;
        setSnackbarMessage(message);
      } else if (notification.type === "order") {
        const message = `${notification.name} ${notification.preview}`;
        setSnackbarMessage(message);
      }
      setNotifOpen(true);
    },
    [notifs, unreadCount]
  );

  useEffect(() => {
    const notifications = notificationsAPI();
    setNotifs(notifications);
    setUnreadCount(notifications.length);
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("notification", handleIncomingNotification);
    return () => socket.off("notification");
  }, [socket, handleIncomingNotification]);

  // reducer dispatch function
  const dispatch = useContext(UserDispatchContext);

  const navDrawerHandler = () => {
    setNavOpen(true);
    setNotifsDrawerOpen(false);
  };

  const notifsDrawerHandler = () => {
    setNotifsDrawerOpen(true);
    setNavOpen(false);
    setUnreadCount(0);
    setNotifOpen(false);
  };

  const logoutHandler = async (e) => {
    socket.disconnect();
    e.preventDefault();
    await logout(dispatch);
    history.replace("/login");
  };

  const testClickHandler = () => {
    socket.emit("test", "Send notification");
  };

  const notifCloseHandler = () => {
    setNotifOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={notifOpen}
        onClose={notifCloseHandler}
        TransitionComponent={Transition}
        message={snackbarMessage}
        autoHideDuration={1600}
        key="hey lol"
        style={{ marginTop: "60px", cursor: "pointer" }}
        onClick={notifsDrawerHandler}
      />
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
            <Grid item style={{ marginRight: "5px" }}>
              <IconButton
                color="inherit"
                aria-label="navbar"
                onClick={testClickHandler}
              >
                <NotificationsIcon fontSize="default" />
              </IconButton>
            </Grid>
            <Grid item style={{ marginRight: "5px" }}>
              <IconButton
                color="inherit"
                aria-label="navbar"
                onClick={notifsDrawerHandler}
              >
                <Badge badgeContent={unreadCount} color="secondary">
                  <NotificationsIcon fontSize="default" />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <CartIcon />
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
            <ListItem key="plateicon" divider className={classes.plateIcon}>
              <img src={plateLogo} alt="plate icon" />
            </ListItem>
            <ListItem
              key="profilebutton"
              button
              component={Link}
              to="/profile"
              divider
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              key="chatbutton"
              button
              component={Link}
              to="/chat"
              divider
            >
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem key="logoutbutton" button divider onClick={logoutHandler}>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <NotifsDrawer
        notifsDrawerOpen={notifsDrawerOpen}
        setNotifsDrawerOpen={setNotifsDrawerOpen}
        setUnreadCount={setUnreadCount}
        classes={classes}
        notifs={notifs}
        setNotifs={setNotifs}
      />
    </div>
  );
};

export default withRouter(NavBar);
