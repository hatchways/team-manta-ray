import React, { useState, useEffect, useContext } from "react";
import socketIOClient from "socket.io-client";
import { UserContext } from "../context/UserContext";

const SERVER = "http://localhost:3001";

const ChatTest = () => {
  const { userInfo } = useContext(UserContext);
  console.log(userInfo);
  console.log("HELLL");

  var socket = socketIOClient(SERVER, {
    withCredentials: true,
  });

  useEffect(() => {
    socket.on("connection", () => {
      console.log("I'm connected with the back-end");
    });
  });

  return (
    <>
      <h1>Hi Chat</h1>
    </>
  );
};

export default ChatTest;
