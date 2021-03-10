import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import { theme } from "./themes/theme";
import CustomerProfile from "./profiles/pages/CustomerProfile";
import Login from "./AuthRoutes/pages/Login";
import NavBar from "./shared/navigation/NavBar";

import "./App.css";

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
                    {/* Location of login page */}
                    <Login />
                </Route>
                <Route path="/signup">
                    {/* Location of signup page */}
                    <h1>Signup page</h1>
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
