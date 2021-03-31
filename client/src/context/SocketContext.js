import React, { useState, useContext, useEffect, createContext } from "react";
import io from "socket.io-client";
import { UserContext } from "./UserContext";

//Socket context
const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (userInfo) {
      const newSocket = io("http://localhost:3001", {
        withCredentials: true,
        query: { id: userInfo._id },
      });
      setSocket(newSocket);

      return () => newSocket.close(); //Prevent duplicate connections
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
