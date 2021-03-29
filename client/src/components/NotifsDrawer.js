import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemAvatar,
  ListItemIcon,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Link } from "react-router-dom";
import notificationsAPI from "../notificationsAPI";

const NotifsDrawer = ({
  notifsOpen,
  setNotifsOpen,
  classes,
  setUnreadCount,
}) => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    setNotifs(notificationsAPI());
  }, []);

  useEffect(() => {
    setUnreadCount(notifs.length);
  }, [notifs]);

  const notificationClickHandler = (notif) => {
    notifs.splice(
      notifs.findIndex((n) => n._id === notif._id),
      1
    );
    setNotifsOpen(false);
  };

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={notifsOpen}
      onClose={() => setNotifsOpen(false)}
    >
      <div className={classes.drawerDiv} style={{ width: 350 }}>
        <List component="nav" aria-label="navigation">
          <ListItem divider style={{ height: 65, textAlign: "center" }}>
            <ListItemText primary="NOTIFICATIONS" />
          </ListItem>
          {notifs.length === 0 && (
            <ListItem style={{ textAlign: "center", marginTop: "20px" }}>
              <ListItemText secondary="You have no notifications." />
            </ListItem>
          )}
          {notifs.map((notif) => {
            if (notif.type === "message") {
              return (
                <ListItem
                  button
                  component={Link}
                  to={notif.link}
                  divider
                  alignItems="center"
                  onClick={() => {
                    notificationClickHandler(notif);
                  }}
                >
                  <ListItemAvatar>
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{ fontSize: "11px" }}
                        color="textPrimary"
                      >
                        {notif.name + ": "}
                        <span style={{ opacity: 0.7 }}>{notif.preview}</span>
                      </Typography>
                    }
                  />
                </ListItem>
              );
            } else if (notif.type === "order") {
              return (
                <ListItem
                  button
                  component={Link}
                  to={notif.link}
                  divider
                  alignItems="center"
                  onClick={() => {
                    notificationClickHandler(notif);
                  }}
                >
                  <ListItemAvatar>
                    <ListItemIcon>
                      <MonetizationOnIcon />
                    </ListItemIcon>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{ fontSize: "11px" }}
                        color="textPrimary"
                      >
                        {notif.name + " " + notif.preview}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            }
          })}
        </List>
      </div>
    </Drawer>
  );
};

export default NotifsDrawer;
