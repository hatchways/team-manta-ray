import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import useStyles from "./NavBar.style";
import DragHandleIcon from "@material-ui/icons/DragHandle";

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
};

const NavBar = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

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
                        <ListItemLink divider href="#">
                            <ListItemText primary="Profile" />
                        </ListItemLink>
                        <ListItemLink divider href="#">
                            <ListItemText primary="Log Out" />
                        </ListItemLink>
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default NavBar;
