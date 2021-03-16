import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import { AuthContext } from "./context/auth-context";
import RecipeContextProvider from "./context/recipe-context";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";

import "./App.css";
import ChefProfile from "./pages/ChefProfile";

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
        <Route path="/chef" component={ChefProfile} />
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
      <RecipeContextProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            {isLoggedIn && <NavBar />}
            <main>{routes}</main>
          </BrowserRouter>
        </MuiThemeProvider>
      </RecipeContextProvider>
    </AuthContext.Provider>
  );
}

export default App;
