import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useParams, useHistory } from "react-router-dom";
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
import { UserContext } from "../context/UserContext";
import { useSocket } from "../context/SocketContext";
import axios from "axios";

const MessageItem = (props) => {
  const { userInfo } = useContext(UserContext);
  const { chattingWithId } = useParams();
  const messageInput = useRef();
  const history = useHistory();
  const socket = useSocket();

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

  useEffect(() => {});

  const [activeMessageItem, setActiveMessageItem] = useState({});
  const [conversationPreviews, setConversationPreviews] = useState([]);
  const [messages, setMessages] = useState([]);

  // Selecting the conversation
  const handleSelectedMessageItem = (message) => {
    setActiveMessageItem(message);
    history.push(`/chat/${message.chattingWith._id}`);
  };

  //Fetching the conversation previews
  const getConversationPreviews = useCallback(async () => {
    try {
      const previews = await axios.get("/api/chat/previews");
      setConversationPreviews(previews.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Fetch conversation previews on page load
  useEffect(() => {
    getConversationPreviews();
  }, [getConversationPreviews]);

  //Get the conversation data for the current conversation
  const getConversation = useCallback(async (id) => {
    try {
      const conversation = await axios.get(`/api/chat/${id}`);
      setActiveMessageItem(conversation.data.data);
      setMessages(conversation.data.data[0].messages.reverse());
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Fetches the active conversation whenever the chattingWithId changes (/chat/:chattingWithId)
  useEffect(() => {
    if (chattingWithId) {
      getConversation(chattingWithId);
    }
  }, [chattingWithId, getConversation]);

  const handleIncomingMessage = useCallback(
    (message) => {
      setMessages([message, ...messages]);
      getConversationPreviews();
    },
    [messages, getConversationPreviews]
  );

  //Socket emission for sending a message
  const sendMessageHandler = () => {
    const message = messageInput.current.value;
    if (message.length > 0) {
      socket.emit("send-message", {
        recipient: chattingWithId,
        content: message,
      });
      messageInput.current.value = "";
    }
  };

  //Receive message socket listener
  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", handleIncomingMessage);
    return () => socket.off("receive-message");
  }, [socket, handleIncomingMessage]);

  return (
    <Box className={classes.messageContainer}>
      <Grid container>
        {/* SIDEBAR */}
        <Grid item md={2} sm={4} xs={12}>
          <Box height="90vh">
            {conversationPreviews.map((chat, i) => {
              chat["i"] = i;
              return (
                <MessageItems
                  chat={chat}
                  name={chat.chattingWith.name}
                  isOnline={true}
                  lastMessage={chat.lastMessage.content}
                  profilePictureUrl={chat.chattingWith.profilePictureUrl}
                  key={`${chat._id}chat${i}`}
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
            height={"92vh"}
            className={classes.noBorderRadius}
          >
            {Object.keys(activeMessageItem).length > 0 ? (
              <Grid container justify="center">
                {/* MESSAGE TITLE */}
                <Grid item xl={9} lg={10} md={11} xs={12}>
                  <MessageTitle
                    isOnline={true}
                    profilePictureUrl={
                      activeMessageItem.chattingWith.profilePictureUrl
                    }
                    name={activeMessageItem.chattingWith.name}
                    location="Toronto, ON"
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
                          messages.map((message, i) => (
                            <Chat
                              key={`${message.sender}chat${i}`}
                              profilePictureUrl={
                                activeMessageItem.chattingWith.profilePictureUrl
                              }
                              body={message.content}
                              // CHANGE THIS! must be authenticated.user._id
                              isOwner={message.sender === userInfo._id}
                            />
                          ))
                        ) : (
                          <Box
                            display="flex"
                            justifyContent="center"
                            style={{ marginBottom: 50, opacity: 0.6 }}
                            mt={3}
                          >
                            No messages in this conversation yet.
                          </Box>
                        )}
                      </Box>
                      {/* TEXT FIELD */}
                      <Box mb={2}>
                        <FilledInput
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              sendMessageHandler();
                            }
                          }}
                          inputRef={messageInput}
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
                              <IconButton onClick={sendMessageHandler}>
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
                Select a conversation.
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageItem;
