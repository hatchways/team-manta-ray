import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  Badge,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const MessageTitle = ({ isOnline, profilePictureUrl, name, location }) => {
  const useStyles = makeStyles((theme) => ({
    messageItem: {
      paddingTop: "13px",
      paddingBottom: "13px",
      height: "101px",
    },

    avatar: {
      width: "75px",
      height: "75px",
    },
    messageTitleName: {
      marginLeft: "15px",
    },
  }));

  const classes = useStyles();

  return (
    <ListItem className={classes.messageItem}>
      <ListItemAvatar>
        {isOnline ? (
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt="dp"
              src={profilePictureUrl}
              className={classes.avatar}
            />
          </StyledBadge>
        ) : (
          <Avatar alt="dp" src={profilePictureUrl} className={classes.avatar} />
        )}
      </ListItemAvatar>
      <ListItemText
        className={classes.messageTitleName}
        primary={name}
        secondary={
          <Typography variant="body2" noWrap>
            {location}
          </Typography>
        }
      ></ListItemText>
    </ListItem>
  );
};

export default MessageTitle;
