import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import RecipeContextProvider from "./context/recipe-context";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";
import "./App.css";
import { ContextProvider } from "./context/UserContext";
import TestComponent from "./pages/TestComponent";
import TestChefProfile from "./pages/TestChefProfile";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <RecipeContextProvider>
            <Switch>
              <Route path="/profile" component={CustomerProfile}>
                <NavBar />
              </Route>
              <Route path="/test" component={TestComponent} />
              <Route path="/chef" component={TestChefProfile} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />

              <Route path="/" component={Login} exact>
                <Redirect to="/login" />
              </Route>
            </Switch>
          </RecipeContextProvider>
        </ContextProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
