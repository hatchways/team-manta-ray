import React, { useState, useContext, useEffect, createContext } from "react";
import { UserContext } from "./UserContext";
import io from "socket.io-client";

//Socket context
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:3001", {
      withCredentials: true,
    });
    setSocket(newSocket);

    return () => newSocket.close(); //Prevent duplicate connections
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
