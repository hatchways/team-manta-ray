import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Badge,
} from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core/styles";

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

const Messages = ({
  name,
  isOnline,
  lastMessage,
  profilePictureUrl,
  isSelected,
  i,
  handleSelectedMessageItem,
  chat,
}) => {
  const useStyles = makeStyles((theme) => ({
    messageItem: {
      paddingTop: "13px",
      paddingBottom: "13px",
    },
  }));

  const classes = useStyles();

  return (
    <ListItem
      divider
      selected={isSelected}
      button
      onClick={() => handleSelectedMessageItem(chat)}
      className={classes.messageItem}
    >
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
            <Avatar alt="dp" src={profilePictureUrl} />
          </StyledBadge>
        ) : (
          <Avatar alt="dp" src={profilePictureUrl} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Typography variant="body2" noWrap>
            {lastMessage}
          </Typography>
        }
      ></ListItemText>
    </ListItem>
  );
};

export default Messages;
