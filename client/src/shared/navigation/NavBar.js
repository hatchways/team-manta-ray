import React, { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Avatar,
} from "@material-ui/core";
import useStyles from "./NavBar.style";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const NavBar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const auth = useContext(AuthContext);

    const drawerHandler = () => {
        setOpen(true);
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
                            <img
                                src="images/logo.jpg"
                                alt="logo"
                                className={classes.logo}
                            />
                        </Grid>
                        <div className={classes.navBarRight}>
                            <Grid item>
                                <Avatar
                                    src={auth.avatar}
                                    alt="user profile pic"
                                />
                            </Grid>

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
                            <img src="images/plate.svg" alt="plate icon" />
                        </ListItem>
                        <ListItem button component={Link} to="/profile" divider>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button divider onClick={auth.logout}>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default NavBar;
