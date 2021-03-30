import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";
import { StyledBadge } from "./StyledBadge";

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
