import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import { AuthContext } from "./context/auth-context";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";

import "./App.css";
import TestDropZone from "./pages/shared/Formik/DialogBox/TestDropZone";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/profile" exact>
          <CustomerProfile />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        userData: userData,
        setUserData: setUserData,
      }}
    >
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          {isLoggedIn && <NavBar />}
          <main>{routes}</main>
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
