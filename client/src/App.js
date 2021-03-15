import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerProfile from "./pages/CustomerProfile";
import NavBar from "./components/NavBar";
import "./App.css";
import { ContextProvider } from "./Context/UserContext";
import TestComponent from "./pages/TestComponent";

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ContextProvider>
          <Switch>
            <Route path="/profile" component={CustomerProfile}>
              <NavBar />
            </Route>
            <Route path="/test" component={TestComponent} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            <Route path="/" component={Login} exact>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </ContextProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
