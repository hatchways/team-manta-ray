import React, { useState, useCallback } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import { theme } from "./themes/theme";
import CustomerProfile from "./profiles/pages/CustomerProfile";
import NavBar from "./shared/navigation/NavBar";

import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [avatar, setAvatar] = useState(
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"
    );

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <CustomerProfile />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/login">
                    {/* Location of login page */}
                    <h1>Login page</h1>
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
            value={{ isLoggedIn: isLoggedIn, avatar: avatar, login, logout }}
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
