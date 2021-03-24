import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { StyledBadge } from "./StyledBadge";

const Messages = ({
  name,
  isOnline,
  lastMessage,
  profilePictureUrl,
  isSelected,
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
