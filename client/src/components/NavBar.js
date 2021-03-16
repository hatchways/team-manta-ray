import React, { useState, useContext } from "react";
import { UserDispatchContext } from "../context/UserContext";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  // Avatar,
  makeStyles,
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import logo from "../assets/logo.svg";
import plateLogo from "../assets/plate.svg";
import { logout } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    minHeight: 75,
    display: "grid",
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  logo: {
    height: 25,
    marginLeft: theme.spacing(2),
  },
  icon: {
    fontSize: 40,
    justifyContent: "end",
    color: "black",
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
  navBarRight: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 150,
  },
}));

const NavBar = ({ history }) => {
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
    <div>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <img src={logo} alt="logo" className={classes.logo} />
            </Grid>
            <div className={classes.navBarRight}>
              {/* <Grid item>
                <Avatar src={userData.avatar} alt="user profile pic" />
              </Grid> */}

              <Grid item>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={drawerHandler}
                >
                  <DragHandleIcon className={classes.icon} />
                </IconButton>
              </Grid>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
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
    </div>
  );
};

export default withRouter(NavBar);
