import React from "react";
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

const NotifsDrawer = ({
  notifsDrawerOpen,
  setNotifsDrawerOpen,
  classes,
  setUnreadCount,
  notifs,
  setNotifs,
}) => {
  const notificationClickHandler = (notif, index) => {
    notifs.splice(index, 1);
    setNotifsDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="right"
        open={notifsDrawerOpen}
        onClose={() => setNotifsDrawerOpen(false)}
      >
        <div className={classes.drawerDiv} style={{ width: 450 }}>
          <List component="nav" aria-label="navigation">
            <ListItem
              key="notificationsheader"
              divider
              style={{ height: 65, textAlign: "center" }}
            >
              <ListItemText
                primaryTypographyProps={{
                  style: { textTransform: "uppercase", fontSize: "25px" },
                }}
                primary="Notifications"
              />
            </ListItem>
            {notifs.length === 0 && (
              <ListItem
                key="nonotifsmessage"
                style={{ textAlign: "center", marginTop: "20px" }}
              >
                <ListItemText
                  secondaryTypographyProps={{
                    style: { fontSize: "18px" },
                  }}
                  secondary="You have no notifications."
                />
              </ListItem>
            )}
            {notifs.map((notif, index) => {
              return (
                <ListItem
                  button
                  component={Link}
                  to={notif.link}
                  divider
                  alignItems="center"
                  onClick={() => {
                    notificationClickHandler(notif, index);
                  }}
                  key={notif.id + notif.name}
                >
                  {notif.type === "message" ? (
                    <>
                      <ListItemAvatar>
                        <ListItemIcon>
                          <ChatIcon fontSize="large" />
                        </ListItemIcon>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            style={{ fontSize: "20px" }}
                            color="textPrimary"
                          >
                            {notif.name + ": "}
                            <span style={{ opacity: 0.7 }}>
                              {notif.preview}
                            </span>
                          </Typography>
                        }
                      />
                    </>
                  ) : (
                    <>
                      <ListItemAvatar>
                        <ListItemIcon>
                          <MonetizationOnIcon fontSize="large" />
                        </ListItemIcon>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            style={{ fontSize: "20px" }}
                            color="textPrimary"
                          >
                            {notif.name + " " + notif.preview}
                          </Typography>
                        }
                      />
                    </>
                  )}
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default NotifsDrawer;
