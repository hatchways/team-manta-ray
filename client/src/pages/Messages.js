import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Divider,
  InputAdornment,
  IconButton,
  FilledInput,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MessageItems from "../components/messages/MessageItems";
import MessageTitle from "../components/messages/MessageTitle";
import Chat from "../components/messages/Chat";
import SendIcon from "@material-ui/icons/Send";

const MessageItem = (props) => {
  const useStyles = makeStyles((theme) => ({
    noBorderRadius: {
      borderRadius: "0",
    },

    messageContainer: {
      marginTop: "75px",
      height: "calc(100vh - 75px)",
    },
  }));

  const classes = useStyles();

  const usersChat = {
    _id: "userChatId1",
    user: {
      _id: "user1",
    },
    chats: [
      {
        _id: "chatId1",
        chattingWith: {
          user: {
            _id: "user2",
            name: "Val Palma",
            location: "Toronto, ON",
            profilePictureUrl:
              "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
          },
        },
        lastMessage: {
          sentBy: {
            _id: "user2",
            profilePictureUrl:
              "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
          },
          body: "Hi Gordon!",
          seen: false,
        },
      },
    ],
  };

  const messages = [
    {
      sentBy: {
        _id: "user2",
        profilePictureUrl:
          "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
      },
      body: "Hi Gordon!",
      seen: false,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "What!s up?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user2",
        profilePictureUrl:
          "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
      },
      body: "How is the cooking show going?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Can't complain",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Same, rocky road!",
      seen: true,
    },
    {
      sentBy: {
        _id: "user2",
        profilePictureUrl:
          "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
      },
      body: "Lorem Ipsum!",
      seen: true,
    },
    {
      sentBy: {
        _id: "user2",
        profilePictureUrl:
          "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
      },
      body: "Lorem Ipsum!",
      seen: true,
    },
    {
      sentBy: {
        _id: "user2",
        profilePictureUrl:
          "https://cdn.iconscout.com/icon/free/png-256/chef-2309868-1943778.png",
      },
      body: "Lorem Ipsum!",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Do you want to book appointment?",
      seen: true,
    },
    {
      sentBy: {
        _id: "user1",
        profilePictureUrl:
          "https://i1.sndcdn.com/avatars-000624434067-r5kehg-t500x500.jpg",
      },
      body: "Are you there?",
      seen: true,
    },
  ];

  const [activeMessageItem, setActiveMessageItem] = useState({});

  // this will set the active message state
  // will be used those state to chat area
  const handleSelectedMessageItem = (message) => {
    setActiveMessageItem(message);
  };

  return (
    <Box className={classes.messageContainer}>
      <Grid container>
        {/* SIDEBAR */}
        <Grid item md={2} sm={4} xs={12}>
          <Box height="100vh">
            {usersChat.chats.map((chat, i) => {
              chat["i"] = i;
              return (
                <MessageItems
                  chat={chat}
                  name={chat.chattingWith.user.name}
                  isOnline={true}
                  lastMessage={chat.lastMessage.body}
                  profilePictureUrl={chat.chattingWith.user.profilePictureUrl}
                  key={`${chat.chattingWith.user._id}chat${i}`}
                  handleSelectedMessageItem={handleSelectedMessageItem}
                  isSelected={activeMessageItem.i === i}
                />
              );
            })}
          </Box>
        </Grid>

        {/* CHATBAR */}
        <Grid item md={10} sm={8} xs={12}>
          <Paper
            component={Box}
            height={"100vh"}
            className={classes.noBorderRadius}
          >
            {Object.keys(activeMessageItem).length > 0 ? (
              <Grid container justify="center">
                {/* MESSAGE TITLE */}
                <Grid item xl={9} lg={10} md={11} xs={12}>
                  <MessageTitle
                    isOnline={true}
                    profilePictureUrl={
                      activeMessageItem.chattingWith.user.profilePictureUrl
                    }
                    name={activeMessageItem.chattingWith.user.name}
                    location={activeMessageItem.chattingWith.user.location}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>

                {/* CHAT OVERFLOW */}
                <Grid container justify="center">
                  <Grid
                    item
                    xl={9}
                    lg={10}
                    md={11}
                    xs={12}
                    component={Box}
                    mt={6}
                  >
                    <Box
                      style={{
                        // change thhis when appbar merged
                        height: "calc(100vh - 176px)",
                      }}
                      display="flex"
                      flexDirection="column"
                    >
                      {/* CHAT AREA */}
                      <Box
                        style={{
                          flexGrow: 1,
                          overflowY: "auto",
                          display: "flex",
                          flexDirection: "column-reverse",
                        }}
                      >
                        {messages.length > 0 ? (
                          messages.reverse().map((message, i) => (
                            <Chat
                              key={`${message.sentBy}chat${i}`}
                              profilePictureUrl={
                                message.sentBy.profilePictureUrl
                              }
                              body={message.body}
                              // CHANGE THIS! must be authenticated.user._id
                              isOwner={message.sentBy._id === "user1"}
                            />
                          ))
                        ) : (
                          <Box display="flex" justifyContent="center" mt={3}>
                            No messages found.
                          </Box>
                        )}
                      </Box>
                      {/* TEXT FIELD */}
                      <Box mb={2}>
                        <FilledInput
                          style={{
                            padding: "10px 10px 17px 10px",
                            borderRadius: "0px",
                          }}
                          fullWidth
                          placeholder="Write a message..."
                          disableUnderline
                          endAdornment={
                            <InputAdornment
                              position="end"
                              style={{ marginRight: "10px" }}
                            >
                              <IconButton>
                                <SendIcon color="secondary" />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Box
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                Please select message.
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageItem;
