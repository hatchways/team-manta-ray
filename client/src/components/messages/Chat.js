import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Chat = ({ profilePictureUrl, body, isOwner }) => {
  const useStyles = makeStyles((theme) => ({
    chatContainer: {
      textAlign: isOwner ? "right" : "left",
    },
    messageText: {
      fontSize: "14px",
    },
  }));

  const classes = useStyles();

  return (
    <ListItem className={classes.chatContainer}>
      {isOwner ? (
        <></>
      ) : (
        <ListItemAvatar>
          <Avatar alt="dp" src={profilePictureUrl} />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={
          <Chip
            className={classes.messageText}
            color={isOwner ? "secondary" : "default"}
            label={body}
          />
        }
      ></ListItemText>
    </ListItem>
  );
};

export default Chat;
