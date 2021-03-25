import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../context/UserContext";

const ProtectedRoutes = (props) => {
  const { userInfo } = useContext(UserContext);

  if (userInfo) {
    return <Route {...props} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};

export default ProtectedRoutes;
